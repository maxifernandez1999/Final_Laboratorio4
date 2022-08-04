import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAdminsComponent } from './tabla-admins.component';

describe('TablaAdminsComponent', () => {
  let component: TablaAdminsComponent;
  let fixture: ComponentFixture<TablaAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
