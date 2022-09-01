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
  selector: 'app-f477-entry',
  templateUrl: './f477-entry.component.html',
  styleUrls: ['./f477-entry.component.css']
})
export class F477EntryComponent {
  techs =[
    {value:'10',name:'Asymmetric xDSL'},
    {value:'11',name:'ADSL2,ADSL2+'},
    {value:'12',name:'VDSL'},
    {value:'20',name:'Symmetric xDSL*'},
    {value:'30',name:'Other Copper Wire'},
    {value:'40',name:'Cable Modem - not DOCSIS'},
    {value:'41',name:'Cable Modem - DOCSIS 1,1.1 or 2.0'},
    {value:'42',name:'DOCSIS 3.0'},
    {value:'43',name:'DOCSIS 3.1'},
    {value:'44',name:'DOCSIS 4.0'},
    {value:'50',name:'Optical Carrier/ Fiber to home'},
    {value:'60',name:'Satellite'},
    {value:'70',name:'Terrestrial Fixed Wireless'},
    {value:'90',name:'Electric Power Line'},
    {value:'0',name:'All Other'},
]
  dbNameControl = new FormControl('', [
  ]);
  defaultTechControl = new FormControl('',[])
  maximumAdvertisedDownstream = new FormControl('', [
  ]);
  matcher = new MyErrorStateMatcher();
}