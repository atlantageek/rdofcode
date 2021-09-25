import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AreaSelectionComponent} from './area-selection/area-selection.component'
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './helpers/authguard';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatavizComponent } from './dataviz/dataviz.component';

const routes: Routes = [

  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginFormComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegistrationFormComponent},
  { path: 'areaselection', component: AreaSelectionComponent, canActivate: [AuthGuard]  },
  { path: 'dataviz', component: DatavizComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: AreaSelectionComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
