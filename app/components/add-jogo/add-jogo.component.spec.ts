import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJogoComponent } from './add-jogo.component';

describe('AddJogoComponent', () => {
  let component: AddJogoComponent;
  let fixture: ComponentFixture<AddJogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJogoComponent]
    });
    fixture = TestBed.createComponent(AddJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
