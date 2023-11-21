import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterManagePanelComponent } from './components/filter-manage-panel/filter-manage-panel.component';
import { CreateFilterComponent } from './components/create-filter/create-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './components/modal/modal.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FilterListComponent,
    FilterManagePanelComponent,
    CreateFilterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
