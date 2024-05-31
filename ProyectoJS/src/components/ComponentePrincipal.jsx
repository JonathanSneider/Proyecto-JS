import React, { useState } from 'react';
import RightSidePage from './RightSidePage.jsx';
import SearchConstante from './SearchMaterial'
import './ComponentePrincipal.css';

function ComponenteReact() {
  const [mostrarNuevoComponente, setMostrarNuevoComponente] = useState(false);
  const [mostrarComponenteDos, setMostrarComponenteDos] = useState(false);

  function startProgram() {
    setMostrarNuevoComponente(true);
    setMostrarComponenteDos(false);
  }

  function startSecondProgram() {
    setMostrarComponenteDos(true);
    setMostrarNuevoComponente(false);
  }

  return (
    <div className="Contasiner">
      <div className="spaso_left">
        {!mostrarNuevoComponente && !mostrarComponenteDos && (
          <>
            <div className="opcion-1" onClick={startProgram}>
              <h3>Registrar materia prima</h3>
            </div>
            <div className="opcion-2" onClick={startSecondProgram}>
              <h3>Buscar materia prima</h3>
            </div>
          </>
        )}
      </div>
      {mostrarNuevoComponente && (
        <div className="full-screen-component">
          <RightSidePage />
        </div>
      )}
      {mostrarComponenteDos && (
        <div className="full-screen-component">
          <SearchConstante />
        </div>
      )}
    </div>
  );
}

export default ComponenteReact;