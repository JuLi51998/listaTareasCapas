import { Component } from '@angular/core';
import { DataDbService } from './services/data-db.service'
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: String = 'Listado de Tareas';
  uploadPorcent: Observable<any>; 
  urlImage: Observable<String>;

  constructor(private dbData: DataDbService, private storage: AngularFireStorage) {}

  employees = [
    {'name': 'Julian', position: 'Developer', description: 'la descripcion de la tarea', imagen: ""},
    {'name': 'David', position: 'Cloud', description: 'la descripcion de la tarea', imagen: ""},
    {'name': 'Miguel', position: 'Database', description: 'la descripcion de la tarea', imagen: ""}
  ];

  model: any = {};
  model2: any = {};
  myValue:any;
  editar: boolean = false;
  msg: String = "";
  answer: any;

  addEmployee(): void {
    //this.dbData.saveMessage(this.model);
    this.employees.push(this.model);
    this.msg = "Se guardo la tarea";
    console.log(this.model);
    this.model = {};
  }

  editEmployee(i): void {
    this.model2.name = this.employees[i].name;
    this.model2.position = this.employees[i].position;
    this.model2.description = this.employees[i].description;
    this.myValue = i;
    this.editar = true;
  }

  updateEmployee(): void {
    console.log(this.model2);
    let i = this.myValue;
    for(let j = 0; j <= this.employees.length; j++) {
      if (i == j) {
        this.employees[i] = this.model2;
        this.model2 = {};
        this.msg = "Se actualizo correctamente"
        this.editar = false;
      }
    }
  }

  deleteEmployee(i): void {
    this.answer = confirm('Estas seguro querer eliminarlo?');
    if(this.answer) {
      this.employees.splice(i, 1);
      this.msg = "Tarea borrada con exito";
    }
  }

  onUpload(e) {
    console.log('subit', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/homework_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPorcent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=>
      this.urlImage = ref.getDownloadURL()
    )).subscribe();
    
    this.model.imagen = this.urlImage;
  }

}
