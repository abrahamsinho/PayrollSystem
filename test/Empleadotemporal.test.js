import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { EmpleadoTemporal } from "../js/models/EmpleadoTemporal.js";

describe("EmpleadoTemporal", () => {
    test("lanza error si el salario es negativo", () => {
        assert.throws(
            () => new EmpleadoTemporal(1, "Juan Martínez", -100, "2026-01-01", "2026-03-01"),
            /salario no puede ser negativo/
        );
    });

    test("lanza error si las fechas no son válidas", () => {
        assert.throws(
            () => new EmpleadoTemporal(1, "Juan Martínez", 1800000, "fecha-invalida", "2026-03-01"),
            /fechas del contrato no son válidas/
        );
    });

    test("lanza error si la fecha de fin es anterior a la de inicio", () => {
        assert.throws(
            () => new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-03-01", "2026-01-01"),
            /fecha de fin debe ser posterior/
        );
    });

    test("lanza error si la fecha de fin es igual a la de inicio", () => {
        assert.throws(
            () => new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-01-01", "2026-01-01"),
            /fecha de fin debe ser posterior/
        );
    });

    test("calcularDuracionContratoDias() calcula correctamente los días del contrato", () => {
        const empleado = new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-01-01", "2026-02-01");
        assert.equal(empleado.calcularDuracionContratoDias(), 31);
    });

    test("calcularSalarioBruto() es igual al salario base, sin bonos", () => {
        const empleado = new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-01-01", "2026-03-01");
        assert.equal(empleado.calcularSalarioBruto(), 1800000);
    });

    test("obtenerBeneficios() indica que no hay bonos ni beneficios adicionales", () => {
        const empleado = new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-01-01", "2026-03-01");
        const beneficios = empleado.obtenerBeneficios();
        assert.equal(beneficios.bono, 0);
        assert.equal(beneficios.descripcion, "No aplican bonos ni beneficios adicionales.");
    });

    test("flujo completo: deducciones y salario neto sin bonos", () => {
        const empleado = new EmpleadoTemporal(1, "Juan Martínez", 1800000, "2026-01-01", "2026-03-01");
        const deducciones = empleado.calcularDeducciones();
        assert.equal(deducciones.totalDeducciones, 144000); // 8% de 1.800.000
        assert.equal(empleado.calcularSalarioNeto(), 1656000);
    });
});