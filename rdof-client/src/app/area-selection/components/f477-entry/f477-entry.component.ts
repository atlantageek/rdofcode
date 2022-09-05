import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Control } from 'leaflet';
import { CommService } from 'src/app/services/comm.service';


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
 
  //form = new FormGroup({dbNameControl:new FormControl('')})
  //dbNameControl=new FormControl('')
  form=null;

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

  matcher = new MyErrorStateMatcher();
  user: any;

  constructor(private _formBuilder: FormBuilder, private _commService:CommService) {
    this.form = this._formBuilder.group({
      'db_name':[''],
      
       'tech_used':[],
       'consumer':[true],
       'downstream':[''],
       'upstream':['']
     })
     this.loadData();
  }
  async loadData() {
    this.user=await this._commService.get_user_attributes()
    this.form.patchValue(this.user);
  }
  onSubmit() {
    console.log(this.form.value)
    this.user['db_name'] = this.form.value.db_name;
    this.user['tech_used']=this.form.value.tech_used;
    this.user['consumer']=this.form.value.consumer;
    this.user['upstream']=this.form.value.upstream;
    this.user['downstream']=this.form.value.downstream;
    this._commService.store_user_attributes(this.user);

  }
}