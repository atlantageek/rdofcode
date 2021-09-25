import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form:FormGroup
  login_invalid:boolean=true;
  constructor(private fb:FormBuilder, private authService:CommService, private router:Router) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
  });
   }

   getErrorMessage() {
    if (this.form.get('email').hasError('email')) return 'Not a valid email'
    if (this.form.get('email').hasError('server')) return 'Login Failed'
    return 'Failure'
  }
  ngOnInit(): void {
  }

  login():void {
    const val = this.form.value;
    try {
      if (val.email && val.password) {
        this.authService.login(val.email, val.password).subscribe(
              () => {
         
                console.log("User is logged in");
                this.router.navigateByUrl('/');
              },
              err => {
                this.form.get('email').setErrors({server:{message:'HUUUUUUUGE fail'}});
                let r = this.form.get('email').errors;
            
              }
        )
      }
    }
    catch (e) {
      alert(e);
    }
  }
}
