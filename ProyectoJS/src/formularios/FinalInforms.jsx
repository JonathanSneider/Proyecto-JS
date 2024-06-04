import React from 'react'
import '../css/GenerarInformesDetallados.css';




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


// URL del endpoint
const url = 'https://665e64231e9017dc16efe11c.mockapi.io/employeeCost';

// Realizar la solicitud fetch
fetch(url)
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        // Convertir la respuesta a formato JSON
        return response.json();
    })
    .then(data => {
        
        console.log(data);
        // Llamar a la función que suma algunos datos
        const suma = sumarDatos(data);
        console.log('La suma de los datos es:', suma);
    })
    .catch(error => {
        // Manejar errores
        console.error('Hubo un problema con la solicitud fetch:', error);
    });

// Función para sumar algunos datos del endpoint
function sumarDatos(data) {
    // Supongamos que los datos que queremos sumar están en una propiedad 'valores'
    let suma = 0;
    data.valores.forEach(valor => {
        suma += valor;
    });
    return suma;
}
