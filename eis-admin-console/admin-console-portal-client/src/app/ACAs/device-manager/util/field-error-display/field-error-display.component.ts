import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent implements OnChanges {
  @Input() errorMsg: string;
  @Input() displayError: boolean;

  constructor() {
    console.log('errorMsg', this.errorMsg)
    console.log('displayError', this.displayError)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)

  }
}