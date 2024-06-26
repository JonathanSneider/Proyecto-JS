import React, { useState } from 'react';
import './EditMaterialForm.css'; 



const EditMaterialForm = ({ material, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...material });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-material-form">
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

        <button type="submit">Actualizar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditMaterialForm;