import React, { useEffect, useState } from 'react';
import './FinalInforms.jsx';
import '../css/GenerarInformesDetallados.css';

const InformeProduccion = () => {
  const [datos, setDatos] = useState({
    productividad: 0,
    costosOperativosUnidad: 0,
    tasaDefectos: 0,
    produccionEfectiva: 0,
    eficienciaOperativa: 0,
    salarioBaseTotal: 0,
    beneficiosPrestaciones: 0,
    costosIndirectos: 0,
    costoDeManoDeObra: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDatos = async () => {
    try {
      const response = await fetch('https://665e64231e9017dc16efe11c.mockapi.io/InformeGeneral/1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDatos({
        productividad: data.Productividad,
        costosOperativosUnidad: data.CostosOperativos,
        tasaDefectos: data.TasadeDefectos,
        produccionEfectiva: data.ProduccionEfectiva,
        eficienciaOperativa: data.EficienciaOperativa,
        salarioBaseTotal: data.SalarioBaseTotal,
        beneficiosPrestaciones: data.BeneficiosyPresentaciones,
        costosIndirectos: data.CostosIndirectos,
        costoDeManoDeObra: data.CostosdeManodeObra
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const guardarInforme = async (informe) => {
    try {
      const response = await fetch('https://665e64231e9017dc16efe11c.mockapi.io/InformesFinales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(informe)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el informe');
      }

      const data = await response.json();
      console.log('Informe guardado exitosamente: ', data);
    } catch (error) {
      console.error("Error saving report: ", error);
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      guardarInforme(datos);
    }
  }, [datos, loading, error]);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='holamiamor'>
      <h1>INFORME DE PRODUCCION <br />DEL LOTE</h1>
      
      <section>
        <h2>PRODUCTIVIDAD</h2>
        <p>Productividad: {datos.productividad}</p>
      </section>

      <section>
        <h2>COSTOS OPERATIVOS </h2>
        <p>Costos Operativos por Unidad: {datos.costosOperativosUnidad}</p>
      </section>

      <section>
        <h2>Tasa de Defectos</h2>
        <p>Tasa de Defectos: {datos.tasaDefectos}%</p>
      </section>

      <section>
        <h2>Producción Efectiva</h2>
        <p>Producción Efectiva: {datos.produccionEfectiva}</p>
      </section>

      <section>
        <h2>Eficiencia Operativa</h2>
        <p>Eficiencia Operativa: {datos.eficienciaOperativa}</p>
      </section>

      <section>
        <h2>Costos de Mano de Obra</h2>
        <p>Salario Base Total: {datos.salarioBaseTotal}</p>
        <p>Beneficios y Prestaciones: {datos.beneficiosPrestaciones}</p>
        <p>Costos Indirectos: {datos.costosIndirectos}</p>
        <p>Costo de Mano de Obra: {datos.costoDeManoDeObra}</p>
      </section>
    </div>
  );
};

export default InformeProduccion;
