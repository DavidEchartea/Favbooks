import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibPendientesComponent } from './lib-pendientes.component';

describe('LibPendientesComponent', () => {
  let component: LibPendientesComponent;
  let fixture: ComponentFixture<LibPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
