import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { ErrorHandlingInterceptor } from './core/interceptors/error-handling.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import {
  MsalModule,
  MsalInterceptor,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from '@azure/msal-browser';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appInitializerFn = (configService: ConfigService) => {
  return () => {
    return configService.setConfig();
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MsalModule.forRoot(
      new PublicClientApplication({
        // MSAL Configuration
        auth: {
          clientId: '2769fbf9-b084-4a78-a7dc-99761e46af03',
          authority:
            'https://login.microsoftonline.com/1bf381f3-ed19-4473-97a5-5da0aeba5b6f',
          redirectUri: 'https://uat.softwaves.co',
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
        },
        system: {
          loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ['api://6406f022-b88d-43da-8e1f-2dc9f5579717/access_as_user'],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://api.myapplication.com/users/*', ['customscope.read']],
          ['https://uat.softwaves.co/', null],
        ]),
      }
    ),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgHttpLoaderModule.forRoot(),
    RouterModule,
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService],
    },
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
