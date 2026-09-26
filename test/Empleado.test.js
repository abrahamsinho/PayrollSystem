import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { Empleado } from "../js/models/Empleado.js";

// Subclase mínima solo para poder probar la lógica de la clase base
// (Empleado es abstracta: calcularSalarioBruto() debe implementarse en las hijas).
class EmpleadoDePrueba extends Empleado {
    constructor(salarioBrutoFijo) {
        super(1, "Empleado de prueba", 0, 0);
        this._salarioBrutoFijo = salarioBrutoFijo;
    }

    calcularSalarioBruto() {
        return this._salarioBrutoFijo;
    }
}

describe("Empleado (clase base)", () => {
    test("calcularSalarioBruto() lanza error si no se sobrescribe", () => {
        const empleado = new Empleado(1, "Genérico", 1000000, 0);
        assert.throws(
            () => empleado.calcularSalarioBruto(),
            /debe ser implementado en la clase hija/
        );
    });

    test("obtenerBeneficios() devuelve un objeto vacío por defecto", () => {
        const empleado = new Empleado(1, "Genérico", 1000000, 0);
        assert.deepEqual(empleado.obtenerBeneficios(), {});
    });

    test("constructor castea salarioBase y antiguedad a número", () => {
        const empleado = new Empleado(1, "Genérico", "1500000", "3");
        assert.equal(empleado.salarioBase, 1500000);
        assert.equal(empleado.antiguedad, 3);
        assert.equal(typeof empleado.salarioBase, "number");
        assert.equal(typeof empleado.antiguedad, "number");
    });

    test("calcularDeducciones() aplica 4% salud y 4% pensión sobre el salario bruto", () => {
        const empleado = new EmpleadoDePrueba(1000000);
        const deducciones = empleado.calcularDeducciones();

        assert.equal(deducciones.salud, 40000);
        assert.equal(deducciones.pension, 40000);
        assert.equal(deducciones.totalDeducciones, 80000);
    });

    test("calcularSalarioNeto() resta el total de deducciones del salario bruto", () => {
        const empleado = new EmpleadoDePrueba(1000000);
        // 1.000.000 - 8% (80.000) = 920.000
        assert.equal(empleado.calcularSalarioNeto(), 920000);
    });

    test("calcularSalarioNeto() nunca es negativo, incluso con bruto en 0", () => {
        const empleado = new EmpleadoDePrueba(0);
        assert.equal(empleado.calcularSalarioNeto(), 0);
    });

    test("calcularSalarioNeto() nunca es negativo con bruto negativo (caso defensivo)", () => {
        const empleado = new EmpleadoDePrueba(-500000);
        assert.equal(empleado.calcularSalarioNeto(), 0);
    });
});