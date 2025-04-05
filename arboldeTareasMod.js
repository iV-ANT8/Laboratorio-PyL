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

const valorComun = 10;

class Minima {
    calculo(duracion){
        return 0;
    }
    siguiente(){
        return new Media();
    }
}

class Media {
    calculo(duracion){
        return (duracion * valorComun) * 0.05;
    }
    siguiente(){
        return new Maxima();
    }
}

class Maxima {
    calculo(duracion){
        let valorExtra = duracion * valorComun;
        let diasExtra = duracion - 10;
        valorExtra = duracion > 10 ? valorExtra * 0.07 + (1000 * diasExtra) : valorExtra * 0.07;
        return valorExtra;
    }
    siguiente(){
        return new Minima();
    }
}

class Tarea {
    constructor(codigo, duracion, complejidad){
        this.codigo = codigo;
        this.duracion = duracion;
        this.complejidad = complejidad;

    }
    getDuracion(){
        return this.duracion;
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    changeComplejidad(){
        this.complejidad = this.complejidad.siguiente();
    }
    getCostoTotal(){
        return Math.floor(this.getDuracion() * valorComun + this.complejidad.calculo(this.getDuracion())) + this.getCosto();
    }
}

class TareaCompuesta {
    constructor(codigo, duracion, tareas=[], complejidad){
        this.codigo = codigo;
        this.duracion = duracion
        this.tareas = tareas;
        this.complejidad = complejidad;
    }
    getDuracion(){
        return this.tareas.reduce((acum,tarea) => acum + tarea.getDuracion(), this.duracion);
    }
    getCosto(){
        return this.getDuracion() <= 5 ? 100 : 200;
    }
    changeComplejidad(){
        this.complejidad = this.complejidad.siguiente();
    }
    getCostoTotal(){
        let costoEnTotal = this.getDuracion() * valorComun + this.complejidad.calculo(this.getDuracion());
        costoEnTotal += this.tareas.reduce((acum, tarea) => acum + tarea.getCostoTotal(), 0); // costo de las subtareas
        costoEnTotal *= this.tareas.length > 3 ? 1.04 : 1; // overhead
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

const t132 = new Tarea("1.3.2", 1, new Minima());
const t131 = new Tarea("1.3.1", 2, new Minima());
const t13 = new TareaCompuesta("1.3", 2, [t132, t131], new Media());
console.log("Duración total de la rama de la tarea " + t13.codigo + " = " + t13.getDuracion());
console.log("Costo total de la tarea " + t13.codigo + " = $" + t13.getCostoTotal());
console.log("-".repeat(80));
const t1221 = new Tarea("1.2.2.1", 3, new Media());
const t1222 = new Tarea("1.2.2.2", 6, new Maxima());
const t122 = new TareaCompuesta("1.2.2", 1, [t1221,t1222], new Minima());
console.log("Duración total de la rama de la tarea " + t122.codigo + " = " + t122.getDuracion());
console.log("Costo total de la rama de la tarea " + t122.codigo + " = $" + t122.getCostoTotal());
console.log("-".repeat(80));
const t121 = new Tarea("1.2.1", 4, new Media());
const t12 = new TareaCompuesta("1.2", 4, [t121,t122], new Media());
console.log("Duración total de la rama de la tarea " + t12.codigo + " = " + t12.getDuracion());
console.log("Costo total de la rama de la tarea " + t12.codigo + " = $" + t12.getCostoTotal());
console.log("-".repeat(80));
const t11 = new Tarea("1.1", 6, new Maxima());
const t1 = new TareaCompuesta("1", 2, [t11,t12,t13], new Maxima());
t1.changeComplejidad(); // cambia la complejidad de todo el proyecto a Minimo, resultado original esperado: $2382 (sin extras)
t1.changeComplejidad(); // cambia la complejidad de todo el proyecto a Media, resultado original esperado: $2397 (el extra es un $15,5 redondeado de la duracion de todo el árbol)
t1.changeComplejidad(); // volvemos a la complejidad máxima, resultado original esperado: $23403 (el extra es un $21,7 redondeado para abajo, al que se le suman los 21 días. $2382 + $21 + $21000 = $23403)
const proyecto = new Proyecto([t1]);
console.log("Duración total del proyecto (T1): "+ proyecto.getDuracion());
console.log("Costo total del proyecto (T1): $" + proyecto.getCostoTotal());
