import { Empleado } from "./Empleado.js";

/**
 * Representa a un empleado remunerado por las horas trabajadas.
 * Las primeras 40 horas se pagan a la tarifa normal y las restantes
 * tienen un recargo del 50 %.
 */
export class EmpleadoPorHoras extends Empleado {
    static HORAS_ORDINARIAS_MAXIMAS = 40;
    static MULTIPLICADOR_HORA_EXTRA = 1.5;

    constructor(id, nombre, tarifaHora, horasTrabajadas) {
        super(id, nombre, tarifaHora, 0);

        if (tarifaHora < 0) {
            throw new Error("La tarifa por hora no puede ser negativa.");
        }

        if (horasTrabajadas < 0) {
            throw new Error("Las horas trabajadas no pueden ser negativas.");
        }

        this.tarifaHora = tarifaHora;
        this.horasTrabajadas = horasTrabajadas;
    }

    calcularHorasOrdinarias() {
        return Math.min(
            this.horasTrabajadas,
            EmpleadoPorHoras.HORAS_ORDINARIAS_MAXIMAS
        );
    }

    calcularHorasExtras() {
        return Math.max(
            this.horasTrabajadas - EmpleadoPorHoras.HORAS_ORDINARIAS_MAXIMAS,
            0
        );
    }

    calcularPagoHorasOrdinarias() {
        return this.calcularHorasOrdinarias() * this.tarifaHora;
    }

    calcularPagoHorasExtras() {
        return (
            this.calcularHorasExtras() *
            this.tarifaHora *
            EmpleadoPorHoras.MULTIPLICADOR_HORA_EXTRA
        );
    }

    calcularSalarioBruto() {
        return this.calcularPagoHorasOrdinarias() + this.calcularPagoHorasExtras();
    }

    obtenerBeneficios() {
        return {
            bono: 0,
            descripcion: "No recibe bonos."
        };
    }
}