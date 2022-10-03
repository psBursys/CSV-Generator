import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'random-number-generator',
  templateUrl: './random-number-generator.component.html',
})
export class RandomNumberGeneratorComponent implements OnInit {
  randoms: any = [];
  selections = ['Text', 'Number'];
  repetitions: any = 20;
  @Output() pattern: EventEmitter<any> = new EventEmitter();
  @Output() frequency: EventEmitter<any> = new EventEmitter();
  @Output() attachHeaders: EventEmitter<any> = new EventEmitter();
  includeHeader: boolean = false;

  isPatternCollapse: boolean = false;

  constructor(private toastr: ToastrService) {
    this.randoms.push({ field: 'SR' });
    this.randoms.push({ field: '1000' });
  }

  ngOnInit() {}

  addRow() {
    this.randoms.push({ field: '' });
  }

  removeRow(i) {
    this.randoms.splice(i, 1);
  }

  generateBarcodes() {
    if (this.randoms.some((x) => !x.field)) {
      this.toastr.error('Field cannot be empty', 'Warning!');
      return;
    } else if (!this.repetitions) {
      this.toastr.error('Enter Number of Repitions', 'Warning!');
      return;
    } else {
      this.randoms.forEach((x) => {
        let num = Number(x.field);
        if (!isNaN(num)) {
          if (!(num % 10 == 0)) {
            let abs = Math.floor(num);
            x.field = 10 ** abs.toString().length;
          }
        } else {
          x.field = x.field.toUpperCase();
        }
      });
      let pattern = this.randoms.map((x) => x.field).join('-');
      this.frequency.emit(Math.floor(Number(this.repetitions)));
      this.pattern.emit(pattern);
    }
  }

  onFrequencyChange(repetitions) {
    this.frequency.emit(Math.floor(Number(repetitions)));
  }

  onAttachHeadersChange(includeHeader) {
    this.attachHeaders.emit(includeHeader);
  }
}
