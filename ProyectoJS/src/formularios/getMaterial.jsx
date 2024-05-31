import React, { useState, useEffect } from 'react';
import './FetchCosts.css';



const FetchCosts = () => {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await fetch('https://664cc9f4ede9a2b55651a257.mockapi.io/formulary');
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="costs-container">
      <h2 className="costs-title">Lista de Costos Indirectos</h2>
      <ul className="costs-list">
        {costs.map((cost) => (
          <li key={cost.id} className="cost-item">
            <strong>ID:</strong> {cost.id} <br/>
            <strong>Descripción:</strong> {cost.costDescription} <br/>
            <strong>Monto:</strong> {cost.costAmount} <br/>
            <strong>Frecuencia:</strong> {cost.costFrequency} <br/><br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchCosts;