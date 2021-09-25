import { NgModule } from  '@angular/core';
 
import {MatToolbarModule} from  '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core'


//MatNativeDateModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule
@NgModule({
imports: [MatButtonModule,MatToolbarModule,MatIconModule, MatDatepickerModule, MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,MatNativeDateModule, MatTabsModule],
exports: [MatButtonModule,MatToolbarModule,MatIconModule, MatDatepickerModule, MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,MatNativeDateModule, MatTabsModule]
 
})
 
export  class  MaterialModule { }