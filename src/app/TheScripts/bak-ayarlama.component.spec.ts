import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakAyarlamaComponent } from './bak-ayarlama.component';

describe('BakAyarlamaComponent', () => {
  let component: BakAyarlamaComponent;
  let fixture: ComponentFixture<BakAyarlamaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BakAyarlamaComponent]
    });
    fixture = TestBed.createComponent(BakAyarlamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
