/**
 * =========================================================
 * CLASE EMPLEADO
 * =========================================================
 *
 * Esta clase representa las características generales
 * que pueden tener los diferentes tipos de empleados.
 *
 * Las clases:
 *
 * - EmpleadoAsalariado
 * - EmpleadoPorHoras
 * - EmpleadoComision
 * - EmpleadoTemporal
 *
 * heredarán de esta clase.
 * =========================================================
 */

export class Empleado {


    /**
     * Constructor de la clase Empleado.
     *
     * @param {number} id
     * @param {string} nombre
     * @param {number} salarioBase
     * @param {number} antiguedad
     */

    constructor(
        id,
        nombre,
        salarioBase,
        antiguedad
    ) {

        this.id = id;

        this.nombre = nombre;

        this.salarioBase = salarioBase;

        this.antiguedad = antiguedad;
    }


    /**
     * Calcula el salario bruto.
     *
     * Este método será sobrescrito por las clases
     * especializadas.
     */

    calcularSalarioBruto() {

        throw new Error(
            "El método calcularSalarioBruto() debe ser implementado."
        );
    }


    /**
     * Obtiene los beneficios del empleado.
     *
     * Las clases hijas pueden sobrescribir este método.
     */

    obtenerBeneficios() {

        return {};
    }

}