import React, { useState, useEffect } from 'react';
import './createMaterial.css';

const MaterialManager = () => {
  const [formData, setFormData] = useState({
    namematerial: '',
    materialDescription: '',
    materialCategory: '',
    materialProvider: '',
    unitPrice: '',
    stockUnit: '',
    purchaseDate: '',
    expirationDate: '',
    location: '',
    materialNotes: '',
    materialFrequency: 'mensual'
  });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('https://664cc9f4ede9a2b55651a257.mockapi.io/formulary');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
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

    if (!formData.namematerial || !formData.materialDescription || !formData.materialCategory || !formData.materialProvider || !formData.unitPrice || !formData.stockUnit || !formData.purchaseDate || !formData.expirationDate || !formData.location || !formData.materialNotes || !formData.materialFrequency) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `https://664cc9f4ede9a2b55651a257.mockapi.io/formulary/${currentId}`
        : 'https://664cc9f4ede9a2b55651a257.mockapi.io/formulary';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Material ${isEditing ? 'actualizado' : 'registrado'} con éxito.`);
        setMaterials((prevMaterials) => {
          if (isEditing) {
            return prevMaterials.map((material) =>
              material.id === currentId ? result : material
            );
          } else {
            return [...prevMaterials, result];
          }
        });
        resetForm();
      } else {
        alert('Error al registrar material: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar material.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este material?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://664cc9f4ede9a2b55651a257.mockapi.io/formulary/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== id));
        alert('Material eliminado con éxito.');
      } else {
        alert('Error al eliminar el material.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el material.');
    }
  };

  const handleEdit = (material) => {
    setFormData(material);
    setIsEditing(true);
    setCurrentId(material.id);
  };

  const resetForm = () => {
    setFormData({
      namematerial: '',
      materialDescription: '',
      materialCategory: '',
      materialProvider: '',
      unitPrice: '',
      stockUnit: '',
      purchaseDate: '',
      expirationDate: '',
      location: '',
      materialNotes: '',
      materialFrequency: 'mensual'
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="material-manager">
      <h2>{isEditing ? 'Editar Material' : 'Registrar Material'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="namematerial">Nombre del material:</label>
        <input
          type="text"
          id="namematerial"
          name="namematerial"
          value={formData.namematerial}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="materialDescription">Descripción del material:</label>
        <input
          type="text"
          id="materialDescription"
          name="materialDescription"
          value={formData.materialDescription}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="materialCategory">Categoría:</label>
        <input
          type="text"
          id="materialCategory"
          name="materialCategory"
          value={formData.materialCategory}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="materialProvider">Proveedor:</label>
        <input
          type="text"
          id="materialProvider"
          name="materialProvider"
          value={formData.materialProvider}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="unitPrice">Precio por unidad:</label>
        <input
          type="number"
          id="unitPrice"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <label htmlFor="stockUnit">Cantidad en Stock:</label>
        <input
          type="number"
          id="stockUnit"
          name="stockUnit"
          value={formData.stockUnit}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <label htmlFor="purchaseDate">Fecha de Adquisición:</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="expirationDate">Fecha de vencimiento:</label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="location">Ubicación en Almacén:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="materialNotes">Notas Adicionales:</label>
        <input
          type="text"
          id="materialNotes"
          name="materialNotes"
          value={formData.materialNotes}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="materialFrequency">Frecuencia del material:</label>
        <select
          id="materialFrequency"
          name="materialFrequency"
          value={formData.materialFrequency}
          onChange={handleChange}
          required
        >
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select><br /><br />

        <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <h2>Lista de Materiales</h2>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <strong>ID:</strong> {material.id} <br />
            <strong>Nombre:</strong> {material.namematerial} <br />
            <strong>Descripción:</strong> {material.materialDescription} <br />
            <strong>Categoría:</strong> {material.materialCategory} <br />
            <strong>Proveedor:</strong> {material.materialProvider} <br />
            <strong>Precio por unidad:</strong> {material.unitPrice} <br />
            <strong>Cantidad en Stock:</strong> {material.stockUnit} <br />
            <strong>Fecha de Adquisición:</strong> {material.purchaseDate} <br />
            <strong>Fecha de Vencimiento:</strong> {material.expirationDate} <br />
            <strong>Ubicación:</strong> {material.location} <br />
            <strong>Notas:</strong> {material.materialNotes} <br />
            <strong>Frecuencia:</strong> {material.materialFrequency} <br />
            <button onClick={() => handleEdit(material)}>Editar</button>
            <button onClick={() => handleDelete(material.id)}>Eliminar</button>
            <br /><br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialManager;
