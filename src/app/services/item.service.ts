import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { Observable } from "rxjs";
import { Subject } from "rxjs/";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { saveItemToStore } from "../reducers/Items/items.action";
@Injectable({
  providedIn: "root"
})
export class ItemService {
  baseUrl: string = "https://angular-todo-list-e9fb8.firebaseio.com/.json";

  itemsSubject = new Subject<Item[]>();

  constructor(private httpClient: HttpClient, private store: Store) {}

  private items = [];

  emitItemsSubject() {
    this.itemsSubject.next(this.items.slice());
  }
  switchTaskDone(i: number) {
    this.items[i].done = !this.items[i].done;
  }

  addItem(task: string) {
    const itemObject: Item = {
      task: "",
      done: false
    };
    itemObject.task = task;
    this.items.push(itemObject);
    this.emitItemsSubject();
  }

  saveItemsToServer() {
    this.httpClient.put(this.baseUrl, this.items).subscribe(
      () => {
        console.log("Items saved to the server");
      },
      error => {
        console.log("error when saving Items" + error);
      }
    );
  }

  getItemsFromServer() {
    this.httpClient.get<Item[]>(this.baseUrl).subscribe(
      response => {
        console.log("data from server", response);
        this.items = response;
        this.emitItemsSubject();
        // this.store.dispatch(saveItemToStore({ items: response }));
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

    console.log("removed from server");
  }
}
