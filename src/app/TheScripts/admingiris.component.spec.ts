import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminGirisComponent } from './admingiris.component';

describe('AdminGirisComponent', () => {
  let component: AdminGirisComponent;
  let fixture: ComponentFixture<AdminGirisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGirisComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGirisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default empty username and password', () => {
    expect(component.login.username).toBe('');
    expect(component.login.password).toBe('');
  });

  it('should navigate to the admin page on login', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onLoginPage4();
    expect(routerSpy).toHaveBeenCalledWith(['/admin']);
  });

  it('should call onLoginPage4 method when the form is submitted', () => {
    spyOn(component, 'onLoginPage4');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onLoginPage4).toHaveBeenCalled();
  });
});
