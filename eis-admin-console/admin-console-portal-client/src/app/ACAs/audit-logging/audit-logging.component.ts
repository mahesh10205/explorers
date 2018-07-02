import { Component, OnInit } from '@angular/core';
import { ACARegistry } from '../../interface/ACARegistry';
import { ACA } from '../../interface/ACA';
import { NotificationService } from '../../service/notification.service';
import {LogService, Level} from '../../service/log.service';


@Component({
  selector: '.app-audit-logging',
  templateUrl: './audit-logging.component.html',
  styleUrls: ['./audit-logging.component.css']
})
export class AuditLoggingComponent extends ACA implements OnInit {
  private label:String = "app.label.AuditLoggingConfig";
  public static id:String = "audit.logging"; 
  
  constructor(notificationService: NotificationService, logger: LogService) {
    super(notificationService, logger);
  }
  
  getAppID() : String{
    return AuditLoggingComponent.id;
  }
  
  getLabel() : String{
    return this.label;
  }

  ngOnInit() {
  }


}
ACARegistry.register(AuditLoggingComponent.id, AuditLoggingComponent);

