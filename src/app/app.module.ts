import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ClassificatorTreeComponent} from './classificator-tree/classificator-tree.component';
import {ClassificatorService} from './service/classificator.service';
import {ClassificatorTreeNodeComponent} from './classificator-tree-node/classificator-tree-node.component';
import {EventService} from './service/event.service';
import {HttpClientModule} from '@angular/common/http';
import {ClassificatorTreeNodeDetailInfoComponent} from './classificator-tree-node-detail-info/classificator-tree-node-detail-info.component';
import {ClassificatorsComponent} from './classificators/classificators.component';
import {RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ElementSearchComponent } from './element-search/element-search.component';
import { ClassificatorPageComponent } from './classificator-page/classificator-page.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";
import {Http} from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    ClassificatorTreeComponent,
    ClassificatorTreeNodeComponent,
    ClassificatorTreeNodeDetailInfoComponent,
    ClassificatorsComponent,
    ElementSearchComponent,
    ClassificatorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    RouterModule.forRoot([
      {path: '', component: ClassificatorPageComponent},
      {path: 'classificator/:classificator', component: ClassificatorPageComponent},
      {path: 'classificator/:classificator/root/:rootCode/child/:childCode', component: ClassificatorPageComponent}
    ])
  ],
  providers: [ClassificatorService, EventService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
