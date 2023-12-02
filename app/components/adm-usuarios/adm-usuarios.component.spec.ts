import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUsuariosComponent } from './adm-usuarios.component';

describe('AdmUsuariosComponent', () => {
  let component: AdmUsuariosComponent;
  let fixture: ComponentFixture<AdmUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmUsuariosComponent]
    });
    fixture = TestBed.createComponent(AdmUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
