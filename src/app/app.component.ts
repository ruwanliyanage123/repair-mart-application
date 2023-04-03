import {Laptop} from "./laptop";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message : string = 'hello';
  constructor() {
    console.log('the constructor')
  }

  laptops : Laptop[] = [
    new Laptop("akmal", 23, true),
    new Laptop("kmal", 16, false),
    new Laptop("mal", 18, true),
    new Laptop("al", 25, false)
  ]
}
