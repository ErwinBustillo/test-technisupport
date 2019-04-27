import { Client } from './../models/client.model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private id:string;
  client:Client;
  form:FormGroup;
  constructor(private fb:FormBuilder,private fs:FirebaseService, private ac:ActivatedRoute,private dp:DatePipe,private location:Location) {
    this.ac.params.subscribe((params)=> this.id = params['id']);
    this.form = this.fb.group({
      name: fb.control('',Validators.required),
      last_name: fb.control('',Validators.required),
      doc_type: fb.control('',Validators.required),
      doc_number: fb.control(null,Validators.required),
      birth_date: fb.control('',Validators.required),
      observation: fb.control('')
    });

  }

  ngOnInit() {
    this.fs.getAClient(this.id)
    .then((doc)=> {
      if (doc.exists) {
        this.client = doc.data() as Client;
        this.form.get('name').setValue(this.client.name);
        this.form.get('last_name').setValue(this.client.last_name);
        this.form.get('doc_type').setValue(this.client.doc_type);
        this.form.get('doc_number').setValue(this.client.doc_number);
        
        this.form.get('birth_date').setValue(this.dp.transform(new Date(this.client.birth_date),'yyyy-MM-dd'));
        this.form.get('observation').setValue(this.client.observation);

      } else {
        
        Swal.fire('No existe el cliente','','error');
      }
    }).catch((error)=> {
      
      Swal.fire('Ha ocurrido un error','por favor intente mas tarde','error');
    });
    
  }

  onClickCancel(){
    this.location.back();
  }

  onClickEdit(){
    
    Swal.fire({
      title: '¿ Estas seguro de subir los cambios ?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        let x = new Date(`${this.form.get('birth_date').value} 00:00`); 
        this.form.get('birth_date').setValue(x.getTime());
        
        this.client = this.form.value;
        this.client.id = this.id;
        this.fs.updateItem(this.client);
        Swal.fire('El cliente ha sido actualizado correctamente','','success');
        this.form.reset();
        this.location.back();
      }
    });
  }

}
