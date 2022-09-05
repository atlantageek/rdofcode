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
import {  MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';


//MatNativeDateModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule
@NgModule({
imports: [MatCheckboxModule, MatButtonModule,MatToolbarModule,MatIconModule, MatDatepickerModule, MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,MatNativeDateModule, MatTabsModule,MatSelectModule,MatOptionModule],
exports: [MatMenuModule, MatCheckboxModule,MatButtonModule,MatToolbarModule,MatIconModule, MatDatepickerModule, MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,MatNativeDateModule, MatTabsModule, MatSelectModule,MatOptionModule]
 
})
 
export  class  MaterialModule { }