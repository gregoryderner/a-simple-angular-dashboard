import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule)
      },
      /* {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      }, */
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'clients'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
