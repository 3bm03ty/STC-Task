import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authRoutes } from './routes/auth-routes';
import { UnauthComponent } from './components/unauth/unauth.component';
import { IsLoggedInGuard } from 'src/app/guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: authRoutes.login, pathMatch: 'full' },
  { path: authRoutes.login, canActivate: [IsLoggedInGuard], component: LoginComponent },
  { path: authRoutes.unauth, component: UnauthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
