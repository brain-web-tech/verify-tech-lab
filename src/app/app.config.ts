import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
    ),
    importProvidersFrom(
      SidebarModule,
      DropdownModule, 
      CommonModule,
      ToastrModule.forRoot({
        timeOut: 15000, // 15 seconds
        closeButton: true,
        progressBar: true,
      }),
      RouterModule.forRoot(routes, { useHash: false })
    ),
    IconSetService,
    provideAnimations(),
    provideHttpClient(), 
    provideAnimationsAsync(),
    provideToastr(),
  ]
};
