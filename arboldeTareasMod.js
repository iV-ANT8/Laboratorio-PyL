/*
Agregar al ejercicio el costo y las complejidades que puede tener una tarea.
El costo en dinero de una tarea es igual al tiempo de la tarea multiplicado por un valor común y configurable para todas las complejidades. Además cada complejidad puede agregarle un porcentaje extra que se suma al costo.
- Complejidad mínima: no agrega porcentaje extra.
- Complejidad media: agrega un 5% extra
- Complejidad máxima:
  - Si el tiempo es menor o igual a 10 unidades entonces agrega un extra del 7%
  - Si el tiempo es mayor a 10 unidades entonces agrega un extra del 7% más $1000 por cada día que la tarea exceda las 10 unidades.
A su vez las tareas que tengan más de 3 subtareas directas asociadas tienen un costo extra del 4% por overhead.
*/

class Tarea {
    constructor(codigo, duracion, valor, complejidad, dia = 0){
        this.codigo = codigo;
        this.duracion = duracion;
        this.valor = valor;
        this.complejidad = complejidad.toLowerCase();
        this.costo = 0;
        this.dia = duracion >= 10 ? dia : 0;

    }
    getDuracion(){
        return this.duracion;
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    getCostoTotal(){
        let costoEnTotal = this.getDuracion() * this.valor;
        costoEnTotal *= this.complejidad === "media" ? 1.05 : this.complejidad === "maxima" ? 1.07 : 1;
        costoEnTotal = this.complejidad === "maxima" && this.getDuracion() > 10 ? costoEnTotal + 1000 * this.dia : costoEnTotal;
        this.costo = Math.floor(costoEnTotal);
        return this.costo + this.getCosto();
    }
}

class TareaCompuesta {
    constructor(codigo, duracion, tareas=[], valor, complejidad, dia = 0){
        this.codigo = codigo;
        this.duracion = duracion
        this.tareas = tareas;
        this.valor = valor;
        this.complejidad = complejidad.toLowerCase();
        this.dia = duracion >= 10 ? dia : 0;
    }
    getDuracion(){
        return this.tareas.reduce((acum,tarea) => acum + tarea.getDuracion(), this.duracion);
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    getCostoTotal(){
        let costoEnTotal = this.duracion * this.valor;
        costoEnTotal *= this.complejidad === "media" ? 1.05 : this.complejidad === "maxima" ? 1.07 : 1;
        costoEnTotal = this.complejidad === "maxima" && this.getDuracion() > 10 ? costoEnTotal + 1000 * this.dia : costoEnTotal;
        costoEnTotal += this.tareas.reduce((acum, tarea) => acum + tarea.getCostoTotal(), 0);
        costoEnTotal *= this.tareas.length > 3 ? 1.04 : 1;
        return Math.floor(costoEnTotal + this.getCosto());
    }
    /*
    getCostoTotal(){
        let costoEnTotal = this.duracion * this.valor;
        if (this.complejidad.toLowerCase() === "minima"){
            return costoEnTotal;
        } else if (this.complejidad.toLowerCase() === "media") {
            costoEnTotal *= 1.05;
        } else if (this.complejidad.toLowerCase() === "maxima") {
            if (this.getDuracion() <= 10) {
                costoEnTotal *= 1.07;
            } else {
                costoEnTotal = (costoEnTotal * 1.07) + (1000 * this.dia);
            }
        }
        costoEnTotal += this.tareas.reduce((acum, tarea) => acum + tarea.getCostoTotal(), this.costo);
        costoEnTotal *= this.tareas.length > 3 ? 1.04 : 1;
        return this.costo;
    }
    */
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

const t132 = new Tarea("1.3.2", 1, 5, "Minima");
const t131 = new Tarea("1.3.1", 2, 5, "minima");
const t13 = new TareaCompuesta("1.3", 2, [t132, t131], 5, "Media");
console.log("Duración total de la rama de la tarea " + t13.codigo + " = " + t13.getDuracion());
console.log("Costo total de la tarea " + t13.codigo + " = $" + t13.getCostoTotal());
console.log("-".repeat(80));
const t1221 = new Tarea("1.2.2.1", 3, 10, "media");
const t1222 = new Tarea("1.2.2.2", 6, 15, "Maxima");
const t122 = new TareaCompuesta("1.2.2", 1, [t1221,t1222], 5, "minima");
console.log("Duración total de la rama de la tarea " + t122.codigo + " = " + t122.getDuracion());
console.log("Costo total de la rama de la tarea " + t122.codigo + " = $" + t122.getCostoTotal());
console.log("-".repeat(80));
const t121 = new Tarea("1.2.1", 4, 10, "media");
const t12 = new TareaCompuesta("1.2", 4, [t121,t122], 10, "Media");
console.log("Duración total de la rama de la tarea " + t12.codigo + " = " + t12.getDuracion());
console.log("Costo total de la rama de la tarea " + t12.codigo + " = $" + t12.getCostoTotal());
console.log("-".repeat(80));
const t11 = new Tarea("1.1", 11, 20, "maxima", 2); // Test con duración > 10, + los dias
const t1 = new TareaCompuesta("1", 2, [t11,t12,t13], 5, "Maxima");
const proyecto = new Proyecto([t1]);
console.log("Duración total del proyecto (T1): "+ proyecto.getDuracion());
console.log("Costo total del proyecto (T1): $" + proyecto.getCostoTotal());