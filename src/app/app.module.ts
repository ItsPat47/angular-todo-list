import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostItemComponent } from "./post-item/post-item.component";
import { ItemService } from "./services/item.service";

import { HttpClientModule } from "@angular/common/http";

///NGRX
import { stateItemsReducer } from "./reducers/Items/items.reducer";
import { StoreModule } from "@ngrx/store";
@NgModule({
  declarations: [AppComponent, PostListComponent, PostItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      reduxStoreItem: stateItemsReducer
    })
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
