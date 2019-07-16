import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { ConfigService } from './services/config.service';

import { RouteOneComponent } from './components/route-one/route-one.component';
import { RouteTwoComponent } from './components/route-two/route-two.component';

const routes: Routes = [
	{ path: 'app3', redirectTo: '/app3/one', pathMatch: 'full'},
	{ path: 'app3/one', component: RouteOneComponent },
	{ path: 'app3/two', component: RouteTwoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  	ConfigService,
  	{
  		provide: APP_INITIALIZER,
  		useFactory: configFactory,
  		deps: [Injector, ConfigService],
  		multi: true
  	}
  ]
})
export class AppRoutingModule { 

	constructor(private config: ConfigService) { }

}

export function configFactory(injector: Injector, config: ConfigService): Function {

	return () => {
		console.log('Getting config in routing module');

		return config
            .loadConfig()
            .then(_ => {
            	// here is where we could also potentially filter out based on roles etc
            	var router: Router = injector.get(Router);
                router.resetConfig(routes.map(route => {
                	return Object.assign({}, route, { path: route.path.replace('app3', config.configData.appBaseRoute) });
                }));
            });
	};

}
