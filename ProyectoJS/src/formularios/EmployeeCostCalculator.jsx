import React, { useState } from 'react';
import './EmployeeCostCalculator.css'; // Asegúrate de importar el CSS

const EmployeeCostCalculator = () => {
  const [formData, setFormData] = useState({
    hourlyWage: '',
    hoursWorked: '',
    benefits: '',
    indirectCosts: ''
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Realizar el cálculo
    const salaryBase = parseFloat(formData.hourlyWage) * parseFloat(formData.hoursWorked);
    const benefits = parseFloat(formData.benefits);
    const indirectCosts = parseFloat(formData.indirectCosts);
    const totalCost = salaryBase + benefits + indirectCosts;
    setResult(totalCost);

    // Preparar datos para MockAPI
    const dataToSave = {
      ...formData,
      totalCost
    };

    // Guardar datos en MockAPI
    setIsLoading(true);
    try {
      const response = await fetch('https://665e64231e9017dc16efe11c.mockapi.io/employeeCost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      });
      if (response.ok) {
        alert('Datos guardados con éxito.');
      } else {
        const result = await response.json();
        alert('Error al guardar datos: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Calculadora de Costos de mano de obra</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="hourlyWage">Salario base por hora:</label>
        <input
          type="number"
          id="hourlyWage"
          name="hourlyWage"
          value={formData.hourlyWage}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <label htmlFor="hoursWorked">Horas trabajadas:</label>
        <input
          type="number"
          id="hoursWorked"
          name="hoursWorked"
          value={formData.hoursWorked}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <label htmlFor="benefits">Beneficio y prestaciones:</label>
        <input
          type="number"
          id="benefits"
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <label htmlFor="indirectCosts">Costos indirectos:</label>
        <input
          type="number"
          id="indirectCosts"
          name="indirectCosts"
          value={formData.indirectCosts}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <button type="submit" disabled={isLoading}>{isLoading ? 'Guardando...' : 'Calcular y Guardar'}</button>
      </form>
      
      {result !== null && (
        <div>
          <h3>Resultado del Cálculo</h3>
          <p>Costo total de mano de obra: {result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeCostCalculator;