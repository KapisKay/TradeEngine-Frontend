import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingLiveComponent } from './trading-live.component';

describe('TradingLiveComponent', () => {
  let component: TradingLiveComponent;
  let fixture: ComponentFixture<TradingLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
