import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { Observable } from "rxjs";
import { Subject } from "rxjs/";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class ItemService {
  itemsSubject = new Subject<Item[]>();

  constructor(private httpClient: HttpClient) {}

  private items = [];

  emitItemsSubject() {
    this.itemsSubject.next(this.items.slice());
  }
  switchTaskDone(i: number) {
    this.items[i].done = !this.items[i].done;
  }

  addItem(task: string) {
    const itemObject = {
      task: "",
      done: false
    };
    itemObject.task = task;
    this.items.push(itemObject);
    this.emitItemsSubject();
  }

  saveItemsToServer() {
    this.httpClient
      .put("https://angular-todo-list-e9fb8.firebaseio.com/.json", this.items)
      .subscribe(
        () => {
          console.log("Items saved to the server");
        },
        error => {
          console.log("error when saving Items" + error);
        }
      );
  }
  getItemsFromServer() {
    this.httpClient
      .get<Item[]>("https://angular-todo-list-e9fb8.firebaseio.com/.json")
      .subscribe(
        response => {
          console.log(response);
          this.items = response;
          this.emitItemsSubject();
        },
        error => {
          console.log("error getItems" + error);
        }
      );
  }

  deleteItemsFromServer(item: Item) {
    console.log("item to remove from server", item);
    const itemIndexToRemove = this.items.findIndex(bookEl => {
      if (bookEl === item) {
        return true;
      }
    });
    this.items.splice(itemIndexToRemove, 1);
    this.saveItemsToServer();
    this.emitItemsSubject();
    console.log("removed from server");
  }
}
