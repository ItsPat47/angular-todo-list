import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { Item } from "../models/item.model";
import { Subscription, Observable } from "rxjs";
import { NgForm } from "@angular/forms";

////Store
import { Store, select } from "@ngrx/store";
import { increment, saveItemToStore } from "../reducers/Items/items.action";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  stateText$: Observable<number>;

  stateArray$: Observable<any[]>;
  // mockList = [
  //   { label: "buy car", done: false },
  //   { label: "get milk", done: false },
  //   { label: "get cookie", done: false }
  // ];
  items: Item[];
  itemsSubscription: Subscription;
  isLoading: boolean = false;

  constructor(
    private itemService: ItemService,
    private store: Store,
    private storeNum: Store<{ count: number }>,
    private testArray: Store<{ testArray: Array<any[]> }>
  ) {
    this.stateText$ = storeNum.pipe(select("count"));
    this.stateArray$ = testArray.pipe(select("testArray"));
  }

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
    console.log("task added", task);
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

  increment() {
    this.storeNum.dispatch(increment());
    this.store.dispatch(saveItemToStore({ items: this.items }));
  }

  finishTask(item: Item) {}
}
