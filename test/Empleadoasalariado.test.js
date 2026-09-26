import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { EmpleadoAsalariado } from "../js/models/EmpleadoAsalariado.js";

describe("EmpleadoAsalariado", () => {
    test("sin bono de antigüedad cuando antiguedad = 0", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 0);
        assert.equal(empleado.calcularBonoAntiguedad(), 0);
    });

    test("sin bono de antigüedad cuando antiguedad = 5 (límite exacto, regla es '> 5')", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 5);
        assert.equal(empleado.calcularBonoAntiguedad(), 0);
    });

    test("con bono de antigüedad (10%) cuando antiguedad = 6", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 6);
        assert.equal(empleado.calcularBonoAntiguedad(), 300000);
    });

    test("con bono de antigüedad cuando antiguedad es muy alta", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 20);
        assert.equal(empleado.calcularBonoAntiguedad(), 300000);
    });

    test("calcularSalarioBruto() sin bono = solo salario base", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 2);
        assert.equal(empleado.calcularSalarioBruto(), 3000000);
    });

    test("calcularSalarioBruto() con bono = salario base + 10%", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 8);
        assert.equal(empleado.calcularSalarioBruto(), 3300000);
    });

    test("obtenerBeneficios() incluye bonoAntiguedad y bonoAlimentacion fijo de $1.000.000", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 8);
        const beneficios = empleado.obtenerBeneficios();

        assert.equal(beneficios.bonoAntiguedad, 300000);
        assert.equal(beneficios.bonoAlimentacion, 1000000);
    });

    test("el bono de alimentación NO se suma al salario bruto", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 0);
        // Si se sumara, el bruto sería 4.000.000
        assert.equal(empleado.calcularSalarioBruto(), 3000000);
    });

    test("flujo completo: deducciones y salario neto con bono de antigüedad", () => {
        const empleado = new EmpleadoAsalariado(1, "Carlos Pérez", 3000000, 6);
        // Bruto = 3.300.000
        const deducciones = empleado.calcularDeducciones();
        assert.equal(deducciones.salud, 132000);
        assert.equal(deducciones.pension, 132000);
        assert.equal(deducciones.totalDeducciones, 264000);
        assert.equal(empleado.calcularSalarioNeto(), 3036000);
    });
});