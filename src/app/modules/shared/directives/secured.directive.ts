import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[secured]',
})
export class SecuredDirective implements OnInit, OnChanges, OnDestroy {
  private hasView = false;
  @Input('secured') requiredPermissions: Array<string>;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.checkRole(this.appSecured);
    this.checkRole(this.requiredPermissions);
  }
  ngOnChanges() {
    // this.checkRole(this.requiredPermissions)
  }

  checkRole(requiredPermissions: string[]) {
    // console.log(this.requiredPermissions,'permission');
    let hasAllRoles = requiredPermissions.some((permission) =>
      this.authService.hasPermission(permission)
    );
    if (!requiredPermissions.length) hasAllRoles = true;

    if (hasAllRoles && !this.hasView) {
      // If the user has all the required roles and view is not created yet, render the element
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAllRoles && this.hasView) {
      // If the user doesn't have all the required roles and view is created, clear the view
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  ngOnDestroy(): void {
    this.viewContainer.clear();
    this.templateRef = null;
  }
}
