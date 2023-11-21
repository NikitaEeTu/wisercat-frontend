import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CriteriaDto, FilterDto} from "../../services/filter/interfaces/filter";
import {FilterService} from "../../services/filter/filter.service";


interface CriteriaList {
  amount: CriteriaItem;
  title: CriteriaItem;
  date: CriteriaItem;
}

interface CriteriaItem {
  name: string;
  conditionNames: string[];
  type: string;
  value: number | string | Date;
}

interface CriteriaControl {
  name: string;
  value: number | string | Date;
}

interface ControlNames {
  criteriaName: string;
  criteriaCondition: string;
  criteriaConditionValue: string;
}

const CRITERIAS: CriteriaList =
  {
    amount: {
      name: 'Amount',
      conditionNames: ['More', 'Less'],
      type: 'number',
      value: 0
    },
    title: {
      name: 'Title',
      conditionNames: ['Starts with', 'Ends with'],
      type: 'text',
      value: 'Meow'
    },
    date: {
      name: 'Date',
      conditionNames: ['From', 'End'],
      type: 'date',
      value: new Date().toISOString().split('T')[0]
    }
  }

  const CONTROL_NAMES: ControlNames = {
    criteriaName: "criteriaName",
    criteriaCondition: "criteriaCondition",
    criteriaConditionValue: "criteriaConditionValue"
  }

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit{
  filterForm!: FormGroup;

  selectionInputs: string[] = ['Selection 1', 'Selection 2', 'Selection 3'];

  allCriterias: CriteriaItem[] = [];

  constructor(private fb: FormBuilder, private filterService: FilterService) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      name: [CRITERIAS.amount.name, [Validators.required, this.noWhitespaceValidator]],
      selection: ['Selection 1', [Validators.required]],
    });
    this.addARow();
  }

  noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  selectCriteria(event: any, index: number) {
    const selectedCriteriaName = event.target.value;
    const criteria = CRITERIAS[selectedCriteriaName as keyof typeof CRITERIAS];
    this.allCriterias[index] = criteria;
    console.log(this.allCriterias);
    this.addOrUpdateFormControl(index, criteria);
  }

  addARow() {
    this.allCriterias.push(CRITERIAS.amount);
    const newIndex = this.allCriterias.length - 1;
    this.addOrUpdateFormControl(newIndex, CRITERIAS.amount);
  }

  addOrUpdateFormControl(index: number, criteria: CriteriaItem) {
    const criteriaControls:CriteriaControl[] = [
      {name: CONTROL_NAMES.criteriaName + index, value: criteria.name},
      {name: CONTROL_NAMES.criteriaCondition + index, value: criteria.conditionNames[0]},
      {name: CONTROL_NAMES.criteriaConditionValue + index, value: criteria.value}
    ]

    criteriaControls.forEach(control => {
      if (!this.filterForm.contains(control.name)) {
        this.filterForm.addControl(control.name, this.fb.control(control.value, Validators.required));
      }
      else{
        this.filterForm.controls[control.name].setValue(control.value);
      }
    })
  }


  deleteCriteria(criteriaPos: number) {
    const minCriteriaNumber = 1;
    if(this.allCriterias.length > minCriteriaNumber) {
      console.log(criteriaPos)
        this.allCriterias = this.allCriterias.filter((elem, index) => index != criteriaPos);
        Object.values(CONTROL_NAMES).forEach(controlName => this.filterForm.removeControl(controlName + criteriaPos));
    }
    console.log(this.filterForm.value);
  }

  saveFilter(){
    const formValues = this.filterForm.value;
    const controlNames:string[] = Object.keys(formValues);
    const controlIndexes:number[] = controlNames.map(name => parseInt(name.split(CONTROL_NAMES.criteriaName)[1]));
    const filter: FilterDto = {
      name: formValues.name,
      selection: formValues.selection,
      criteriaList: this.mapCriteriaItemsToDto(controlIndexes, formValues)
    }

    this.filterService.saveFilter(filter).subscribe();
  }

  private mapCriteriaItemsToDto(controlIndexes: number[], formValues: any):CriteriaDto[] {
    return controlIndexes.map(
      index => {
        return {
          name: formValues[CONTROL_NAMES.criteriaName + index],
          condition: formValues[CONTROL_NAMES.criteriaCondition + index],
          value: formValues[CONTROL_NAMES.criteriaConditionValue + index]
        }
      }
    )
  }
}
