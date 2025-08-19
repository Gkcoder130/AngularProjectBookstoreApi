import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../../item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  items: Item[] = [];
  formItem: Item = { title: '', author: '', price: 0, stock: 0 };
  searchTitle: string = '';
  searchAuthor: string = '';

  constructor(private itemService: ItemService) {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addBook() {
    if (this.formItem.title && this.formItem.author) {
      if (this.formItem.id !== undefined) {
        // Update existing book
        this.itemService.updateItem(this.formItem.id, this.formItem).subscribe(() => {
          this.loadItems();
          this.formItem = { title: '', author: '', price: 0, stock: 0 };
        });
      } else {
        // Add new book
        this.itemService.addItem(this.formItem).subscribe(() => {
          this.loadItems();
          this.formItem = { title: '', author: '', price: 0, stock: 0 };
        });
      }
    }
  }

  editItem(item: Item) {
    this.formItem = { ...item };
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }

  searchByTitle(): void {
    if (typeof this.searchTitle === 'string' && this.searchTitle.trim()) {
      this.itemService.searchItemsByTitle(this.searchTitle).subscribe((data: Item[]) => this.items = data);
    } else {
      this.loadItems();
    }
  }

  searchByAuthor() {
    if (this.searchAuthor.trim()) {
      this.itemService.searchItemsByAuthor(this.searchAuthor).subscribe(data => this.items = data);
    }
  }

  showAll() {
    this.loadItems();
  }
}
