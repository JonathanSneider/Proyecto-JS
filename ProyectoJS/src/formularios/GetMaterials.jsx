import React, { useState, useEffect } from 'react';
import './GetMaterial.css';
import EditMaterialForm from './EditMaterialForm'; // Asegúrate de importar el nuevo componente

const FetchMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

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

  const handleEdit = (material) => {
    setEditingMaterial(material);
  };

  const handleCancelEdit = () => {
    setEditingMaterial(null);
  };

  const handleSaveEdit = async (updatedMaterial) => {
    try {
      const response = await fetch(`https://664cc9f4ede9a2b55651a257.mockapi.io/formulary/${updatedMaterial.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMaterial)
      });

      if (response.ok) {
        const updatedMaterials = materials.map((material) =>
          material.id === updatedMaterial.id ? updatedMaterial : material
        );
        setMaterials(updatedMaterials);
        setEditingMaterial(null);
        alert('Material actualizado con éxito.');
      } else {
        alert('Error al actualizar el material.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el material.');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="material-manager-list">
      {editingMaterial ? (
        <EditMaterialForm
          material={editingMaterial}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div>
          <h2>Lista de Materiales</h2>
          <ul>
            {materials.map((material) => (
              <li key={material.id}>
                <div className="material-info">
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
                </div>
                <div className="material-actions">
                  <button onClick={() => handleEdit(material)}>Actualizar</button>
                  <button onClick={() => handleDelete(material.id)}>Eliminar</button>
                </div>
                <br /><br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchMaterials;