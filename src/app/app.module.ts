import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RandomNumberGeneratorComponent } from './random-number-generator/random-number-generator.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ BrowserAnimationsModule, BrowserModule, FormsModule, NgSelectModule, ToastrModule.forRoot() ],
  declarations: [ AppComponent, HelloComponent, RandomNumberGeneratorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
