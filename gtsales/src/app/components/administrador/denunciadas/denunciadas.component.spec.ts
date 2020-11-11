import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciadasComponent } from './denunciadas.component';

describe('DenunciadasComponent', () => {
  let component: DenunciadasComponent;
  let fixture: ComponentFixture<DenunciadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
