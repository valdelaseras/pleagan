import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from '@core/service';


@Directive({ selector: '[showOnAuth]' })
export class ShowOnAuthDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  @Input() set showOnAuth(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

}
