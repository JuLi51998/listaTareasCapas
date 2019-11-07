import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { Tarea } from '../models/tarea'


@Injectable({
  providedIn: 'root'
})
export class DataDbService { 
  private contactCollection: AngularFirestoreCollection<Tarea>;

  constructor(private angularfs: AngularFirestore) { 
    this.contactCollection = angularfs.collection<Tarea>('Tareas');
  }

  saveMessage(newTarea: Tarea): void {
    this.contactCollection.add(newTarea);
  }
}
