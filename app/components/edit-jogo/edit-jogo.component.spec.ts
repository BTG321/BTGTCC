import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJogoComponent } from './edit-jogo.component';

describe('EditJogoComponent', () => {
  let component: EditJogoComponent;
  let fixture: ComponentFixture<EditJogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJogoComponent]
    });
    fixture = TestBed.createComponent(EditJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
