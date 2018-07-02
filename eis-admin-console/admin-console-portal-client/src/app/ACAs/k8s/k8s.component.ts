import { Component, OnInit } from '@angular/core';
import { ACARegistry } from '../../interface/ACARegistry';
import { ACA } from '../../interface/ACA';
import { NotificationService } from '../../service/notification.service';
import { SecurityContext } from '@angular/core/src/security';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../service/auth.service';
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: '.app-k8s',
  templateUrl: './k8s.component.html',
  styleUrls: ['./k8s.component.css']
})
export class K8sComponent extends ACA implements OnInit {
  private label: String = "app.label.kubernetes";
  public static id: String = "k8s";
  dashboardUrl;
  constructor(notificationService: NotificationService, private sanitizer: DomSanitizer,private authService: AuthService, logger: LogService) {
    super(notificationService, logger);
  }

  getAppID(): String {
    return K8sComponent.id;
  }

  getLabel() {
    return this.label;
  }

  ngOnInit() {
    const urls: any = this.getURL();
    console.log('==> ' + JSON.stringify(urls));
    if (urls !== undefined) {
      this.dashboardUrl = urls.dashboard+"?"+"jwt="+this.authService.acessToken();
    } else {
      console.error('Dashboard URLs are NOT configured');
    }
  }
}

ACARegistry.register(K8sComponent.id, K8sComponent);
