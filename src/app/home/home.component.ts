import { Client } from './../models/client.model';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  clients: Client[];
  
  subs:Subscription
  constructor(private fs:FirebaseService) {
    
  }

  ngOnInit() {

    this.subs=this.fs.getClients().subscribe((clients => {
      this.clients = clients;
    }));
  }

  ngOnDestroy(){
    this.subs.unsubscribe(); 
    this.clients = [];
  }


  onClickDelete(c:Client){
    Swal.fire({
      title: '¿ Estas seguro ?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.fs.deleteClient(c);
      }
    });
  }

}
