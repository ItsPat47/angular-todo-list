import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostItemComponent } from "./post-item/post-item.component";
import { ItemService } from "./services/item.service";

import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent, PostListComponent, PostItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
