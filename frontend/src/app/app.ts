import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemListComponent, FormsModule],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
