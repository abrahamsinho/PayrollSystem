/**
 * =========================================================
 * CLASE PADRE: EMPLEADO
 * =========================================================
 *
 * Esta clase representa las características generales
 * que comparten los diferentes tipos de empleados.
 *
 * Las clases hijas:
 * - EmpleadoAsalariado
 * - EmpleadoPorHoras
 * - EmpleadoPorComision
 * - EmpleadoTemporal
 *
 * heredarán de esta clase base.
 * =========================================================
 */

export class Empleado {
    /**
     * Constructor de la clase Empleado.
     *
     * @param {number|string} id - Identificación única del empleado.
     * @param {string} nombre - Nombre completo.
     * @param {number} salarioBase - Sueldo o tarifa base.
     * @param {number} antiguedad - Años de antigüedad en la empresa.
     */
    constructor(id, nombre, salarioBase, antiguedad) {
        this.id = id;
        this.nombre = nombre;
        this.salarioBase = Number(salarioBase);
        this.antiguedad = Number(antiguedad);
    }

    /**
     * Calcula el salario bruto.
     * Este método debe ser sobrescrito por las clases especializadas (hijas).
     * @returns {number}
     */
    calcularSalarioBruto() {
        throw new Error(
            "El método calcularSalarioBruto() debe ser implementado en la clase hija."
        );
    }

    /**
     * Obtiene los beneficios o bonos del empleado.
     * Las clases hijas pueden sobrescribir este método según sus reglas de negocio.
     * @returns {Object}
     */
    obtenerBeneficios() {
        return {};
    }

    /**
     * REGLA DE NEGOCIO N° 2:
     * Calcula las deducciones obligatorias sobre el Salario Bruto.
     * - Salud: 4%
     * - Pensión: 4%
     * 
     * @returns {Object} Objeto con el desglose de deducciones.
     */
    calcularDeducciones() {
        const salarioBruto = this.calcularSalarioBruto();
        const salud = salarioBruto * 0.04;
        const pension = salarioBruto * 0.04;

        return {
            salud: salud,
            pension: pension,
            totalDeducciones: salud + pension
        };
    }

    /**
     * REGLA DE NEGOCIO N° 4:
     * Calcula el salario neto (Salario Bruto - Total Deducciones).
     * Garantiza que ningún empleado tenga un salario neto negativo.
     * 
     * @returns {number} Salario neto a pagar.
     */
    calcularSalarioNeto() {
        const salarioBruto = this.calcularSalarioBruto();
        const deducciones = this.calcularDeducciones();
        const neto = salarioBruto - deducciones.totalDeducciones;

        // Si el neto resulta menor a cero por alguna razón, devuelve 0
        return Math.max(0, neto);
    }
}