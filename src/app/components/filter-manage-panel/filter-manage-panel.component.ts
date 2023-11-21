import {Component, OnInit} from '@angular/core';
import {CriteriaDto, FilterDto} from "../../services/filter/interfaces/filter";
import {FilterService} from "../../services/filter/filter.service";
import {FilterListItem} from "../filter-list/interfaces/interfaces";

@Component({
  selector: 'app-filter-manage-panel',
  templateUrl: './filter-manage-panel.component.html',
  styleUrls: ['./filter-manage-panel.component.css']
})
export class FilterManagePanelComponent implements OnInit{
  filterList: FilterListItem[] = [];

  constructor(private filterService:FilterService) {
  }

  ngOnInit(): void {
    this.filterService.getAllFilters().subscribe(filterData => {
      this.filterList = this.mapFilterDtoToItem(filterData)
      console.log(this.filterList);
    })
  }

  private mapCriteriaDtoToCriteriaName(criteriaList: CriteriaDto[]){
    return criteriaList.filter(criteria => criteria.name != undefined).map(criteria => criteria.name).toString();
  }

  private mapFilterDtoToItem(filterList: FilterDto[]): FilterListItem[] {
    return filterList.map(filterData => {
      return {
        name: filterData.name,
        criteriaNames: this.mapCriteriaDtoToCriteriaName(filterData.criteriaList),
        selection: filterData.selection
      }
    })
  }

}
