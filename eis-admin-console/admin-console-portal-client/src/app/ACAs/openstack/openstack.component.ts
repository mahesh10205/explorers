import { Component, OnInit } from '@angular/core';
import { ACARegistry } from '../../interface/ACARegistry';
import { ACA } from '../../interface/ACA';
import { NotificationService } from '../../service/notification.service';
import { AuthService } from '../../service/auth.service';
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: '.app-openstack',
  templateUrl: './openstack.component.html',
  styleUrls: ['./openstack.component.css']
})
export class OpenstackComponent extends ACA implements OnInit {
  private label: String = "app.label.openstack";
  public static id: String = "openstack";

  constructor(notificationService: NotificationService,private authService:AuthService, private logger: LogService) {
    super(notificationService,logger);
  }

  getAppID(): String {
    return OpenstackComponent.id;
  }

  getLabel(): String {
    return this.label;
  }

  ngOnInit() {
  }

  openTitaniumDashboard() {
    const urls: any = this.getURL();
    if (urls !== undefined) {
      let dashboardUrl = urls.dashboard+"?"+"jwt="+this.authService.acessToken();
      window.open(dashboardUrl)
      console.log('Dashboard Url: ' + dashboardUrl);
      this.logger.log(Level.INFO,"Dashboard Url: " + dashboardUrl);
    } else {
      console.error('Dashboard URLs are NOT configured');
      this.logger.log(Level.SEVERE,"Dashboard URLs are NOT configured");
    }
  }
}

ACARegistry.register(OpenstackComponent.id, OpenstackComponent);
