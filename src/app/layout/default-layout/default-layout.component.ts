import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { navItems } from './_nav';
import { AuthService } from '../../authentication/auth.service'; // Import your AuthService

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    imports: [
        SidebarComponent,
        SidebarHeaderComponent,
        NgScrollbar,
        SidebarNavComponent,
        SidebarFooterComponent,
        SidebarToggleDirective,
        SidebarTogglerDirective,
        DefaultHeaderComponent,
        ShadowOnScrollDirective,
        ContainerComponent,
        RouterOutlet,
        DefaultFooterComponent
    ]
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  menus : any = [];
  userRole: any;

  constructor(private authService: AuthService) {
    this.filterNavItems();
  }

  // Employee Role Permission Page Show Hide
  filterNavItems() {
    this.userRole = sessionStorage.getItem("UserRole");
    this.menus = navItems;
    this.menus.forEach((element: { class: string, children?: any[] }) => {
      if (element.children) {
        element.children.forEach((child: { class: string, roles: any[], children?: any[] }) => {
          if(child.roles !== undefined){
            const isRolePresent = child.roles.includes(this.userRole);
            if (isRolePresent) {
              child.class = 'd-block'; // Also show child menus
            }
            else{
              child.class = 'd-none'; // Also hide child menus
            }
          }            
        });
      }
    });    
  }
  onScrollbarUpdate($event: any) {}
}
