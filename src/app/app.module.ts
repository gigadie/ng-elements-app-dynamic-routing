import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteOneComponent } from './components/route-one/route-one.component';
import { RouteTwoComponent } from './components/route-two/route-two.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteOneComponent,
    RouteTwoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})
export class AppModule { 

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const appAsCustomElement = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('ng-elements-app-dynamic-routing', appAsCustomElement);
  }

}
