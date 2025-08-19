import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../../item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  @Input() item?: Item;
  @Output() saved = new EventEmitter<void>();

  formItem: Item = { title: '', author: '', price: 0, stock: 0 };

  ngOnChanges() {
    this.formItem = this.item ? { ...this.item } : { title: '', author: '', price: 0, stock: 0 };
  }

  constructor(private itemService: ItemService) {}

  save() {
    if (this.formItem.id) {
      this.itemService.updateItem(this.formItem.id, this.formItem).subscribe(() => this.saved.emit());
    } else {
      this.itemService.addItem(this.formItem).subscribe(() => this.saved.emit());
    }
    this.formItem = { title: '', author: '', price: 0, stock: 0 };
  }
}
