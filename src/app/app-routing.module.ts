import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilterManagePanelComponent} from "./components/filter-manage-panel/filter-manage-panel.component";

const routes: Routes = [
  { path: '', component: FilterManagePanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
