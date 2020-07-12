import {
  Directive,
  OnInit,
  Input,
  ElementRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
  FlexibleConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { NgControl, AbstractControl } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete.component';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() appAutocomplete: AutocompleteComponent;
  private overlayRef: OverlayRef | null;
  private unsubscribe$: Subject<void>;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {
    this.unsubscribe$ = new Subject();
  }

  get control(): AbstractControl | null {
    return this.ngControl.control;
  }

  get origin(): HTMLElement {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    fromEvent(this.origin, 'focus')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.openDropdown();

        this.appAutocomplete
          .optionsClick()
          .pipe(takeUntil((this.overlayRef as any).detachments()))
          .subscribe((value: string) => {
            this.control?.setValue(value);
            this.close();
          });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  openDropdown(): void {
    if (this.overlay) {
      this.close();
    }

    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(
      this.appAutocomplete.rootTemplate,
      this.vcr
    );
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() =>
      this.close()
    );
  }

  private close(): void {
    this.overlayRef?.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition(): FlexibleConnectedPositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }
}

export function overlayClickOutside(
  overlayRef: OverlayRef,
  origin: HTMLElement
): Observable<MouseEvent> {
  return fromEvent<MouseEvent>(document, 'click').pipe(
    filter((event) => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== origin; // the input
      const notOverlay =
        !!overlayRef &&
        overlayRef.overlayElement.contains(clickTarget) === false; // the autocomplete

      return notOrigin && notOverlay;
    }),
    takeUntil(overlayRef.detachments())
  );
}
