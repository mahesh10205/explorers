import { Component, OnInit } from '@angular/core';
import { ACA } from '../../interface/ACA';
import { ACARegistry } from '../../interface/ACARegistry';
import { NotificationService } from '../../service/notification.service';
import { SecurityContext } from '@angular/core/src/security';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../service/auth.service';
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: '.app-prometheus',
  templateUrl: './prometheus.component.html',
  styleUrls: ['./prometheus.component.css']
})
export class PrometheusComponent extends ACA implements OnInit {
  private label: String = "app.label.prometheus";
  public static id: String = "prometheus";
  dashboardUrl;

  constructor(notificationService: NotificationService, private sanitizer: DomSanitizer,private authService:AuthService, logger:LogService) {
    super(notificationService,logger);
  }

  getAppID(): String {
    return PrometheusComponent.id;
  }

  getLabel(): String {
    return this.label;
  }

  ngOnInit() {
    const urls: any = this.getURL();
    if (urls !== undefined) {
      debugger
      this.dashboardUrl = urls.dashboard+"?"+"jwt="+this.authService.acessToken();
      debugger
    } else {
      console.error('Dashboard URLs are NOT configured');
    }
  }
}

ACARegistry.register(PrometheusComponent.id, PrometheusComponent);
