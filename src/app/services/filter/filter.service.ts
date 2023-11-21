import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterDto} from "./interfaces/filter";

const API_PATH = "api";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {}

  getAllFilters(): Observable<FilterDto[]> {
    return this.http.get<FilterDto[]>(API_PATH + "/filters");
  }

  saveFilter(filter: FilterDto): Observable<FilterDto> {
    return this.http.post<FilterDto>(API_PATH + "/filters", filter);
  }
}
