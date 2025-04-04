class Tarea {
    constructor(codigo, duracion, complejidad){
        this.codigo = codigo;
        this.duracion = duracion;
        this.complejidad = complejidad.toLowerCase();
    }
    getDuracion(){
        return this.duracion;
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    getCostoTotal(){
        const costoEnTotal = this.complejidad === "minima" ? 100 * this.getDuracion() :
        this.complejidad === "media" ? (this.getDuracion() >= 5 ? 200 * this.getDuracion() : 150 * this.getDuracion()) :
        this.complejidad === "maxima" ? 300 * this.getDuracion() + 500 : 0;
        return Math.floor(costoEnTotal + this.getCosto());
    }
}

class TareaCompuesta {
    constructor(codigo, duracion, tareas=[], complejidad){
        this.codigo = codigo;
        this.duracion = duracion
        this.tareas = tareas;
        this.complejidad = complejidad.toLowerCase();
    }
    getDuracion(){
        return this.tareas.reduce((acum,tarea) => acum + tarea.getDuracion(), this.duracion);
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    getCostoTotal(){
        let costoEnTotal = this.complejidad === "minima" ? 100 * this.getDuracion() :
        this.complejidad === "media" ? (this.getDuracion() >= 5 ? 200 * this.getDuracion() : 150 * this.getDuracion()) :
        this.complejidad === "maxima" ? (300 * this.getDuracion()) + (500 * (this.tareas?.length || 0)) : 0;
        costoEnTotal += this.tareas.reduce((acum, tarea) => acum + tarea.getCostoTotal(), 0);
        return Math.floor(costoEnTotal + this.getCosto());
    }
}
class Proyecto {
    constructor(tareas=[]){
        this.tareas = tareas;
    }
    getDuracion(){
        return this.tareas?.reduce((acum, tarea) => acum + tarea.getDuracion(), 0) || 0;
    }
    getCostoTotal(){
        return this.tareas?.reduce((acum, tarea) => acum + tarea.getCostoTotal(), 0) || 0;
    }
    
}

const t132 = new Tarea("1.3.2", 1, "Minima");
const t131 = new Tarea("1.3.1", 2, "minima");
const t13 = new TareaCompuesta("1.3", 2, [t132, t131], "Media");
console.log("Duración total de la rama de la tarea " + t13.codigo + " = " + t13.getDuracion());
console.log("Costo total de la tarea " + t13.codigo + " = $" + t13.getCostoTotal());
console.log("-".repeat(80));
const t1221 = new Tarea("1.2.2.1", 3, "media");
const t1222 = new Tarea("1.2.2.2", 6, "Maxima");
const t122 = new TareaCompuesta("1.2.2", 1, [t1221,t1222], "minima");
console.log("Duración total de la rama de la tarea " + t122.codigo + " = " + t122.getDuracion());
console.log("Costo total de la rama de la tarea " + t122.codigo + " = $" + t122.getCostoTotal());
console.log("-".repeat(80));
const t121 = new Tarea("1.2.1", 4, "media");
const t12 = new TareaCompuesta("1.2", 4, [t121,t122], "Media");
console.log("Duración total de la rama de la tarea " + t12.codigo + " = " + t12.getDuracion());
console.log("Costo total de la rama de la tarea " + t12.codigo + " = $" + t12.getCostoTotal());
console.log("-".repeat(80));
const t11 = new Tarea("1.1", 6, "maxima");
const t1 = new TareaCompuesta("1", 2, [t11,t12,t13], "Maxima");
const proyecto = new Proyecto([t1]);
console.log("Duración total del proyecto (T1): "+ proyecto.getDuracion());
console.log("Costo total del proyecto (T1): $" + proyecto.getCostoTotal());