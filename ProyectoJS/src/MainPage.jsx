import React from 'react';
import './MainPage.css'; 

function ComponenteReact() {
  return (
    <div className="Container">
      <div className="section_left">
        <div className="logo">
          <h1>Gestor de confecciones pepita</h1>
        </div>
        <div className="opcion-1">
          <h3>Registrar y gestionar los datos de materia prima</h3>
        </div>
        <div className="opcion-2">
          <h3>Calcular costos de mano de obra</h3>
        </div>
        <div className="opcion-3">
          <h3>Incorporar costos indirectos</h3>
        </div>
        <div className="opcion-4">
          <h3>Generar informes detallados</h3>
        </div>
      </div>
      <div className="section_right">
        <div className="text">
          <h1>Bienvenido</h1>
          <p>gestor de administracion de confecciones pepita</p>
        </div>
      </div>
    </div>
  );
}

export default ComponenteReact;
