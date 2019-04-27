import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  form:FormGroup;
  constructor(private fb:FormBuilder,private fs:FirebaseService) {
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

  }

  
  onClickSubmit(){
    Swal.fire({
      title: '¿ Estas seguro ?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No, deseo hacer cambios',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        let x = new Date(`${this.form.get('birth_date').value} 00:00`); 
        this.form.get('birth_date').setValue(x.getTime());
        this.fs.createClient(this.form.value);
        this.form.reset();
      }
    });
   
  }

}
