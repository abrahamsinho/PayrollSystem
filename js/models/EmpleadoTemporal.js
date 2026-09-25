/**
 * =========================================================
 * EMPLEADO TEMPORAL
 * =========================================================
 *
 * Reglas de negocio:
 *
 * 1. Tiene un salario fijo mensual.
 *
 * 2. Trabaja bajo un contrato por tiempo definido,
 *    delimitado por una fecha de inicio y una fecha
 *    de finalización.
 *
 * 3. No aplican bonos ni beneficios adicionales
 *    (ni bono de alimentación, ni fondo de ahorro,
 *    ni bono por antigüedad).
 *
 * =========================================================
 */

import { Empleado } from "./Empleado.js";

export class EmpleadoTemporal extends Empleado {

    /**
     * Constructor de la clase EmpleadoTemporal.
     *
     * @param {number} id
     * @param {string} nombre
     * @param {number} salarioBase
     * @param {string} fechaInicio  Fecha de inicio del contrato (YYYY-MM-DD).
     * @param {string} fechaFin     Fecha de finalización del contrato (YYYY-MM-DD).
     */

    constructor(
        id,
        nombre,
        salarioBase,
        fechaInicio,
        fechaFin
    ) {

        /*
         * Llamamos al constructor de la clase padre.
         * No tiene antigüedad relevante, ya que es
         * un contrato de corta duración.
         */

        super(
            id,
            nombre,
            salarioBase,
            0
        );

        if (salarioBase < 0) {

            throw new Error(
                "El salario no puede ser negativo."
            );
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {

            throw new Error(
                "Las fechas del contrato no son válidas."
            );
        }

        if (fin <= inicio) {

            throw new Error(
                "La fecha de fin debe ser posterior a la fecha de inicio."
            );
        }

        this.fechaInicio = fechaInicio;

        this.fechaFin = fechaFin;
    }


    /**
     * Calcula la duración del contrato en días.
     *
     * @returns {number}
     */

    calcularDuracionContratoDias() {

        const inicio = new Date(this.fechaInicio);
        const fin = new Date(this.fechaFin);

        const msPorDia = 1000 * 60 * 60 * 24;

        return Math.round(
            (fin - inicio) / msPorDia
        );
    }


    /**
     * Calcula el salario bruto.
     *
     * Al ser un salario fijo mensual, el salario bruto
     * es igual al salario base, sin bonos adicionales.
     *
     * @returns {number}
     */

    calcularSalarioBruto() {

        return this.salarioBase;
    }


    /**
     * Obtiene los beneficios del empleado.
     *
     * El empleado temporal no recibe bonos ni
     * beneficios adicionales.
     *
     * @returns {object}
     */

    obtenerBeneficios() {

        return {

            bono: 0,

            descripcion:
                "No aplican bonos ni beneficios adicionales."

        };
    }

}