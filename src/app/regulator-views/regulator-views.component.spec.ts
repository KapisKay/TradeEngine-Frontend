import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorViewsComponent } from './regulator-views.component';

describe('RegulatorViewsComponent', () => {
  let component: RegulatorViewsComponent;
  let fixture: ComponentFixture<RegulatorViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulatorViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatorViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
