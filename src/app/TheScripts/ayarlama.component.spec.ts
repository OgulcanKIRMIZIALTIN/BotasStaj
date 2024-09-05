import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyarlamaComponent } from './ayarlama.component';

describe('AyarlamaComponent', () => {
  let component: AyarlamaComponent;
  let fixture: ComponentFixture<AyarlamaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyarlamaComponent]
    });
    fixture = TestBed.createComponent(AyarlamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
