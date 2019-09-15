import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderInfoComponent } from './work-order-info.component';

describe('InstallRecordDetailComponent', () => {
  let component: WorkOrderInfoComponent;
  let fixture: ComponentFixture<WorkOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
