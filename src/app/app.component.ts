import { Component } from '@angular/core';
import {Student} from "./student";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students : Student[] = [
    new Student("akmal", 10, "galle"),
    new Student("bkmal", 11, "matara"),
    new Student("ekmal", 12, "kataragama")
  ];
}
