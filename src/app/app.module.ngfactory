import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {ClsfSearchComponent} from "./components/classificator-search/clsf-search.component";
import {ClsfTreeComponent} from "./components/classificator-tree/clsf-tree.component";
import {ClassificatorService} from "./service/classificator.service";
import {BackAPI} from "./service/back-api.service";
import {ClsfTreeViewComponent} from "./components/classificator-tree/clsf-tree-veiw.component";
import {ClsfTreeViewNodeComponent} from "./components/classificator-tree/clsf-tree-view-node.component";
import {MapIterable} from "./components/map-iterable.pipe";
import {EventService} from "./service/event.service";
import {PageNotFoundComponent} from "./not-found.component";
import {ClsfTabsComponent} from "./components/clsf-tabs.component";
import {ClsfTreeDetailedComponent} from "./components/classificator-tree/clsf-tree-detailed.component";
import {RouterModule, Routes} from "@angular/router";


const routes:Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full'},
  {
    path: 'search', component: ClsfTabsComponent,
    children: [
      {path: ':type', component: ClsfSearchComponent}
    ]
  },
  {
    path: 'tree', component: ClsfTabsComponent,
    children: [
      {path: ':type', component: ClsfTreeComponent, pathMatch: 'full'},
      {path: ':type/:code', component: ClsfTreeDetailedComponent, pathMatch: 'full'}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

// Imports for loading & configuring the in-memory web api

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    //InMemoryWebApiModule.forRoot(MockDatabaseService, {
    //  delay: 100,  rootPath: 'api/'
    //}),
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ClsfTabsComponent,
    ClsfSearchComponent,
    ClsfTreeComponent,
    ClsfTreeDetailedComponent,
    ClsfTreeViewComponent,
    ClsfTreeViewNodeComponent,
    MapIterable,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    BackAPI,
    ClassificatorService,
    EventService
  ]
})
export class AppModule {
}
