import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import '../src/Styles/PestList.css'; 

const MySwal = withReactContent(Swal);

function PestList() {
  const navigate = useNavigate();
  const [pesticidas, setPesticidas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const registrosPorPagina = 10;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPesticida, setSelectedPesticida] = useState(null);
  const [searchNombre, setSearchNombre] = useState('');
  const [searchIngrediente, setSearchIngrediente] = useState('');


  // Función para obtener los pesticidas desde la API
  const fetchPesticidas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pesticidas');
      setPesticidas(response.data);
    } catch (error) {
      console.error('Error al cargar los pesticidas:', error);
    }
  };

  useEffect(() => {
    fetchPesticidas();
  }, []);

  // Manejar la eliminación de un pesticida
  const handleDelete = (pestId) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/pesticidas/${pestId}`)
          .then(() => {
            setPesticidas(pesticidas.filter(pesticida => pesticida.id !== pestId));
            Swal.fire('Eliminado!', 'El pesticida ha sido eliminado.', 'success');
            fetchPesticidas();
          })
          .catch(error => {
            Swal.fire('Error', 'Hubo un problema al eliminar el pesticida.', 'error');
            //console.error("Hubo un error al eliminar el pesticida", error);
          });
      }
    });
  };

  // Manejar la apertura del modal
  const openModal = (pesticida) => {
    setSelectedPesticida(pesticida);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPesticida(null);
  };

  // Manejo de la paginación
  const handlePageClick = ({ selected }) => setPageNumber(selected);

    // Manejar búsqueda por nombre comercial
    const handleSearchNombre = (e) => {
      setSearchNombre(e.target.value);
    };
  
    // Manejar búsqueda por ingrediente activo
    const handleSearchIngrediente = (e) => {
      setSearchIngrediente(e.target.value);
    };
  
    // Filtrar los pesticidas por nombre e ingrediente activo
    const pesticidasFiltrados = pesticidas.filter((pest) =>
      pest.Nombre_Comercial.toLowerCase().includes(searchNombre.toLowerCase()) &&
      pest.Sustancia_Activa_1.toLowerCase().includes(searchIngrediente.toLowerCase())
    );

    const displayRecords = pesticidasFiltrados.slice(
      pageNumber * registrosPorPagina,
      (pageNumber + 1) * registrosPorPagina
    );  

  return (
    <div className="pest-list-body">
      <h1 className="pest-h1">Gestión de Pesticidas</h1>
      <button onClick={() => navigate('/agregar-pesticida')} className="btn-add">Agregar Pesticida</button>
      <button onClick={() => navigate('/cambios-pendientes')} className="btn-add">Ver Informe de Pesticidas</button>
      <div className="filters">
        <div className="input-container">
          <input
            type="text"
            id="searchNombre"
            placeholder=" "
            value={searchNombre}
            onChange={handleSearchNombre}
          />
          <label htmlFor="searchNombre">Nombre Comercial</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="searchIngrediente"
            placeholder=" "
            value={searchIngrediente}
            onChange={handleSearchIngrediente}
          />
          <label htmlFor="searchIngrediente">Ingrediente Activo</label>
        </div>
      </div>
      <table className="pest-table">
        <thead>
          <tr>
            <th>Registro</th>
            <th>Nombre Comercial</th>
            <th>Aptitud</th>
            <th>Ingrediente Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayRecords.length > 0 ? (
            displayRecords.map(pesticida => (
              <tr key={pesticida.id}>
                <td>{pesticida.Registro}</td>
                <td>{pesticida.Nombre_Comercial}</td>
                <td>{pesticida.Aptitud}</td>
                <td>{pesticida.Sustancia_Activa_1}</td>
                <td>
                  <div className="acciones-container">
                    <button className="btn-ver" onClick={() => openModal(pesticida)}>Ver</button>
                    <button className="btn-editar" onClick={() => navigate(`/editar-pesticida/${pesticida.PK_pest}`)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleDelete(pesticida.PK_pest)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No se encontraron pesticidas</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'← Anterior'}
        nextLabel={'Siguiente →'}
        pageCount={Math.ceil(pesticidas.length / registrosPorPagina)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-container">
        <h2>Detalles del Pesticida</h2>
        <button onClick={closeModal}>Cerrar</button>
        {selectedPesticida && (
          <div className="modal-content-grid">
            <div className="modal-column">
              <p><strong>Registro:</strong> {selectedPesticida.Registro}</p>
              <p><strong>Nombre Comercial:</strong> {selectedPesticida.Nombre_Comercial}</p>
              <p><strong>Aptitud:</strong> {selectedPesticida.Aptitud}</p>
              <p><strong>Sustancia Activa 1:</strong> {selectedPesticida.Sustancia_Activa_1}</p>
              <p><strong>Activo Contenido 1:</strong> {`${selectedPesticida.Activo_Contenido_1} ${selectedPesticida.Unidades_1}`}</p>
              <p><strong>Sustancia Activa 2:</strong> {selectedPesticida.Sustancia_Activa_2}</p>
              <p><strong>Activo Contenido 2:</strong> {`${selectedPesticida.Activo_Contenido_2} ${selectedPesticida.Unidades_2}`}</p>
              <p><strong>Sustancia Activa 3:</strong> {selectedPesticida.Sustancia_Activa_3}</p>
              <p><strong>Activo Contenido 3:</strong> {`${selectedPesticida.Activo_Contenido_3} ${selectedPesticida.Unidades_3}`}</p>
              <p><strong>Sustancia Activa 4:</strong> {selectedPesticida.Sustancia_Activa_4}</p>
              <p><strong>Activo Contenido 4:</strong> {`${selectedPesticida.Activo_Contenido_4} ${selectedPesticida.Unidades_4}`}</p>
            </div>
            <div className="modal-column">
              <p><strong>Formulación:</strong> {selectedPesticida.Formulacion}</p>
              <p><strong>Toxicología:</strong> {selectedPesticida.Toxicologia}</p>
              <p><strong>Vencimiento:</strong> {selectedPesticida.Vencimiento}</p>
              <p><strong>Estado:</strong> {selectedPesticida.Estado}</p>
              <p><strong>Receta:</strong> {selectedPesticida.Receta}</p>
              <p><strong>Empresa Razón Social:</strong> {selectedPesticida.Empresa_Razon_Social}</p>
              <p><strong>País:</strong> {selectedPesticida.Pais}</p>
              <p><strong>País 2:</strong> {selectedPesticida.Pais_2}</p>
              <p><strong>País 3:</strong> {selectedPesticida.Pais_3}</p>
              <p><strong>País 4:</strong> {selectedPesticida.Pais_4}</p>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

export default PestList;
