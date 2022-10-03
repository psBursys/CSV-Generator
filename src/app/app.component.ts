import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mockCsvData: string;
  pattern: any;
  frequency: any;
  attachHeaders: boolean = false;
  mockHeaders = `Serial Number,Po Number`;
  serialData = [];
  poNumber: string;

  generatePO(preFix?: string, length?: number) {
    preFix = preFix || 'PO';
    length = length || 5;
    this.poNumber = preFix + (Math.floor(Math.random() * 10 ** length) + 1);
  }

  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  formatToCsvData() {
    let itemsFormatted = [];
    this.serialData.forEach((item) => {
      itemsFormatted.push({
        name: item.serialNumber.replace(/,/g, ''), // remove commas
        type: item.poNumber,
      });
    });
    const jsonObject = JSON.stringify(itemsFormatted);
    const csv = this.convertToCSV(jsonObject);
    return csv;
  }

  fileTitle = 'serialNo-' + new Date().getTime();

  downloadCSV() {
    if (this.attachHeaders) {
      this.mockCsvData = this.mockHeaders + '\n' + this.formatToCsvData();
    } else {
      this.mockCsvData = this.formatToCsvData();
    }
    const exportedFilenmae = this.fileTitle + '.csv';
    const blob = new Blob([this.mockCsvData], {
      type: 'text/csv;charset=utf-8;',
    });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  onPatternChange(event) {
    this.pattern = event;
    console.log('pattern', this.pattern);
    this.generatePO();
    this.randomSerialNumberGenerator();
  }

  onFrequencyChange(event) {
    this.frequency = event;
  }

  onAttachHeaders(event) {
    this.attachHeaders = event;
    console.log('this.attachHeaders', this.attachHeaders);
  }

  randomSerialNumberGenerator() {
    this.serialData = [];
    console.log('this.frequency', this.frequency);
    for (let i = 0; i < Number(this.frequency); i++) {
      console.log('Iteraion = ', i);
      let sr: string;
      do {
        sr = this.generateSrNo(this.pattern);
        console.log('SR Generated = ', sr);
      } while (
        this.serialData.findIndex((x: any) => x.serialNumber === sr) != -1
      );
      let obj = { serialNumber: sr, poNumber: this.poNumber };
      this.serialData.push(obj);
    }
    console.log('this.serialData', this.serialData);
  }

  generateSrNo(pattern) {
    let patArr = pattern.split('-') || [];
    let sr = [];
    patArr.forEach((p) => {
      if (!isNaN(Number(p))) {
        sr.push(this.randomInt(Number(p)));
      } else {
        sr.push(p);
      }
    });
    return sr.join('-');
  }

  randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
