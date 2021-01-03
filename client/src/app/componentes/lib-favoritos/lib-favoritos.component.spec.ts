import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibFavoritosComponent } from './lib-favoritos.component';

describe('LibFavoritosComponent', () => {
  let component: LibFavoritosComponent;
  let fixture: ComponentFixture<LibFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibFavoritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
