import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-main-component',
  imports: [Sidebar],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {

}
