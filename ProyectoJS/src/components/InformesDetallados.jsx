import React from 'react'
import '/InformesDetallados.css';


//FUNCIONES PARA SACAR LA EFICIENCIA OPERATIVA

function Productividad(ProductosTerminados, HorasProduccion){
    return ProductosTerminados/HorasProduccion
} //CALCULAR LA PRODUCTIVIDAD

function CostosOperativosUnidad(CostosOperativos, ProductosTerminados){
    return CostosOperativos/ProductosTerminados
} // CALCULAR LOS COSTOS OPERATIVOS POR UNIDAD

function TasaDefectos(ProductosDefectuosos, ProductosFabricados){
    return (ProductosDefectuosos/ProductosFabricados)*100
} //CALCULAR LA TASA DE DEFECTOS

function ProduccionEfectiva(ProductosTerminados, ProductosDefectuosos){
    return ProductosTerminados-ProductosDefectuosos
} //CALCULAR LA PRODUCCION EFECTIVA

function EficienciaOperativa(ProduccionEfectiva, CostosOperativos){
    return ProduccionEfectiva/CostosOperativos
}




function SalarioBaseTotal(SalarioBaseHora, HorasTrabajadas){
    return SalarioBaseHora*HorasTrabajadas //HAY QUE SUMAR TODOS LOS SALARIOS BASES DE TODOS LOS EMPLEADOS
}

function BeneficiosPrestaciones(BeneficiosPrestacionesEmpleado){
    return BeneficiosPrestacionesEmpleado  //HAY QUE SUMAR TODOS LOS BENEFICIOS Y PRESTACIONES DE TODOS LOS EMPLEADOS
}

function CostosIndirectos(CostosIndirectosEmpleado){
    return CostosIndirectosEmpleado //HAY QUE SUMAR TODOS LOS COSTOS INDIRECTOS DE TODOS LOS EMPLEADOS
}

function CostoDeManoDeObra(SalarioBaseHora, HorasTrabajadas, BeneficiosPrestaciones){
    return (SalarioBaseHora*HorasTrabajadas) + BeneficiosPrestaciones
}