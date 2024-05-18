import { Injectable, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { StorageService } from './core/storage/storage.service';
import { Observable } from 'rxjs';
import { AuthGuard } from './core/Guards/auth.guard';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(private storage: StorageService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storage.getToken() !== null) {
      this.router.navigate(['/main']);
      return false;
    } else {
      return true;
    }
  }
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'register/:token',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },

  {
    path: '404',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '401',
    loadChildren: () =>
      import('./modules/not-auth/not-auth.module').then((m) => m.NotAuthModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
