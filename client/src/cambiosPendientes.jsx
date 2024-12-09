import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import './Styles/CambiosPendientes.css';

const CambiosPendientes = () => {
  const [agregados, setAgregados] = useState([]);
  const [modificados, setModificados] = useState([]);
  const [eliminados, setEliminados] = useState([]);
  const [activeTab, setActiveTab] = useState('agregados');
  const [pageNumber, setPageNumber] = useState(0);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };
  
  const registrosPorPagina = 20;

  useEffect(() => {
    const fetchCambiosPendientes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://34.39.142.103:5000/api/cambios-pendientes');
        const { agregados, modificados, eliminados } = response.data;

        setAgregados(agregados || []);
        setModificados(modificados || []);
        setEliminados(eliminados || []);
      } catch (error) {
        console.error('Error al obtener cambios pendientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCambiosPendientes();
  }, []);

  const getActiveData = () => {
    switch (activeTab) {
      case 'agregados':
        return agregados;
      case 'modificados':
        return modificados;
      case 'eliminados':
        return eliminados;
      default:
        return [];
    }
  };

  const handlePageClick = ({ selected }) => setPageNumber(selected);

  const displayRecords = (data) =>
    data.slice(pageNumber * registrosPorPagina, (pageNumber + 1) * registrosPorPagina);

  const handleConfirmarTodo = async () => {
    try {
      let url;
      let data;
      let method;
  
      if (activeTab === 'agregados') {
        url = 'http://34.39.142.103:5000/api/cambios-pendientes/confirmar-agregados-masivo';
        data = agregados; 
        method = 'post';
      } else if (activeTab === 'modificados') {
        url = 'http://34.39.142.103:5000/api/cambios-pendientes/confirmar-modificados-masivo';
        data = modificados; 
        method = 'put';
      } else {
        return;
      }
  
      await axios({
        method: method,
        url: url,
        data: data
      });
  
      setMensaje(`Todos los registros de ${activeTab} fueron confirmados exitosamente.`);
  
      if (activeTab === 'agregados') {
        const registrosConfirmados = data.map((item) => item.Registro);
        setAgregados(agregados.filter((item) => !registrosConfirmados.includes(item.Registro)));
      } else if (activeTab === 'modificados') {
        const registrosConfirmados = data.map((item) => item.Registro);
        setModificados(modificados.filter((item) => !registrosConfirmados.includes(item.Registro)));
      }
    } catch (error) {
      console.error(`Error al confirmar todos los registros de ${activeTab}:`, error);
      setMensaje(`Error al confirmar todos los registros de ${activeTab}.`);
    }
  };
  

  const handleAction = async (tipo, registro) => {
    try {
        let url;
        let payload;
        let method;
        //console.log("Registro enviado:", registro); 

        switch (tipo) {
            case 'agregados':
                url = 'http://34.39.142.103:5000/api/cambios-pendientes/confirmar-agregado';
                payload = { ...registro }; 
                method = 'post';
                break;
            case 'modificados':
                url = 'http://34.39.142.103:5000/api/cambios-pendientes/confirmar-modificado';
                payload = { Registro: registro.Registro || registro.DatosCompletos.Registro, modificaciones: registro.DatosCompletos || registro };
                method = 'put';
                break;
            case 'eliminados':
                const confirmResult = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: `¿Deseas eliminar el registro ${registro.Registro}? Esta acción no se puede deshacer.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                });

                // Si el usuario cancela, salir de la función
                if (!confirmResult.isConfirmed) return;
                
                url = 'http://34.39.142.103:5000/api/cambios-pendientes/confirmar-eliminado';
                payload = { PK_pest: registro.PK_pest };
                method = 'delete';
                break;
            default:
                return;
        }

       // console.log("Payload a enviar:", payload); // Para verificar el payload

       await axios({
        method: method,
        url: url,
        data: payload
      });
    

        setMensaje(`Registro ${tipo.slice(0, -1)} confirmado exitosamente.`);

        // Actualiza el estado local para eliminar el registro confirmado
        if (tipo === 'agregados') {
          setAgregados((prev) => prev.filter((item) => item.Registro !== registro.Registro));
        } else if (tipo === 'modificados') {
            setModificados((prev) => prev.filter((item) => item.Registro !== registro.Registro));
        } else {
            setEliminados((prev) => prev.filter((item) => item.Registro !== registro.Registro));
        }
      
    } catch (error) {
        console.error(`Error al confirmar ${tipo.slice(0, -1)}:`, error);
        setMensaje(`Error al confirmar ${tipo.slice(0, -1)}.`);
    }
};

const renderTableRows = (data, tipo) =>
  displayRecords(data).map((item, index) => {
    const registro = item.Registro || item.registro || item.DatosCompletos?.Registro || "Sin registro";
    const nombreComercial = item.Nombre_Comercial || item['nombre comercial'] || item.DatosCompletos?.['Nombre Comercial'] || "Sin nombre comercial";
    const aptitud = item.Aptitud || item.aptitud || item.DatosCompletos?.Aptitud || "Sin aptitud";
    const sustanciaActiva = item.Sustancia_Activa_1 || item['sustancia activa -1-'] || item.DatosCompletos?.['Sustancia Activa -1-'] || "Sin sustancia activa";

    return (
      <tr key={index}>
        <td>{registro}</td>
        <td>{nombreComercial}</td>
        <td>{aptitud}</td>
        <td>{sustanciaActiva}</td>
        <td className="acciones">
          <Button variant="success" onClick={() => handleAction(tipo, item)}>
            Confirmar
          </Button>
          <Button variant="info" onClick={() => openModal(item)}>
            Ver
          </Button>
        </td>
      </tr>
    );
  });

  const renderPaginate = (data) => (
    <ReactPaginate
      previousLabel={'← Anterior'}
      nextLabel={'Siguiente →'}
      pageCount={Math.ceil(data.length / registrosPorPagina)}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPageNumber(0);
  };

  if (loading) {
    return <p>Cargando registros...</p>;
  }

  const activeData = getActiveData();

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cambios Pendientes</h2>

      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      <div className="d-flex justify-content-center mb-4">
        <Button
          variant={activeTab === 'agregados' ? 'primary' : 'outline-primary'}
          onClick={() => handleTabChange('agregados')}
          className="mx-2"
        >
          Agregados
        </Button>
        <Button
          variant={activeTab === 'modificados' ? 'warning' : 'outline-warning'}
          onClick={() => handleTabChange('modificados')}
          className="mx-2"
        >
          Modificados
        </Button>
        <Button
          variant={activeTab === 'eliminados' ? 'danger' : 'outline-danger'}
          onClick={() => handleTabChange('eliminados')}
          className="mx-2"
        >
          Eliminados
        </Button>
      </div>
      {(activeTab === 'agregados' || activeTab === 'modificados') && activeData.length > 0 && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={handleConfirmarTodo}>
            Confirmar Todo
          </Button>
        </div>
      )}
      {activeData.length === 0 ? (
        <div className="mensaje-centro">
          <p>No hay registros para mostrar en {activeTab}.</p>
      </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Registro</th>
                <th>Nombre Comercial</th>
                <th>Aptitud</th>
                <th>Sustancia Activa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(activeData, activeTab)}</tbody>
          </Table>
          {renderPaginate(activeData)}
        </>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Detalles del Registro</h2>
        <button onClick={closeModal}>Cerrar</button>
        <div>
          {selectedItem && Object.entries(selectedItem.DatosCompletos || selectedItem).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value || 'N/A'}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
  
};

export default CambiosPendientes;
