import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import {PluginsModule} from './plugins/plugins.module';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layouts/layout.component';
import {MenuNavComponent} from './plugins/component/menu-nav/menuNav.component';
import {HttpClientService} from "./shared/service/httpClient.service";
import {NoLoginErrorComponent} from "./plugins/component/error/noLogin-error/noLogin-error.component";
import {NotFoundErrorComponent} from "./plugins/component/error/notFound-error/notFound-error.component";
import {MenuResolverService} from "./shared/service/menu-resolver.service";
import {AuthGuardService} from "./shared/service/authGuard.service";
import {NoAuthErrorComponent} from "./plugins/component/error/noAuth-error/noAuth-error.component";
import {SystemErrorComponent} from "./plugins/component/error/system-error/system-error.component";
import {AppConfig} from "./app.config";

@NgModule({
  declarations:
  [
      AppComponent,
      LoginComponent,
      MenuNavComponent,
      LayoutComponent,
      NoLoginErrorComponent,
      NotFoundErrorComponent,
      NoAuthErrorComponent,
      SystemErrorComponent
  ],
  imports:
  [
      BrowserModule,
      CommonModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NgZorroAntdModule,
      PluginsModule
  ],
  providers: [
        HttpClientService,MenuResolverService,AuthGuardService,
        AppConfig,
        { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
        // {provide: LocationStrategy, useClass: HashLocationStrategy},
        // { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
