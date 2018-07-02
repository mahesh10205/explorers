import { Component, OnInit } from '@angular/core';
import { ACARegistry } from '../../interface/ACARegistry';
import { ACA } from '../../interface/ACA';
import { NotificationService } from '../../service/notification.service';
import { SecurityContext } from '@angular/core/src/security';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../service/auth.service';
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: '.app-grafana',
  templateUrl: './grafana.component.html',
  styleUrls: ['./grafana.component.css']
})
export class GrafanaComponent extends ACA implements OnInit {
  private label: String = "app.label.grafana";
  public static id: String = "grafana";
  dashboardUrl;

  constructor(notificationService: NotificationService, private sanitizer: DomSanitizer,private authService:AuthService, logger:LogService) {
    super(notificationService,logger);
  }

  getAppID(): String {
    return GrafanaComponent.id;
  }

  getLabel(): String {
    return this.label;
  }

  ngOnInit() {
    const urls: any = this.getURL();
    if (urls !== undefined) {
      this.dashboardUrl = urls.dashboard+"?"+"jwt="+this.authService.acessToken();
    } else {
      console.error('Dashboard URLs are NOT configured');
    }
  }
}

ACARegistry.register(GrafanaComponent.id, GrafanaComponent);
