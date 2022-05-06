import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];

	tareaForm = new FormGroup({					// Creando FormGrop para formulario ng
		nuevoId : new FormControl('',Validators.required),
		nuevaTarea : new FormControl('',Validators.required),
		nuevaDuracion : new FormControl('',Validators.required),
		eliminarId: new FormControl('',Validators.required)
	})
	
	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	agregarNuevaTarea(form){					// agregando nueva tarea utilizando ng forms
		this.tareas.push(new Tarea(form.nuevoId, form.nuevaTarea, form.nuevaDuracion))
	}

	destacarTarea(a,b,c){						// destacando la tarea
		var num = a;
		var titulo = b;
		var minutos = c;
		this.eliminarTarea(num)
		this.tareas.push(new Tarea(num, 'Destacada: '+titulo, minutos))
		this.tareas.sort((x, y) =>{
			if(x.id > y.id){
				return 1;
			}else if(x.id < y.id){
				return -1;
			}else {
				return 0;
			}
		})
	}

	eliminarTarea(id){							// eliminar una tarea
		var num = id-1;
		if(id > this.tareas.length){
			id = this.tareas.length
		}
		if(num == 0){
			this.tareas.splice(0, 1)			// borrar el primero
		}else if(id == this.tareas.length ){
			this.tareas.splice(-1 , 1)			// borrar el ultimo
		}else {
			this.tareas.splice(num, 1)
		}
	}
	
	ordenarTareas(matriz){						//ordenando las tareas por minutos
		matriz.sort((a, b) =>{
			if(a.minutos > b.minutos){
				return 1;
			}else if(a.minutos < b.minutos){
				return -1;
			}else {
				return 0;
			}
		})
	}

}