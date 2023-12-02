import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmJogosComponent } from './adm-jogos.component';

describe('AdmJogosComponent', () => {
  let component: AdmJogosComponent;
  let fixture: ComponentFixture<AdmJogosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmJogosComponent]
    });
    fixture = TestBed.createComponent(AdmJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
