import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterManagePanelComponent } from './filter-manage-panel.component';

describe('FilterManagePanelComponent', () => {
  let component: FilterManagePanelComponent;
  let fixture: ComponentFixture<FilterManagePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterManagePanelComponent]
    });
    fixture = TestBed.createComponent(FilterManagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
