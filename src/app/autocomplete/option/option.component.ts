import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit {
  @Input() value: string;
  click$: Observable<string>;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }
}
