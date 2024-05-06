import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'ic-input',
  templateUrl: './ic-input.component.html',
  styleUrls: ['./ic-input.component.sass'],
})
export class IcInputComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() controlName = 'input';
  @Input() isArabicControl = false;
  @Input() headerName = '';
  @Input() patternMessage = '';
  @Input() optional = false;
  @Input() isTextArea = false;
  @Input() placeholder = '';
  @Input() maxLengthValue;
  @Input() minLengthValue;
  @Input() textAreaLength = 500;
  @Input() textAreaRowLength = 3;
  @Input() showCounter = true;
  @Input() numDirective = false;
  @Input() englishStyle = false;
  @Input() mask = '';
  @Input() inputType = 'text';
  @Input() valueExistDataInput = false;
  @Input() url;
  @Input() dataType;
  @Input() itemId;
  @Output() keyFun = new EventEmitter();
  @Output() focusoutF = new EventEmitter();
  @Output() barCodeScannerDetect = new EventEmitter();
  isRequired;
  minValue: any;
  maxValue: any;
  constructor() {}

  ngOnInit() {
    this.hasRequiredField(this.form.get(this.controlName));
  }

  valueChanged(text: String) {}
  keyUp(data) {
    this.keyFun.emit(data);
    this.minValue = this.form.get(this.controlName)?.errors?.['min']?.min;
    this.maxValue = this.form.get(this.controlName)?.errors?.['max']?.max;
  }
  focusout(data) {
    this.focusoutF.emit(data);
  }
  onDetected(event) {
    if (event.type === 'keyboard') {
    } else if (event.type == 'scanner') {
      this.barCodeScannerDetect.next(event.value);
    }
  }

  hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator['required']) {
        this.isRequired = true;
        return true;
      }
    }
    this.isRequired = false;
    return false;
  };
  get control() {
    return this.form?.get(this.controlName) as FormControl;
  }
}
