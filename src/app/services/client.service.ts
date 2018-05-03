import { Client } from './../models/Client';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class ClientService {
  client: Observable<Client>;
  clients: Observable<Client[]>;
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  
  constructor(private afs: AngularFirestore) { 
    // returns clients by id in ascending order
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients() : Observable<Client[]> {
    // get clients with id
    this.clients = this.clientsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.clients
  }

}
