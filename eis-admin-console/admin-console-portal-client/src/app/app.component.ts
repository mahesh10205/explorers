import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFrameService } from './service/iframe.service';
import {LogService, Level} from './service/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedInUser;

  constructor(private iframeService: IFrameService, private translate: TranslateService, private logger: LogService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use('en');
    const browserLang = translate.getBrowserLang();
    console.log("browserLang=" + browserLang);
    this.logger.log(Level.INFO,"browserLang= " + browserLang);
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

  ngOnInit() {
    this.loggedInUser = this.iframeService.userInfo ? this.iframeService.userInfo.user : '';

  }
}


