import { Empleado } from "./Empleado.js";

export class EmpleadoPorComision extends Empleado {
    constructor(id, nombre, salarioBase, antiguedad, totalVentas, porcentajeComision) {
        super(id, nombre, salarioBase, antiguedad);
        this.totalVentas = totalVentas;
        this.porcentajeComision = porcentajeComision;
    }

    calcularComision() {
        return this.totalVentas * (this.porcentajeComision / 100);
    }

    calcularBonoVentas() {
        // Bono adicional del 3% si las ventas superan $20.000.000
        if (this.totalVentas > 20000000) {
            return this.totalVentas * 0.03;
        }
        return 0;
    }

    obtenerBeneficios() {
        const comision = this.calcularComision();
        const bonoVentas = this.calcularBonoVentas();
        const bonoAlimentacion = 100000; // O el valor estándar que manejes

        return {
            comision,
            bonoVentas,
            bonoAlimentacion
        };
    }

    calcularSalarioBruto() {
        const beneficios = this.obtenerBeneficios();
        return (
            this.salarioBase +
            beneficios.comision +
            beneficios.bonoVentas +
            beneficios.bonoAlimentacion
        );
    }
}