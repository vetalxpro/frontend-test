import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [ './checkbox.component.scss' ]
})
export class CheckboxComponent {
  @Output() change = new EventEmitter<any>();
  @Input() name: string;
  @Input() tabIndex: number;
  @Input() label: string;

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked( val: boolean ) {
    if ( val !== this._checked ) {
      this._checked = val;
      this.changeDetectorRef.markForCheck();
    }
  }

  private _checked = false;
  isDisabled = false;

  constructor( private changeDetectorRef: ChangeDetectorRef ) {
  }

  onBlur() {
  }

  onInputClick( event ) {
    event.stopPropagation();
  }

  onChangeEvent( event ) {
    event.stopPropagation();
    this.change.emit(this._checked);
  }

  // registerOnChange( fn: any ): void {
  //   this.onChange = fn;
  // }
  //
  // registerOnTouched( fn: any ): void {
  //   this.onTouched = fn;
  // }
  //
  // setDisabledState( isDisabled: boolean ) {
  //   this.isDisabled = isDisabled;
  // }
  //
  // writeValue( val: boolean ): void {
  //   this.checked = val;
  // }


}
