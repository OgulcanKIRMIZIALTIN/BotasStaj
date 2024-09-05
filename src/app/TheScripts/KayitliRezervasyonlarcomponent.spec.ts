import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KayitliRezervasyonlarComponent } from './KayitliRezervasyonlar.component';

describe('KayitliRezervasyonlarComponent', () => {
  let component: KayitliRezervasyonlarComponent;
  let fixture: ComponentFixture<KayitliRezervasyonlarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KayitliRezervasyonlarComponent]
    });
    fixture = TestBed.createComponent(KayitliRezervasyonlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
