import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-filter-entry',
  templateUrl: './filter-entry.component.html',
  styleUrls: ['./filter-entry.component.css']
})
export class FilterEntryComponent {
  minSalaryControl = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);
  maxSalaryControl = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);
  minPopulationControl = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);
  maxPopulationControl = new FormControl('', [
    Validators.pattern("^[0-9]*$")
  ]);

  matcher = new MyErrorStateMatcher();
}