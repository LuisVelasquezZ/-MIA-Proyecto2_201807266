import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavusuariosComponent } from './navusuarios.component';

describe('NavusuariosComponent', () => {
  let component: NavusuariosComponent;
  let fixture: ComponentFixture<NavusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
