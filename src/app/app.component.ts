import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ng-elements-app-dynamic-routing';

  @Input('state') 
  set state(state: string) {
    console.log('app1 received state', state);
  }

  @Output() message = new EventEmitter<any>();

  get configData(): any {
    return this.config.configData;
  }

  constructor(private router: Router, private config: ConfigService ) { }

  ngOnInit() {
  	this.router.navigateByUrl(`/${this.configData.appBaseRoute}/one`);
  	this.message.emit(`navigation to /${this.configData.appBaseRoute}/one`);
  }

}
