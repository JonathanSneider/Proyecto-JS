import React, { useState, useEffect } from 'react';

const FetchAndDeleteCosts = () => {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Lista de Costos Indirectos</h2>
      <ul>
        {costs.map((cost) => (
          <li key={cost.id}>
            <strong>ID:</strong> {cost.id} <br/>
            <strong>Descripción:</strong> {cost.costDescription} <br/>
            <strong>Monto:</strong> {cost.costAmount} <br/>
            <strong>Frecuencia:</strong> {cost.costFrequency} <br/>
            <button onClick={() => handleDelete(cost.id)}>Eliminar</button>
            <br/><br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchAndDeleteCosts;
