import React, { useState, useEffect } from 'react';
import './MaterialManager.css'; 

const CostManager = () => {
  const [formData, setFormData] = useState({
    id: '',
    AlquilerDelLocal: '',
    ServiciosPublicos: '',
    MantenimientoMaquinaria: '',
    materialProvider: '',
    EEP: '',
    FormacionyCapacitacionEmpleados: '',
    Seguros: '',
    GastosOficina: '',
    TransporteyLogostica: '',
    CostosLicenciasyPermisos: '',
    ServiciosLimpieza: '',
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

    const {
        id,
        AlquilerDelLocal,
        ServiciosPublicos,
        MantenimientoMaquinaria,
        EEP,
        FormacionyCapacitacionEmpleados,
        Seguros,
        GastosOficina,
        TransporteyLogostica,
        CostosLicenciasyPermisos,
        ServiciosLimpieza,
        costFrequency
    } = formData;

    const missingFields = [];

    if (!ServiciosPublicos) {
        missingFields.push('Servicios Públicos');
    }
    if (!MantenimientoMaquinaria) {
        missingFields.push('Mantenimiento Maquinaria');
    }
    if (!EEP) {
        missingFields.push('EEP');
    }
    if (!FormacionyCapacitacionEmpleados) {
        missingFields.push('Formación y Capacitación de Empleados');
    }
    if (!Seguros) {
        missingFields.push('Seguros');
    }
    if (!GastosOficina) {
        missingFields.push('Gastos Oficina');
    }
    if (!TransporteyLogostica) {
        missingFields.push('Transporte y Logística');
    }
    if (!CostosLicenciasyPermisos) {
        missingFields.push('Costos de Licencias y Permisos');
    }
    if (!ServiciosLimpieza) {
        missingFields.push('Servicios Limpieza');
    }

    if (missingFields.length > 0) {
        const message = `Por favor, completa los siguientes campos obligatorios: ${missingFields.join(', ')}`;
        alert(message);
        return;
    }

    const costData = {
        AlquilerDelLocal,
        ServiciosPublicos,
        MantenimientoMaquinaria,
        EEP,
        FormacionyCapacitacionEmpleados,
        Seguros,
        GastosOficina,
        TransporteyLogostica,
        CostosLicenciasyPermisos,
        ServiciosLimpieza,
        costFrequency
    };

    try {
        const url = isEditing
            ? `https://664cc9f4ede9a2b55651a257.mockapi.io/costs/${id}`
            : 'https://664cc9f4ede9a2b55651a257.mockapi.io/costs';

        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(costData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Costo indirecto ${isEditing ? 'actualizado' : 'registrado'} con éxito.`);
            setFormData({
                id: '',
                AlquilerDelLocal: '',
                ServiciosPublicos: '',
                MantenimientoMaquinaria: '',
                EEP: '',
                FormacionyCapacitacionEmpleados: '',
                Seguros: '',
                GastosOficina: '',
                TransporteyLogostica: '',
                CostosLicenciasyPermisos: '',
                ServiciosLimpieza: '',
                costFrequency: 'mensual'
            });
            setIsEditing(false);
            setCosts((prevCosts) => {
                if (isEditing) {
                    return prevCosts.map((cost) =>
                        cost.id === id ? result : cost
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
      id: cost.id,
      AlquilerDelLocal: cost.AlquilerDelLocal,
      ServiciosPublicos: cost.ServiciosPublicos,
      MantenimientoMaquinaria: cost.MantenimientoMaquinaria,
      EEP: cost.EEP,
      FormacionyCapacitacionEmpleados: cost.FormacionyCapacitacionEmpleados,
      Seguros: cost.Seguros,
      GastosOficina: cost.GastosOficina,
      TransporteyLogostica: cost.TransporteyLogostica,
      CostosLicenciasyPermisos: cost.CostosLicenciasyPermisos,
      ServiciosLimpieza: cost.ServiciosLimpieza,
      costFrequency: cost.costFrequency
    });
    setIsEditing(true);
  };

  if (loading) {
    return <div class='cagando'>Cargando...</div>;
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
              <label htmlFor="id">ID del Costo:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              /><br /><br />
            </>
          )}

          <label htmlFor="AlquilerDelLocal">Alquiler del Local:</label>
          <input
            type="number"
            id="AlquilerDelLocal"
            name="AlquilerDelLocal"
            value={formData.AlquilerDelLocal}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="ServiciosPublicos">Servicios Públicos:</label>
          <input
            type="number"
            id="ServiciosPublicos"
            name="ServiciosPublicos"
            value={formData.ServiciosPublicos}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="MantenimientoMaquinaria">Mantenimiento Maquinaria:</label>
          <input
            type="number"
            id="MantenimientoMaquinaria"
            name="MantenimientoMaquinaria"
            value={formData.MantenimientoMaquinaria}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="EEP">EEP:</label>
          <input
            type="number"
            id="EEP"
            name="EEP"
            value={formData.EEP}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="FormacionyCapacitacionEmpleados">Formación y Capacitación de Empleados:</label>
          <input
            type="number"
            id="FormacionyCapacitacionEmpleados"
            name="FormacionyCapacitacionEmpleados"
            value={formData.FormacionyCapacitacionEmpleados}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="Seguros">Seguros:</label>
          <input
            type="number"
            id="Seguros"
            name="Seguros"
            value={formData.Seguros}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="GastosOficina">Gastos Oficina:</label>
          <input
            type="number"
            id="GastosOficina"
            name="GastosOficina"
            value={formData.GastosOficina}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="TransporteyLogostica">Transporte y Logística:</label>
          <input
            type="number"
            id="TransporteyLogostica"
            name="TransporteyLogostica"
            value={formData.TransporteyLogostica}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="CostosLicenciasyPermisos">Costos de Licencias y Permisos:</label>
          <input
            type="number"
            id="CostosLicenciasyPermisos"
            name="CostosLicenciasyPermisos"
            value={formData.CostosLicenciasyPermisos}
            onChange={handleChange}
            required
            step="1"
          /><br /><br />

          <label htmlFor="ServiciosLimpieza">Servicios Limpieza:</label>
          <input
            type="number"
            id="ServiciosLimpieza"
            name="ServiciosLimpieza"
            value={formData.ServiciosLimpieza}
            onChange={handleChange}
            required
            step="1"
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
              <strong>Alquiler Del Local:</strong> {cost.AlquilerDelLocal} $<br />
              <strong>Servicios Públicos:</strong> {cost.ServiciosPublicos} $<br />
              <strong>Mantenimiento Maquinaria:</strong> {cost.MantenimientoMaquinaria} $<br />
              <strong>EEP:</strong> {cost.EEP} $<br />
              <strong>Formación y Capacitación de Empleados:</strong> {cost.FormacionyCapacitacionEmpleados} $<br />
              <strong>Seguros:</strong> {cost.Seguros} $<br />
              <strong>Gastos Oficina:</strong> {cost.GastosOficina} $<br />
              <strong>Transporte y Logística:</strong> {cost.TransporteyLogostica} $<br />
              <strong>Costos de Licencias y Permisos:</strong> {cost.CostosLicenciasyPermisos} $<br />
              <strong>Servicios Limpieza:</strong> {cost.ServiciosLimpieza} $<br />
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
