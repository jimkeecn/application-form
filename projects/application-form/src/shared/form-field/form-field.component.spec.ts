import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { FieldType } from '../../models/interface/field_config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Text Field: Check if all set', () => { 
    const fieldConfig = {
      fieldType: FieldType.text,
      isEnabled: true,
      label: 'text field label',
      helper: 'text field helper',
      placeholder: 'text field placeholder',
      validation: []
    };
    component._fieldConfig.set(fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-text"]');
    //Check if the correct mat-form-field is present
    expect(textField).toBeTruthy();
    expect(textField.textContent.includes(fieldConfig.label)).toBeTrue(); 
    expect(textField.textContent.includes(fieldConfig.helper)).toBeTrue(); 
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toEqual(fieldConfig.placeholder);
  });


  it('Address Field: Check if all set', () => { 
    const fieldConfig = {
      fieldType: FieldType.address,
      isEnabled: true,
      label: 'address field label',
      helper: 'address field helper',
      placeholder: 'address field placeholder',
      validation: []
    };
    fixture.componentRef.setInput('fieldConfig', fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-address"]');
    //Check if the correct mat-form-field is present
    expect(textField).toBeTruthy();
    expect(textField.textContent.includes(fieldConfig.label)).toBeTrue(); 
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toEqual(fieldConfig.placeholder);
  });

  it('Dropdown Field: Check if all set', () => { 
    const fieldConfig = {
      fieldType: FieldType.dropdown,
      isEnabled: true,
      label: 'dropdown field label',
      helper: 'dropdown field helper',
      placeholder: 'dropdown field placeholder',
      validation: []
    };
    fixture.componentRef.setInput('fieldConfig', fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-dropdown"]');
    //Check if the correct mat-form-field is present
    expect(textField).toBeTruthy();
    expect(textField.textContent.includes(fieldConfig.label)).toBeTrue(); 
    expect(textField.textContent.includes(fieldConfig.helper)).toBeTrue(); 
    expect(textField.textContent.includes(fieldConfig.placeholder)).toBeTrue(); 
  });

  it('Datepicker Field: Check if all set', () => { 
    const fieldConfig = {
      fieldType: FieldType.datePicker,
      isEnabled: true,
      label: 'datepicker field label',
      helper: 'datepicker field helper',
      placeholder: 'datepicker field placeholder',
      validation: []
    };
    fixture.componentRef.setInput('fieldConfig', fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-datepicker"]');
    console.log(textField);
    //Check if the correct mat-form-field is present
    expect(textField).toBeTruthy();
    expect(textField.textContent.includes(fieldConfig.label)).toBeTrue(); 
    expect(textField.textContent.includes(fieldConfig.helper)).toBeTrue(); 
    //Date picker has no placeholder.
  });

  it('Auto-Complete Field: Check if all set', () => { 
    const fieldConfig = {
      fieldType: FieldType.autoComplete,
      isEnabled: true,
      label: 'autoComplete field label',
      helper: 'autoComplete field helper',
      placeholder: 'autoComplete field placeholder',
      validation: []
    };
    fixture.componentRef.setInput('fieldConfig', fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-auto-complete"]');
    console.log(textField);
    //Check if the correct mat-form-field is present
    expect(textField).toBeTruthy();
    expect(textField.textContent.includes(fieldConfig.label)).toBeTrue(); 
    expect(textField.textContent.includes(fieldConfig.helper)).toBeTrue(); 
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toEqual(fieldConfig.placeholder);
  });

  it('Multiple-Select Field: Not Supported Message', () => { 
    const fieldConfig = {
      fieldType: FieldType.multipleSelect,
      isEnabled: true,
      label: 'multiSelect field label',
      helper: 'multiSelect field helper',
      placeholder: 'multiSelect field placeholder',
      validation: []
    };
    fixture.componentRef.setInput('fieldConfig', fieldConfig);
    fixture.detectChanges();
    const textField = fixture.nativeElement.querySelector('*[aria-label="cxi-multi-select"]');
    expect(textField.textContent.includes('Sorry We currently does not support this field type')).toBeTrue();
  });
});
