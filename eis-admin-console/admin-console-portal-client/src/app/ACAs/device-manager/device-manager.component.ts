import { ConfigureDeviceComponent } from './configure-device/configure-device.component';
import { Component, OnInit, Inject } from "@angular/core";
import { ACARegistry } from "../../interface/ACARegistry";
import { ACA } from "../../interface/ACA";
import { NotificationService } from "../../service/notification.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { PingService } from "../../service/ping.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DeviceManagerService } from "../../service/device-manager.service";
import { TranslateService } from "@ngx-translate/core";
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: ".app-devicemanager",
  templateUrl: "./device-manager.component.html",
  styleUrls: ["./device-manager.component.css"]
})
export class DeviceManagerComponent extends ACA implements OnInit {
  private label: String = "app.label.device.manager";
  public tab_label: String = "Registered Devices";
  public static id: String = "device.manager";
  refreshDevicesData;
  pingUrl;

  constructor(
    public notificationService: NotificationService,
    public dialog: MatDialog,
    public deviceManagerService: DeviceManagerService,
    logger: LogService
  ) {
    super(notificationService, logger);
 }

  public selectedDevice = {}
  

  defaultValues(){
    this.selectedDevice={
      imagingDeviceID: "",
      metadata: [
        {
          ngssf: ""
        }
      ],
      systemID: "",
      connectors: [
        {
          capabilities: [],
          id: "",
          type: ""
        }
      ],
      belongsTo: {
        country: "",
        siteID: "",
        siteName: "",
        region: ""
      },
      productName: "",
      manufacturer: ""
    };
  }
  
  addDevice() {
    this.defaultValues();
    this.deviceManagerService.isEdit = false;
    let dialogRef = this.dialog.open(ConfigureDeviceComponent, {
      width: "700px",
      height: "600px",
      data: { selectedDevice: this.selectedDevice, isAddDevice: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDevicesData = Math.random();
    });
  }

  getAppID(): String {
    return DeviceManagerComponent.id;
  }

  getLabel(): String {
    return this.label;
  }

  ngOnInit() {
    this.defaultValues();
    const urls: any = this.getURL();
    if (urls !== undefined) {
      this.pingUrl = urls.imagingdevice;
      this.deviceManagerService.imagingdeviceURL = urls.imagingdevice;
      this.deviceManagerService.pingURL = urls.ping;
    } else {
      console.error('Ping URLs are NOT configured');

    }
  }
}

ACARegistry.register(DeviceManagerComponent.id, DeviceManagerComponent);
