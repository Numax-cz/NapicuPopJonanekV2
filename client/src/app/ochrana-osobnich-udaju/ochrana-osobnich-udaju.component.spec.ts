import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OchranaOsobnichUdajuComponent } from './ochrana-osobnich-udaju.component';

describe('OchranaOsobnichUdajuComponent', () => {
  let component: OchranaOsobnichUdajuComponent;
  let fixture: ComponentFixture<OchranaOsobnichUdajuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OchranaOsobnichUdajuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OchranaOsobnichUdajuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
