import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCorrectorComponent } from './text-corrector.component';

describe('TextCorrectorComponent', () => {
  let component: TextCorrectorComponent;
  let fixture: ComponentFixture<TextCorrectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextCorrectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextCorrectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
