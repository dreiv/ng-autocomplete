import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionComponent } from './option/option.component';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { AutocompleteDirective } from './autocomplete.directive';

@NgModule({
  declarations: [
    OptionComponent,
    AutocompleteComponent,
    AutocompleteContentDirective,
    AutocompleteDirective
  ],
  imports: [CommonModule],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {}