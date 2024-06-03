import React from "react";
import EmployeeCostCalculator from '../formularios/EmployeeCostCalculator'
import '../css/CalcularCostosManoObra.css'

const CostsCalc = () => {
    return (
        <div className="costos-manoobra">
            <EmployeeCostCalculator/>
        </div>
    );
}

export default CostsCalc;