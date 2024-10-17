import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervasyonFormComponent } from './rezervasyonForm.component';

describe('RezervasyonFormComponent', () => {
  let component: RezervasyonFormComponent;
  let fixture: ComponentFixture<RezervasyonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervasyonFormComponent]
    });
    fixture = TestBed.createComponent(RezervasyonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
