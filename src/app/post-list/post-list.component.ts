import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { Item } from "../models/item.model";
import { Subscription, Observable } from "rxjs";
import { NgForm } from "@angular/forms";

////Store
import { Store, select } from "@ngrx/store";
import { saveItemToStore } from "../reducers/Items/items.action";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  items: Item[];
  reduxArray$: Observable<any[]>;
  itemsSubscription: Subscription;
  isLoading: boolean = true;

  constructor(
    private itemService: ItemService,
    private store: Store,
    private reduxStoreItem: Store<{ reduxStoreItem: Array<Item[]> }>
  ) {
    this.reduxArray$ = reduxStoreItem.pipe(select("reduxStoreItem"));
  }

  ngOnInit() {
    this.itemService.getItemsFromServer();
    this.itemsSubscription = this.itemService.itemsSubject.subscribe(
      (responseItems: Item[]) => {
        this.items = responseItems;
        this.store.dispatch(saveItemToStore({ items: responseItems }));
        this.isLoading = false;
      }
    );
  }

  addItem(task: string) {
    if (task !== "") {
      this.itemService.addItem(task);
      this.store.dispatch(saveItemToStore({ items: this.items }));
    } else {
      return;
    }
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item);
    this.store.dispatch(saveItemToStore({ items: this.items }));
  }

  saveitemsToServer() {
    this.itemService.saveItemsToServer();
  }

  getItemsFromServer() {
    this.itemService.getItemsFromServer();
  }
}
