import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ClassificatorTreeComponent} from './classificator-tree/classificator-tree.component';
import {ClassificatorService} from './service/classificator.service';
import {ClassificatorTreeNodeComponent} from './classificator-tree-node/classificator-tree-node.component';
import {EventService} from './service/event.service';
import {HttpClientModule} from '@angular/common/http';
import { ClassificatorTreeNodeDetailInfoComponent } from './classificator-tree-node-detail-info/classificator-tree-node-detail-info.component';
import { ClassificatorsComponent } from './classificators/classificators.component';


@NgModule({
  declarations: [
    AppComponent,
    ClassificatorTreeComponent,
    ClassificatorTreeNodeComponent,
    ClassificatorTreeNodeDetailInfoComponent,
    ClassificatorsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
  ],
  providers: [ClassificatorService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
