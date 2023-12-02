import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJogoComponent } from './info-jogo.component';

describe('InfoJogoComponent', () => {
  let component: InfoJogoComponent;
  let fixture: ComponentFixture<InfoJogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoJogoComponent]
    });
    fixture = TestBed.createComponent(InfoJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
