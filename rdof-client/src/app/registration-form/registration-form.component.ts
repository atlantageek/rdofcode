import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private commService:CommService) { }
  //Add field validation.
  ngOnInit(): void {
    this.registrationForm=new FormGroup({

      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });

  }

  register():void {
     
    this.commService.register(this.registrationForm.value).subscribe((result) => {
      console.log(result);
    })
  }
}
