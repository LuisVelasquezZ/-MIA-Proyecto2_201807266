import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavadministradorComponent } from './navadministrador.component';

describe('NavadministradorComponent', () => {
  let component: NavadministradorComponent;
  let fixture: ComponentFixture<NavadministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavadministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
