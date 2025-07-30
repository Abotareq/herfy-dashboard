import { Routes } from '@angular/router';
import { MainComponent } from './component/main-component/main-component';
import { Notfound } from './component/notfound/notfound';
import { User } from './component/user/user';
import { Login } from './component/login/login';
import { userGuardTsGuard } from './guards/user-guard.ts-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
     canActivate:[userGuardTsGuard],
    children: [{ path: 'user', component: User},
    ],
  },
  {path: 'login', component: Login},
  { path: '**', component: Notfound },
];
