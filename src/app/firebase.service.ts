import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client } from './models/client.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
// import Observable  from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  clientsCollection:AngularFirestoreCollection<Client>;
  clients:Observable<any[]>;
  clientDoc: AngularFirestoreDocument<Client>;
  constructor(public db: AngularFirestore) {
    
    this.clientsCollection = this.db.collection('clients');
    this.clients = this.clientsCollection
      .snapshotChanges()
      .pipe(
        map(changes =>{
          return changes.map(a => {
            const data = a.payload.doc.data() as Client;
            data.id = a.payload.doc.id;
            return data;
          })
        })
      )
     
  }

  getClients(){
    return this.clients;
  }

  getAClient(id:string){
    return this.clientsCollection.doc(id).ref.get()
  }

  createClient(client:Client){
    this.clientsCollection.add(client);
  }

  updateItem(client: Client){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
    this.clients = this.clientsCollection
      .snapshotChanges()
      .pipe(
        map(changes =>{
          return changes.map(a => {
            const data = a.payload.doc.data() as Client;
            data.id = a.payload.doc.id;
            return data;
          })
        })
      )
  }

  deleteClient(client:Client){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }


}
