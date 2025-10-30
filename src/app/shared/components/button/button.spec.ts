// src/app/shared/components/button/button.component.spec.ts

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  // ===== CREATION TESTS =====

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ===== INPUT TESTS =====

  it('should have default type "button"', () => {
    expect(component.type()).toBe('button');
    expect(buttonElement.nativeElement.type).toBe('button');
  });

  it('should accept type "submit"', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    expect(buttonElement.nativeElement.type).toBe('submit');
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    expect(buttonElement.nativeElement.classList.contains('btn--danger')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();
    expect(buttonElement.nativeElement.classList.contains('btn--large')).toBe(true);
  });

  it('should disable button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should apply loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(buttonElement.nativeElement.getAttribute('aria-busy')).toBe('true');
    expect(buttonElement.nativeElement.classList.contains('btn--loading')).toBe(true);
  });

  it('should apply full width class', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    expect(buttonElement.nativeElement.classList.contains('btn--full-width')).toBe(true);
  });

  it('should set aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Save changes');
    fixture.detectChanges();
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe('Save changes');
  });

  // ===== OUTPUT TESTS =====

  it('should emit btnClick when clicked', () => {
    const spy = jasmine.createSpy('btnClick');
    component.btnClick.subscribe(spy);

    buttonElement.nativeElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not emit btnClick when disabled', () => {
    const spy = jasmine.createSpy('btnClick');
    component.btnClick.subscribe(spy);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    buttonElement.nativeElement.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit btnClick when loading', () => {
    const spy = jasmine.createSpy('btnClick');
    component.btnClick.subscribe(spy);

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    buttonElement.nativeElement.click();

    expect(spy).not.toHaveBeenCalled();
  });

  // ===== CONTENT PROJECTION TESTS =====

  it('should project content', () => {
    const testContent = 'Click Me';
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.nativeElement.textContent = testContent;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(testContent);
  });

  // ===== ACCESSIBILITY TESTS =====

  it('should have proper focus styles', () => {
    buttonElement.nativeElement.focus();
    expect(document.activeElement).toBe(buttonElement.nativeElement);
  });
});
