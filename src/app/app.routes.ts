import { Routes } from '@angular/router';
import { MainComponent } from './component/main-component/main-component';
import { Notfound } from './component/notfound/notfound';

export const routes: Routes = [
  { path: '',component: MainComponent,children: []
  },
  { path: '**',component:Notfound }
];
