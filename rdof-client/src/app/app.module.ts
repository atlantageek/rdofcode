import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AreaSelectionComponent } from './area-selection/area-selection.component';
import { DatavizComponent} from './dataviz/dataviz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from  './material.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CommService } from './services/comm.service';
import { AuthInterceptor} from './helpers/authinterceptor';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaListComponent } from './area-selection/components/area-list/area-list.component';
import { AreaSelectionService } from './area-selection/services/area-selection.service';
import { AgGridCheckboxComponent } from './area-selection/components/ag-grid-checkbox/ag-grid-checkbox.component'
import { AgGridJumpComponent } from './area-selection/components/ag-grid-jump/ag-grid-jump.component'
import { FilterEntryComponent } from './area-selection/components/filter-entry/filter-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaSelectionComponent,
    DatavizComponent,
    WelcomeComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    LogoutComponent,
    DashboardComponent,
    AreaListComponent,
    AgGridCheckboxComponent,
    AgGridJumpComponent,
    FilterEntryComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    LeafletDrawModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [HttpClient,CommService, AreaSelectionService, {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[AgGridCheckboxComponent,AgGridJumpComponent]
})
export class AppModule { }
