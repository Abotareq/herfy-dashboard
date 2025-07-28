import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-component',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {}
