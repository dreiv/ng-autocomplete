import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    OverlayModule,
    BrowserAnimationsModule,
    AutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
