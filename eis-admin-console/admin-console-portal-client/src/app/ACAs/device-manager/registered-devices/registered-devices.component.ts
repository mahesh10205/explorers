import { ConfigureDeviceComponent } from './../configure-device/configure-device.component';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DeviceManagerService } from '../../../service/device-manager.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LogService, Level } from '../../../service/log.service';
import { Http } from '@angular/http';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-registered-devices',
  templateUrl: './registered-devices.component.html',
  styleUrls: ['./registered-devices.component.css']
})
export class RegisteredDevicesComponent implements OnInit, OnChanges {
  @Input()
  refreshDevicesData;

  public closeDialog;
  public device_id: String = 'Device ID';
  public getData: any;
  public deviceId = 'Select Device Id : ';
  public deviceIdValue;

  public ip: any;
  public port: any;
  public headers = [
    'DeviceManager.SystemId',
    'DeviceManager.productName',
    'DeviceManager.manufacturer',
    'DeviceManager.siteID',
    'DeviceManager.siteName',
    'DeviceManager.country',
    'DeviceManager.region',
    'DeviceManager.status'
  ];

  public devices: any = [];
  public selectedDevice: any = {};
  public statuses: JSON = undefined;

  constructor(
    public deviceManagerService: DeviceManagerService,
    public dialog: MatDialog,
    private logger: LogService, private http: Http
  ) { }

  ngOnInit() {
    this.refreshDevices();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshDevicesData']) {
      this.refreshDevices();
    }
  }

  refreshDevices() {
    this.deviceManagerService.getData().subscribe(data => {
      this.devices = data;
      this.ping(this.devices);
      this.devices.forEach(arr => {
        arr.isOpen = false;
        arr.isEdit = false;
        arr.connectors.forEach(details => {
          details.isShow = false;
        });
      });
    });
  }

  getIp(device: any): any[] {
    let devicePingUrl = "/ping";
    let ips: any[] = new Array();

    let capabilities: any[] = device.connectors[0].capabilities;

    capabilities.forEach((capability, index) => {
      let ip: any = capability.configuration.ip;
      if (index == 0) {
        devicePingUrl += "ip=" + ip;
      } else {
        devicePingUrl += "&ip=" + ip;
      }
      ips.push(ip);

    });

    return ips;
  }

  getStatus(device: any) {
    let status = "";
    if (undefined != this.statuses) {
      ;
      let capabilities: any[] = device.connectors[0].capabilities;
      capabilities.forEach(capability => {
        let ip = capability.configuration.ip;
        status += ip + ": " + this.statuses[ip] + " ";
      });
    }

    return status;
  }

  private generatePingUrl(devices: any[]): string {
    let devicePingUrl = this.deviceManagerService.pingURL + "?";
    let firstCapability = true;
    devices.forEach(device => {
      let capabilities: any[] = device.connectors[0].capabilities;
      capabilities.forEach(capability => {
        let ip: any = capability.configuration.ip;
        if (firstCapability) {
          devicePingUrl += "ip=" + ip;
          firstCapability = false;
        } else {
          devicePingUrl += "&ip=" + ip;
        }
      });
    });
    return devicePingUrl;
  }

  /**
  * Updates the this.statuses data model.
  * @param devices
   */
  ping(devices: any[]) {
    let devicePingUrl = this.generatePingUrl(devices);

    this.http.get(devicePingUrl)
      .subscribe(
        res => {
          ;
          this.statuses = res.json();
          console.log("ping response:", res);
        });

  }

  rowSelected(index) {
    this.selectedDevice = this.devices[index];
    if (this.selectedDevice.isEdit) {
      this.selectedDevice.isEdit = !this.selectedDevice.isEdit;
      return;
    }
    this.deviceManagerService.updateDataForEdit(this.selectedDevice);
    this.deviceManagerService.data = this.selectedDevice;
    this.deviceIdValue = this.selectedDevice.imagingDeviceID;
    this.ip = this.selectedDevice.connectors[0].capabilities[0].configuration.ip;
    this.port = this.selectedDevice.connectors[0].capabilities[0].configuration.port;

    this.selectedDevice.isEdit = true;
  }

  // all about updating a device
  openDialog(id): void {
    this.deviceManagerService.isEdit = true;
    this.getData = id;

    const dialogRef = this.dialog.open(ConfigureDeviceComponent, {
      width: '700px',
      height: '600px',
      data: { selectedDevice: this.selectedDevice }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshDevices();
    });
  }

  updateData(data) {
    this.deviceManagerService.updateData(data).subscribe(result => {
      this.deviceManagerService.getData().subscribe(details => {
        this.selectedDevice.forEach(arr => {
          arr.isOpen = false;

          arr.connectors.capabilities.forEach(details => {
            details.isShow = false;
          });
        });
      });
    });
  }

  deleteDevice(id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
      data: { title: 'Are you sure you want to delete?' }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deviceManagerService.deleteDevice(id).subscribe(result => {
          this.refreshDevices();
          dialogRef.close();
        });
      }
    });
  }

  public selectDevice(index: number) {
    if (this.devices[index].isOpen) {
      this.devices[index].isOpen = false;
    } else {
      this.devices[index].isOpen = true;
    }
    this.devices.forEach((data, ind, array) => {
      if (ind !== index) {
        data.isOpen = false;
      }
    });
    let nextSelectedDevice = {};
    if (undefined !== index) {
      const device = this.devices[index];
      if (this.selectedDevice !== device) {
        nextSelectedDevice = device;
      }
    }
    this.selectedDevice = nextSelectedDevice;
  }

  public showCapabilities(capability) {
    if (capability.isShow) {
      capability.isShow = false;
    } else {
      capability.isShow = true;
    }
  }

  public isDeviceSelected(device: any): boolean {
    let selected = false;
    if (undefined !== device && Object.keys(this.selectedDevice).length > 0) {
      if (device === this.selectedDevice) {
        selected = true;
      }
    }
    if (!device.isOpen) {
      return false;
    }
    return selected;
  }
}