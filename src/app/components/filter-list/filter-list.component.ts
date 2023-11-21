import {Component, Input} from '@angular/core';
import {FilterListItem} from "./interfaces/interfaces";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent {
  @Input() filters: FilterListItem[] = [];
}
