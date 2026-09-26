import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { EmpleadoPorComision } from "../js/models/EmpleadoPorComision.js";

describe("EmpleadoPorComision", () => {
    test("calcularComision() aplica el porcentaje sobre el total de ventas", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 10000000, 5);
        assert.equal(empleado.calcularComision(), 500000); // 10.000.000 * 5%
    });

    test("sin bono de ventas cuando las ventas son exactamente $20.000.000 (límite, regla es '> 20M')", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 20000000, 5);
        assert.equal(empleado.calcularBonoVentas(), 0);
    });

    test("con bono de ventas (3%) cuando las ventas superan $20.000.000", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 25000000, 5);
        assert.equal(empleado.calcularBonoVentas(), 750000); // 25.000.000 * 3%
    });

    test("sin bono de ventas cuando las ventas son bajas", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 5000000, 5);
        assert.equal(empleado.calcularBonoVentas(), 0);
    });

    test("obtenerBeneficios() incluye comisión, bono de ventas y bono de alimentación fijo", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 25000000, 5);
        const beneficios = empleado.obtenerBeneficios();

        assert.equal(beneficios.comision, 1250000); // 25.000.000 * 5%
        assert.equal(beneficios.bonoVentas, 750000);
        assert.equal(beneficios.bonoAlimentacion, 100000);
    });

    test("calcularSalarioBruto() suma salario base + comisión + bono ventas + bono alimentación", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 25000000, 5);
        // 1.300.000 + 1.250.000 (comisión) + 750.000 (bono ventas) + 100.000 (alimentación)
        assert.equal(empleado.calcularSalarioBruto(), 3400000);
    });

    test("calcularSalarioBruto() sin ventas: solo salario base + bono alimentación", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 0, 5);
        assert.equal(empleado.calcularSalarioBruto(), 1400000);
    });

    test("flujo completo: deducciones y salario neto", () => {
        const empleado = new EmpleadoPorComision(1, "Laura Díaz", 1300000, 2, 25000000, 5);
        // Bruto = 3.400.000
        const deducciones = empleado.calcularDeducciones();
        assert.equal(deducciones.totalDeducciones, 272000); // 8% de 3.400.000
        assert.equal(empleado.calcularSalarioNeto(), 3128000);
    });
});