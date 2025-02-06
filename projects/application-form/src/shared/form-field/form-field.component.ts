import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, distinctUntilChanged, ReplaySubject, startWith, takeUntil } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FullFormObject, ValidationType } from '../../models/interface/field_config';

@Component({
  selector: 'cxi-customized-form-field',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule,MatDatepickerModule, MatNativeDateModule,MatAutocompleteModule,MatIconModule,MatButtonModule,MatInputModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  _fieldConfig = signal<FullFormObject | null>(null);
  @Input()
  get fieldConfig(): FullFormObject | null{ 
    return this._fieldConfig();
  }
  set fieldConfig(value: FullFormObject) { 
    this._fieldConfig.set(value);
    if (value) { 
      this.updateValidation(value.validation);
    }
  }

  private _dropdownOptions = signal<any[]>([]);

  @Input()
  get dropdownOptions(): any[] {
    return this._dropdownOptions();
  }

  set dropdownOptions(options: any[]) {
    this._dropdownOptions.set(options);
    this.filteredDropdownOptions.set(options);
  }


  private _disabled = signal<boolean>(false);

  @Input()
  get disabled(): boolean {
    return this._disabled();
  }

  set disabled(value: boolean) {
    this._disabled.set(value);
    if (this._disabled()) {
      this.newControl.disable();
      this.newControl.setValue('');
    } else {
      this.newControl.enable();
    }
  }

  private _addressList = signal<string[]>([]);

  @Input() 
  get addressList(): string[] {
    return this._addressList();
  }
  set addressList(value: string[]) { 
    this._addressList.set(value);
  }

  private _formCtrl!: FormControl;
  @Input()
  get formCtrl(): FormControl | null | undefined {
    return this._formCtrl;
  }

  set formCtrl(ctrl: FormControl) {
    this._formCtrl = ctrl;
    this.newControl = ctrl;
  }


  @Output() addressLookup = new EventEmitter<string>();

  newControl = new FormControl<any>(null);
  addressLookUp = new FormControl(); //initiate a form control for auto address lookup field instead of using the formControl passed in from parent.
  filteredDropdownOptions = signal<any[]>([]);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor() { }

  ngOnInit() { 
    this.addressLookUp.valueChanges.pipe(startWith(''), debounceTime(800),
      distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((value) => { 
        this.addressLookup.emit(value);
      })
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() { 
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  @ViewChild('addressAutoComplete') addressInput!: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteInput') input!: ElementRef<HTMLInputElement>;
  
  filter() {
    const value = this.input.nativeElement.value;
    if (value) {
      this.filteredDropdownOptions.set(this.dropdownOptions.filter((option: any) => {
        return option.value.toLowerCase().includes(value.toLowerCase());
      }));
    }
  }

  setAddress(address: string) { 
    this.newControl.setValue(address);
  }

  updateValidation(validations:ValidationType[]) {
    const validators:any[] = [];

    validations.forEach((validation) => {
      switch (validation) {
        case ValidationType.required:
          validators.push(Validators.required);
          break;
        case ValidationType.email:
          validators.push(Validators.email);
          break;
        case ValidationType.abn:
          validators.push(Validators.pattern(/^[0-9]{11}$/));
          break;
        case ValidationType.tfn:
          validators.push(Validators.pattern(/^[0-9]{9}$/));
          break;
        case ValidationType.ausMobile:
          validators.push(Validators.pattern(/^04[0-9]{8}$/));
          break;
        case ValidationType.fax:
          validators.push(Validators.pattern(/^[0-9]{10}$/));
          break;
        default:
          break;
      }
    });

    // Apply all collected validators at once
    this.newControl.setValidators(validators);
    this.newControl.updateValueAndValidity();
  }
}
