import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterManagePanelComponent } from './components/filter-manage-panel/filter-manage-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterListComponent,
    FilterManagePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
