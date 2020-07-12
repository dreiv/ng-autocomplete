import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionComponent } from './option/option.component';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { AutocompleteDirective } from './autocomplete.directive';

const publicApi = [
  AutocompleteComponent,
  AutocompleteDirective,
  AutocompleteContentDirective,
  OptionComponent
];

@NgModule({
  declarations: [publicApi],
  imports: [CommonModule],
  exports: [publicApi]
})
export class AutocompleteModule {}
