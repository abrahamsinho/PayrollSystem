/**
 * =========================================================
 * EMPLEADO ASALARIADO
 * =========================================================
 *
 * Reglas de negocio:
 *
 * 1. Tiene un salario fijo mensual.
 *
 * 2. Si lleva más de 5 años en la empresa:
 *
 *      Bono = 10% del salario
 *
 * 3. Es empleado permanente.
 *
 * 4. Recibe bono de alimentación:
 *
 *      $1.000.000 mensuales
 *
 * 5. El bono de alimentación es un beneficio cubierto
 *    por la empresa y no se suma al salario bruto.
 *
 * =========================================================
 */

import { Empleado } from "./Empleado.js";


export class EmpleadoAsalariado
    extends Empleado {


    /**
     * Constructor.
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

        /*
         * Llamamos al constructor de la clase padre.
         */

        super(
            id,
            nombre,
            salarioBase,
            antiguedad
        );


        /*
         * Valor del bono de alimentación.
         */

        this.bonoAlimentacion = 1000000;
    }


    /**
     * Calcula el bono por antigüedad.
     *
     * Si tiene más de 5 años:
     *
     * salario × 10%
     *
     * Si tiene 5 años o menos:
     *
     * $0
     *
     * @returns {number}
     */

    calcularBonoAntiguedad() {

        if (this.antiguedad > 5) {

            return this.salarioBase * 0.10;
        }

        return 0;
    }


    /**
     * Calcula el salario bruto.
     *
     * Salario bruto =
     *
     * salario base
     * +
     * bono por antigüedad
     *
     * @returns {number}
     */

    calcularSalarioBruto() {

        const bonoAntiguedad =
            this.calcularBonoAntiguedad();


        return (
            this.salarioBase +
            bonoAntiguedad
        );
    }


    /**
     * Obtiene los beneficios del empleado.
     *
     * @returns {object}
     */

    obtenerBeneficios() {

        return {

            bonoAntiguedad:
                this.calcularBonoAntiguedad(),

            bonoAlimentacion:
                this.bonoAlimentacion

        };
    }

}