import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ClassificatorTreeComponent } from './classificator-tree/classificator-tree.component';
import {ClassificatorService} from './service/classificator.service';
import { ClassificatorTreeNodeComponent } from './classificator-tree-node/classificator-tree-node.component';
import {EventService} from './service/event.service';


@NgModule({
  declarations: [
    AppComponent,
    ClassificatorTreeComponent,
    ClassificatorTreeNodeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [ClassificatorService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
