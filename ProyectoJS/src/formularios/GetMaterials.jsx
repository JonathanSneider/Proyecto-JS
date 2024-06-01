import React, { useState, useEffect } from 'react';
import './createMaterial.css';

const FetchMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Lista de Materiales</h2>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <strong>ID:</strong> {material.id} <br />
            <strong>Nombre:</strong> {material.namematerial} <br />
            <strong>Descripción:</strong> {material.materialDescription} <br />
            <strong>Categoría:</strong> {material.materialCategory} <br />
            <strong>Proveedor:</strong> {material.materialProvider} <br />
            <strong>Costo por Unidad:</strong> {material.unitPrice} <br />
            <strong>Unidad de Medida:</strong> {material.unitMeasure} <br />
            <strong>Cantidad en Stock:</strong> {material.stockUnit} <br />
            <strong>Fecha de Adquisición:</strong> {material.purchaseDate} <br />
            <strong>Fecha de Vencimiento:</strong> {material.expirationDate} <br />
            <strong>Ubicación en Almacén:</strong> {material.location} <br />
            <strong>Notas Adicionales:</strong> {material.materialNotes} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchMaterials;
