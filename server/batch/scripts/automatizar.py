import pandas as pd
from sqlalchemy import create_engine, text
from datetime import datetime, timedelta
import json
import numpy as np
import re

# Mapeo de nombres de columnas de Excel a base de datos
COLUMN_MAPPING = {
    "registro": "registro",
    "nombre comercial": "nombre_comercial",
    "aptitud": "aptitud",
    "sustancia activa -1-": "sustancia_activa_1",
    "activo contenido -1-": "activo_contenido_1",
    "medida 1": "unidades_1",
    "sustancia activa -2-": "sustancia_activa_2",
    "activo contenido -2-": "activo_contenido_2",
    "medida 2": "unidades_2",
    "sustancia activa -3-": "sustancia_activa_3",
    "activo contenido -3-": "activo_contenido_3",
    "medida 3": "unidades_3",
    "sustancia activa -4-": "sustancia_activa_4",
    "activo contenido -4-": "activo_contenido_4",
    "medida 4": "unidades_4",
    "formulacion": "formulacion",
    "toxicologia": "toxicologia",
    "vencimiento": "vencimiento",
    "estado": "estado",
    "receta": "receta",
    "empresa razon social": "empresa_razon_social",
    "país": "pais",
    "país2": "pais_2",
    "país3": "pais_3",
    "país4": "pais_4"
}

# Conexión a la base de datos
def conectar_db():
    engine = create_engine("mysql+mysqlconnector://root:Guason123@127.0.0.1/eras")
    return engine

# Función para renombrar columnas duplicadas "Medida" en el archivo Excel
def renombrar_columnas_duplicadas(columnas):
    contador = {}
    nuevas_columnas = []
    for col in columnas:
        if "medida" in col:
            contador[col] = contador.get(col, 0) + 1
            nuevas_columnas.append(f"medida {contador[col]}")
        else:
            nuevas_columnas.append(col)
    return nuevas_columnas

# Cargar datos de Excel y aplicar cambios
def cargar_datos_excel(ruta_archivo):
    datos_excel = pd.read_excel(ruta_archivo, header=2)  # Comienza a leer desde la fila 3
    datos_excel.fillna('', inplace=True)  # Normalizar espacios y texto nulo
    datos_excel.columns = renombrar_columnas_duplicadas(datos_excel.columns.str.strip().str.lower())
    datos_excel.rename(columns=COLUMN_MAPPING, inplace=True)
    if datos_excel.columns.duplicated().any():
        datos_excel = datos_excel.loc[:, ~datos_excel.columns.duplicated()]
    return datos_excel

# Cargar datos de MySQL usando SQLAlchemy
def cargar_datos_bd():
    engine = conectar_db()
    consulta = "SELECT * FROM mgap_pest"
    datos_bd = pd.read_sql(consulta, engine)
    engine.dispose()
    datos_bd.columns = datos_bd.columns.str.strip().str.lower()
    return datos_bd

# Convertir valores no serializables en JSON
def convertir_a_serializable(obj):
    if isinstance(obj, pd.Timestamp):
        return obj.strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(obj, datetime):
        return obj.isoformat()
    return obj

# Función personalizada para comparar valores, tratando '' y None como equivalentes, y normalizar datos
def valores_iguales(val1, val2):
    # Normalizamos NaN y None como cadena vacía
    if pd.isna(val1):
        val1 = ''
    if pd.isna(val2):
        val2 = ''
    
    # Normalización de valores comunes
    val1, val2 = str(val1).strip().lower(), str(val2).strip().lower()

    # Tratamiento de valores numéricos con o sin '%'
    if val1.endswith('%') and val2 == val1[:-1]:
        return True
    if val2.endswith('%') and val1 == val2[:-1]:
        return True
    
    # Eliminación de signos de puntuación
    val1, val2 = re.sub(r'[^\w\s]', '', val1), re.sub(r'[^\w\s]', '', val2)

    return val1 == val2

# Comparar datos y detectar cambios
def comparar_datos(excel_df, bd_df):
    cambios = {"agregados": [], "modificados": [], "eliminados": []}
    
    excel_df['registro'] = excel_df['registro'].astype(str)
    bd_df['registro'] = bd_df['registro'].astype(str)
    
    registros_excel = set(excel_df['registro'].str.strip().str.lower())
    registros_bd = set(bd_df['registro'].str.strip().str.lower())

    nuevos_registros = registros_excel - registros_bd
    eliminados_registros = registros_bd - registros_excel
    
    # Extraer registros completos de nuevos y eliminados
    cambios['agregados'] = excel_df[excel_df['registro'].str.strip().str.lower().isin(nuevos_registros)].to_dict(orient='records')
    cambios['eliminados'] = bd_df[bd_df['registro'].str.strip().str.lower().isin(eliminados_registros)].to_dict(orient='records')
    
    # Identificar y extraer registros completos para modificados
    comunes_registros = registros_excel & registros_bd
    for registro in comunes_registros:
        excel_row = excel_df[excel_df['registro'].str.strip().str.lower() == registro].iloc[0]
        bd_row = bd_df[bd_df['registro'].str.strip().str.lower() == registro].iloc[0]
        
        # Compara cada columna con la función personalizada `valores_iguales`
        modificado = any(not valores_iguales(excel_row[col], bd_row[col]) for col in excel_row.index if col != 'vencimiento')
        
        if modificado:
            cambios['modificados'].append(excel_row.to_dict())  # Guarda el registro completo del Excel
    
    return cambios

# Guardar informe en MySQL con confirmación de commit
def guardar_informe(cambios):
    engine = conectar_db()
    with engine.begin() as connection:  # `begin` asegura el commit automático al finalizar el bloque
        informe = {
            "fecha": datetime.now(),
            "fecha_expiracion": datetime.now() + timedelta(days=30),
            "agregados": len(cambios["agregados"]),
            "modificados": len(cambios["modificados"]),
            "eliminados": len(cambios["eliminados"]),
            "detalles": json.dumps(cambios, default=convertir_a_serializable),
            "estado": "Pendiente"
        }
        
        consulta = text("""
            INSERT INTO informecambios (fecha, fecha_expiracion, agregados, modificados, eliminados, detalles, estado)
            VALUES (:fecha, :fecha_expiracion, :agregados, :modificados, :eliminados, :detalles, :estado)
        """)
        
        connection.execute(consulta, informe)
        print("Informe guardado correctamente en la base de datos.")  # Confirmación en consola

# Función principal
def ejecutar_proceso():
    ruta_excel = 'D:/ERAS-V1/server/batch/descargas/pesticidas_2024-11-02.xlsx'
    datos_excel = cargar_datos_excel(ruta_excel)
    datos_bd = cargar_datos_bd()
    
    # Realizar comparación
    cambios = comparar_datos(datos_excel, datos_bd)
    
    # Guardar informe
    guardar_informe(cambios)

# Ejecutar el proceso
ejecutar_proceso()
