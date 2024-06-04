import React from 'react';
import './FinalInforms.jsx'

const InformeProduccion = ({
  productosTerminados,
  horasProduccion,
  costosOperativos,
  productosDefectuosos,
  productosFabricados,
  salarioBaseHora,
  horasTrabajadas,
  beneficiosPrestacionesEmpleado,
  costosIndirectosEmpleado
}) => {

  const productividad = (productosTerminados, horasProduccion) => {
    return productosTerminados / horasProduccion;
  };

  const costosOperativosUnidad = (costosOperativos, productosTerminados) => {
    return costosOperativos / productosTerminados;
  };

  const tasaDefectos = (productosDefectuosos, productosFabricados) => {
    return (productosDefectuosos / productosFabricados) * 100;
  };

  const produccionEfectiva = (productosTerminados, productosDefectuosos) => {
    return productosTerminados - productosDefectuosos;
  };

  const eficienciaOperativa = (produccionEfectiva, costosOperativos) => {
    return produccionEfectiva / costosOperativos;
  };

  const salarioBaseTotal = (salarioBaseHora, horasTrabajadas) => {
    return salarioBaseHora * horasTrabajadas; // Hay que sumar todos los salarios bases de todos los empleados
  };

  const beneficiosPrestaciones = (beneficiosPrestacionesEmpleado) => {
    return beneficiosPrestacionesEmpleado; // Hay que sumar todos los beneficios y prestaciones de todos los empleados
  };

  const costosIndirectos = (costosIndirectosEmpleado) => {
    return costosIndirectosEmpleado; // Hay que sumar todos los costos indirectos de todos los empleados
  };

  const costoDeManoDeObra = (salarioBaseHora, horasTrabajadas, beneficiosPrestaciones) => {
    return (salarioBaseHora * horasTrabajadas) + beneficiosPrestaciones;
  };

  return (
    <div class='holamiamor'>
      <h1>INFORME DE PRODUCCION</h1>
      
      <section>
        <h2>PRODUCTIVIDAD</h2>
        <p>Productividad: {productividad(productosTerminados, horasProduccion)}</p>
      </section>

      <section>
        <h2>COSTOS OPERATIVOS </h2>
        <p>Costos Operativos por Unidad: {costosOperativosUnidad(costosOperativos, productosTerminados)}</p>
      </section>

      <section>
        <h2>Tasa de Defectos</h2>
        <p>Tasa de Defectos: {tasaDefectos(productosDefectuosos, productosFabricados)}%</p>
      </section>

      <section>
        <h2>Producción Efectiva</h2>
        <p>Producción Efectiva: {produccionEfectiva(productosTerminados, productosDefectuosos)}</p>
      </section>

      <section>
        <h2>Eficiencia Operativa</h2>
        <p>Eficiencia Operativa: {eficienciaOperativa(produccionEfectiva(productosTerminados, productosDefectuosos), costosOperativos)}</p>
      </section>

      <section>
        <h2>Costos de Mano de Obra</h2>
        <p>Salario Base Total: {salarioBaseTotal(salarioBaseHora, horasTrabajadas)}</p>
        <p>Beneficios y Prestaciones: {beneficiosPrestaciones(beneficiosPrestacionesEmpleado)}</p>
        <p>Costos Indirectos: {costosIndirectos(costosIndirectosEmpleado)}</p>
        <p>Costo de Mano de Obra: {costoDeManoDeObra(salarioBaseHora, horasTrabajadas, beneficiosPrestaciones(beneficiosPrestacionesEmpleado))}</p>
      </section>
    </div>
  );
};

export default InformeProduccion;

