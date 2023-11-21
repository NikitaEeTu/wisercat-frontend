export interface FilterDto {
  id?: number;
  name: string;
  selection: string;
  criteriaList: CriteriaDto[]
}

export interface CriteriaDto {
  id?: number;
  name: string;
  condition: string;
  value: string;
}
