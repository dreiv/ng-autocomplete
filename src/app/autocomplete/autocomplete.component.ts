import {
  Component,
  ViewChild,
  ContentChild,
  TemplateRef,
  ContentChildren,
  QueryList
} from '@angular/core';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { OptionComponent } from './option/option.component';
import { switchMap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'appAutocomplete'
})
export class AutocompleteComponent {
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  @ContentChild(AutocompleteContentDirective)
  content: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  optionsClick(): Observable<any> {
    return this.options.changes.pipe(
      switchMap((options) => {
        const clicks$ = options.map((option: OptionComponent) => option.click$);
        return merge(...clicks$);
      })
    );
  }
}
