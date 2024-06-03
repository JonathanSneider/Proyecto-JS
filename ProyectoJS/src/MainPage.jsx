import React, { useState } from 'react';
import './css/MainPage.css'; 
import ComponentePrincipal from './components/DatosMateriaPrima.jsx';
import UpdateConstante from './components/IncorporarCostosIndirectos.jsx';
import CostsCalc from './components/CalcularCostosManoObra.jsx';


function ComponenteReact() {
  const [mostrarNuevoComponente, setMostrarNuevoComponente] = useState(false);
  const [mostrarComponenteDos, setMostrarComponenteDos] = useState(false);
  const [mostrarComponenteTres, setMostrarComponenteTres] = useState(false);
  const [mostrarComponenteCuatro, setMostrarComponenteCuatro] = useState(false);

  function returnpage() {
    setMostrarNuevoComponente(false);
    setMostrarComponenteDos(false);
    setMostrarComponenteTres(false);
    setMostrarComponenteCuatro(false);
  }

  function startProgram() {
    setMostrarNuevoComponente(true);
    setMostrarComponenteDos(false);
    setMostrarComponenteTres(false);
    setMostrarComponenteCuatro(false);
  }

  function startSecondProgram() {
    setMostrarComponenteDos(true);
    setMostrarNuevoComponente(false);
    setMostrarComponenteTres(false);
    setMostrarComponenteCuatro(false);
  }

  function startThirdProgram() {
    setMostrarComponenteTres(true);
    setMostrarNuevoComponente(false);
    setMostrarComponenteDos(false);
    setMostrarComponenteCuatro(false);
  }

  function startFourthProgram() {
    setMostrarComponenteCuatro(true);
    setMostrarNuevoComponente(false);
    setMostrarComponenteDos(false);
    setMostrarComponenteTres(false);
  }

  return (
    <div className="Container">
      <div className="section_left">
        <div className="logo" onClick={returnpage}>
          <h1>Gestor de confecciones pepita</h1>
        </div>
        <div className="opcion-1" onClick={startProgram}>
          <h3>Registrar y gestionar los datos de materia prima</h3>
        </div>
        <div className="opcion-2" onClick={startSecondProgram}>
          <h3>Calcular costos de mano de obra</h3>
        </div>
        <div className="opcion-3" onClick={startThirdProgram}>
          <h3>Incorporar costos indirectos</h3>
        </div>
        <div className="opcion-4" onClick={startFourthProgram}>
          <h3>Generar informes detallados</h3>
        </div>
      </div>
      <div className="section_right">
        {!mostrarNuevoComponente && !mostrarComponenteDos && !mostrarComponenteTres && !mostrarComponenteCuatro ? (
          <div className="text">
            <h1>Bienvenido</h1>
            <p>gestor de administracion de confecciones pepita</p>
            <img src="/img/logoconfeccionespepita.jpg" alt="" />
          </div>
        ) : mostrarNuevoComponente ? (
          <ComponentePrincipal />
        ) : mostrarComponenteDos ? (
          <CostsCalc />
        ) : mostrarComponenteTres ? (
          <UpdateConstante />
        ) : (
          <ComponenteCuatro />
        )}
      </div>
    </div>
  );
}

// Componentes adicionales que podrían cargarse

function ComponenteCuatro() {
  return (
    <div className="text">
      <h1>Cuarto componente web</h1>
      <h1>este es mi componente sapas</h1>
      <p>Este es otro componente que se muestra al hacer clic en la opción-4.</p>
    </div>
  );
}

export default ComponenteReact;