import { Routes } from '@angular/router';
import { MainComponent } from './component/main-component/main-component';
import { Notfound } from './component/notfound/notfound';
import { User } from './component/user/user';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'user', component: User }],
  },
  { path: '**', component: Notfound },
];
