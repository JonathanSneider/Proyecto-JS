import React, { useState, useEffect } from 'react';
import './createMaterial.css'; 

const CostManager = () => {
  const [formData, setFormData] = useState({
    AlquilerDelLocal: '',
    ServiciosPublicos: '',
    costAmount: '',
    costFrequency: 'mensual'
  });

  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await fetch('https://664cc9f4ede9a2b55651a257.mockapi.io/costs');
        const data = await response.json();
        setCosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { AlquilerDelLocal, ServiciosPublicos, MantenimientoMaquinaria, EEP,FormacionyCapacitacionEmpleados, Seguros , GastosOficina , TransporteyLogostica , CostosLicenciasyPermisos , ServiciosLimpieza } = formData;

    if (!ServiciosPublicos || !MantenimientoMaquinaria || !EEP || !FormacionyCapacitacionEmpleados || !Seguros || ! GastosOficina || !TransporteyLogostica || !CostosLicenciasyPermisos || !ServiciosLimpieza) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const url = isEditing
        ? `https://664cc9f4ede9a2b55651a257.mockapi.io/costs/${AlquilerDelLocal}`
        : 'https://664cc9f4ede9a2b55651a257.mockapi.io/costs';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ServiciosPublicos, costAmount, costFrequency })
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Costo indirecto ${isEditing ? 'actualizado' : 'registrado'} con éxito.`);
        setFormData({
          AlquilerDelLocal: '',
          ServiciosPublicos: '',
          costAmount: '',
          costFrequency: 'mensual'
        });
        setIsEditing(false);
        setCosts((prevCosts) => {
          if (isEditing) {
            return prevCosts.map((cost) =>
              cost.id === AlquilerDelLocal ? result : cost
            );
          } else {
            return [...prevCosts, result];
          }
        });
      } else {
        alert(`Error al ${isEditing ? 'actualizar' : 'registrar'} costo indirecto: ` + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al ${isEditing ? 'actualizar' : 'registrar'} costo indirecto.`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este costo?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://664cc9f4ede9a2b55651a257.mockapi.io/costs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCosts((prevCosts) => prevCosts.filter((cost) => cost.id !== id));
        alert('Costo eliminado con éxito.');
      } else {
        alert('Error al eliminar el costo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el costo.');
    }
  };

  const handleEdit = (cost) => {
    setFormData({
      AlquilerDelLocal: cost.id,
      ServiciosPublicos: cost.ServiciosPublicos,
      costAmount: cost.costAmount,
      costFrequency: cost.costFrequency
    });
    setIsEditing(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="cost-manager">
      <div id="cadauno">
        <h2>{isEditing ? 'Actualizar' : 'Registrar'} Costos Indirectos</h2>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <>
              <label htmlFor="AlquilerDelLocal">ID del Costo:</label>
              <input
                type="text"
                id="AlquilerDelLocal"
                name="AlquilerDelLocal"
                value={formData.AlquilerDelLocal}
                onChange={handleChange}
                readOnly
                required
              /><br /><br />
            </>
          )}

          <label htmlFor="ServiciosPublicos">Descripción del Costo:</label>
          <input
            type="text"
            id="ServiciosPublicos"
            name="ServiciosPublicos"
            value={formData.ServiciosPublicos}
            onChange={handleChange}
            required
          /><br /><br />

          <label htmlFor="costAmount">Monto del Costo:</label>
          <input
            type="number"
            id="costAmount"
            name="costAmount"
            value={formData.costAmount}
            onChange={handleChange}
            step="0.01"
            required
          /><br /><br />

          <label htmlFor="costFrequency">Frecuencia del Costo:</label>
          <select
            id="costFrequency"
            name="costFrequency"
            value={formData.costFrequency}
            onChange={handleChange}
            required
          >
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select><br /><br />

          <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        </form>
      </div>

      <div id='cadauno'>
        <h2>Lista de Costos Indirectos</h2>
        <ul>
          {costs.map((cost) => (
            <li key={cost.id}>
              <strong>ID:</strong> {cost.id} <br />
              <strong>Descripción:</strong> {cost.ServiciosPublicos} <br />
              <strong>Monto:</strong> {cost.costAmount} <br />
              <strong>Frecuencia:</strong> {cost.costFrequency} <br />
              <button onClick={() => handleEdit(cost)}>Editar</button>
              <button onClick={() => handleDelete(cost.id)}>Eliminar</button>
              <br /><br />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default CostManager;
