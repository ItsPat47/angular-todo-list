import { createAction, props } from "@ngrx/store";
import { Item } from "../../models/item.model";

export const itemListChanged = createAction("[ItemsComponent] ItemListChanged");

export const saveItemToStore = createAction(
  "[ItemsComponents] SaveItemsToStore",
  props<{ items: Item[] }>()
);
