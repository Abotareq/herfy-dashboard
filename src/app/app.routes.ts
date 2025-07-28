import { Routes } from '@angular/router';
import { MainComponent } from './component/main-component/main-component';

export const routes: Routes = [
  { path: '',component: MainComponent,children: []
  },
  { path: '**', }
];
