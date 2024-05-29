import React, { useState } from 'react';

const RegisterCostForm = () => {
  const [formData, setFormData] = useState({
    costDescription: '',
    costAmount: '',
    costFrequency: 'mensual'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { costDescription, costAmount, costFrequency } = formData;

    if (!costDescription || !costAmount || !costFrequency) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('https://664cc9f4ede9a2b55651a257.mockapi.io/costs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Costo indirecto registrado con éxito.');
        // Reset form
        setFormData({
          costDescription: '',
          costAmount: '',
          costFrequency: 'mensual'
        });
      } else {
        alert('Error al registrar costo indirecto: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar costo indirecto.');
    }
  };

  return (
    <div>
      <h2>Registrar Costos Indirectos</h2>
      <form onSubmit={handleSubmit}>

      <label htmlFor="costDescription">Descripción del Costo:</label>
        <input
          type="text"
          id="nombre"
          name="costDescription"
          value={formData.costDescription}
          onChange={handleChange}
          required
        /><br/><br/>



        <label htmlFor="costDescription">Descripción del Costo:</label>
        <input
          type="text"
          id="costDescription"
          name="costDescription"
          value={formData.costDescription}
          onChange={handleChange}
          required
        /><br/><br/>
        
        <label htmlFor="costAmount">Monto del Costo:</label>
        <input
          type="number"
          id="costAmount"
          name="costAmount"
          value={formData.costAmount}
          onChange={handleChange}
          step="0.01"
          required
        /><br/><br/>
        
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
        </select><br/><br/>
        
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterCostForm;
