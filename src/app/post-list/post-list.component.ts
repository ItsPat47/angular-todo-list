import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { Item } from "../models/item.model";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  // mockList = [
  //   { label: "buy car", done: false },
  //   { label: "get milk", done: false },
  //   { label: "get cookie", done: false }
  // ];
  items: Item[];
  itemsSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemsSubscription = this.itemService.itemsSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
    this.itemService.emitItemsSubject();
    this.itemService.getItemsFromServer();
  }

  addItem(task: string): void {
    console.log(task);
    this.itemService.addItem(task);
  }

  deleteItem(item: Item) {
    console.log("delete", item);
    this.items = this.items.filter(h => h !== item);
    this.itemService.deleteItemsFromServer(item);
  }

  saveitemsToServer() {
    this.itemService.saveItemsToServer();
  }

  fetchItemsFromServer() {
    this.itemService.getItemsFromServer();
  }

  checkItemState() {
    console.log(this.items);
  }

  finishTask(item: Item) {}
}
