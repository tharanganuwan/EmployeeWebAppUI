import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordEditFormComponent } from './component/reset-password-edit-form/reset-password-edit-form.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'',component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'reset',component:ResetPasswordEditFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
