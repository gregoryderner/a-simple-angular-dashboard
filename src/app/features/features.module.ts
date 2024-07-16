import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      /* { path: 'clients', component: ClientsComponent },
      { path: 'users', component: UsersComponent }, */
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeaturesModule { }
