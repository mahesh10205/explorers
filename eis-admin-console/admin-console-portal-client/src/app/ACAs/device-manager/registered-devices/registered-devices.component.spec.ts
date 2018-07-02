// import {
//   async,
//   ComponentFixture,
//   TestBed,
//   fakeAsync
// } from '@angular/core/testing';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import {
//   RegisteredDevicesComponent,
// } from './registered-devices.component';
// import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
// import { DebugElement } from '@angular/core';
// import { HttpModule } from '@angular/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DashboardMaterialModule } from '../../../dashboard-material-module';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { HttpLoaderFactory } from '../../../app.module';
// import { ConfirmationService } from 'primeng/api';
// import { IFrameService } from '../../../service/iframe.service';
// import { DeviceManagerService } from '../../../service/device-manager.service';
// import { NotificationService } from '../../../service/notification.service';
// import { PingService } from '../../../service/ping.service';
// import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import { DialogModule } from 'primeng/dialog';
// import {LogService, Level} from '../../../service/log.service';

// describe('RegisteredDevicesComponent', () => {
//   let component: RegisteredDevicesComponent;
//   let fixture: ComponentFixture<RegisteredDevicesComponent>;
//   let debugElement: DebugElement;
//   let element: HTMLElement;
//   let deviceManagerService: DeviceManagerService;
//   let dialog: MatDialog;

//   let selectedDevice: any;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [RegisteredDevicesComponent],
//       imports: [
//         HttpModule,
//         BrowserAnimationsModule,
//         DashboardMaterialModule,
//         HttpClientModule,
//         DialogModule,
//         TranslateModule.forRoot({
//           loader: {
//             provide: TranslateLoader,
//             useFactory: HttpLoaderFactory,
//             deps: [HttpClient]
//           }
//         })
//       ],
//       providers: [
//         ConfirmationService,
//         IFrameService,
//         NotificationService,
//         PingService,
//         LogService,
//         DeviceManagerService
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RegisteredDevicesComponent);
//     component = fixture.componentInstance;
//     debugElement = fixture.debugElement;
//     element = debugElement.nativeElement;
//     deviceManagerService = TestBed.get(DeviceManagerService);
//     dialog = TestBed.get(MatDialog);
//     selectedDevice = {
//       'imagingDeviceID': '80487ee7-c3c9-4238-8d28-a494a2f8cbc2',
//       'isOpen': true,
//       'metadata': [
//       {
//       'ngssf': ''
//       }
//       ],
//       'systemID': 'CT_SCANNER12',
//       'connectors': [
//       {
//       'capabilities': [
//       {
//       'capability': 'C-FIND',
//       'configuration': {
//       'port': '5467',
//       'ip': '3.78.6.8',
//       'aetitle': 'revo'
//       },
//       'id': '0b4bfb62-c633-481c-a296-5a94e1afd954'
//       },
//       {
//       'capability': 'C-MOVE',
//       'configuration': {
//       'port': '4563',
//       'ip': '4.76.5.54',
//       'aetitle': 'REVO'
//       },
//       'id': 'ab6ca618-2c23-4cd3-a386-5bdde5812264'
//       },
//       {
//       'capability': 'C-STORE',
//       'configuration': {
//       'port': '5676',
//       'ip': '1.23.3.4',
//       'aetitle': 'REVO_M'
//       },
//       'id': 'e43c2235-7a72-4437-8d63-9e748040d581'
//       }
//       ],
//       'id': '202f0d25-145d-4987-94ea-ca6a5f4dd399',
//       'type': 'DICOM'
//       }
//       ],
//       'belongsTo': {
//       'country': 'INDIA',
//       'siteID': '5464656',
//       'siteName': 'MANIPAL HOSPITALS',
//       'region': 'BANGALORE'
//       },
//       'productName': 'CT',
//       'manufacturer': 'GE HEALTHCARE'
//     };
//     component.devices.push(selectedDevice);
//     component.devices.push(selectedDevice);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should return if device selected', () => {
//     selectedDevice.isOpen = true;
//     component.selectedDevice = selectedDevice;
//     const result = component.isDeviceSelected(selectedDevice);
//     expect(result).toEqual(true);
//   });

//   it('should return if device not open', () => {
//     selectedDevice.isOpen = false;
//     component.selectedDevice = selectedDevice;
//     const result = component.isDeviceSelected(selectedDevice);
//     expect(result).toEqual(false);
//   });

//   it('capability should be false', () => {
//     const capability = {
//       isShow: true
//     };
//     component.showCapabilities(capability);
//     const isShowReturned = capability.isShow;
//     expect(isShowReturned).toEqual(false);
//   });

//   it('capability should be true', () => {
//     const capability = {
//       isShow: false
//     };
//     component.showCapabilities(capability);
//     const isShowReturned = capability.isShow;
//     expect(isShowReturned).toEqual(true);
//   });

//   it('device should be selected', () => {
//     selectedDevice.isOpen = false;
//     component.selectedDevice = selectedDevice;
//     component.devices.push(selectedDevice);
//     component.selectDevice(0);
//     expect(component.selectedDevice).toBeTruthy();
//   });

//   it('row should be selected', () => {
//     component.selectedDevice = selectedDevice;
//     component.devices.push(selectedDevice);
//     component.rowSelected(0);
//     const ip = component.ip;
//     expect(ip).toEqual('3.78.6.8');
//   });

//   it('should update data when clicked', () => {
//     fixture.detectChanges();

//     spyOn(deviceManagerService, 'getData').and.returnValue(
//       Observable.of(
//         [
//           {
//       'imagingDeviceID': '80487ee7-c3c9-4238-8d28-a494a2f8cbc2',
//       'isOpen': true,
//       'metadata': [
//       {
//       'ngssf': ''
//       }
//       ],
//       'systemID': 'CT_SCANNER12',
//       'connectors': [
//       {
//       'capabilities': [
//       {
//       'capability': 'C-FIND',
//       'configuration': {
//       'port': '5467',
//       'ip': '3.78.6.8',
//       'aetitle': 'revo'
//       },
//       'id': '0b4bfb62-c633-481c-a296-5a94e1afd954'
//       },
//       {
//       'capability': 'C-MOVE',
//       'configuration': {
//       'port': '4563',
//       'ip': '4.76.5.54',
//       'aetitle': 'REVO'
//       },
//       'id': 'ab6ca618-2c23-4cd3-a386-5bdde5812264'
//       },
//       {
//       'capability': 'C-STORE',
//       'configuration': {
//       'port': '5676',
//       'ip': '1.23.3.4',
//       'aetitle': 'REVO_M'
//       },
//       'id': 'e43c2235-7a72-4437-8d63-9e748040d581'
//       }
//       ],
//       'id': '202f0d25-145d-4987-94ea-ca6a5f4dd399',
//       'type': 'DICOM'
//       }
//       ],
//       'belongsTo': {
//       'country': 'INDIA',
//       'siteID': '5464656',
//       'siteName': 'MANIPAL HOSPITALS',
//       'region': 'BANGALORE'
//       },
//       'productName': 'CT',
//       'manufacturer': 'GE HEALTHCARE'
//     }
//         ]
//       )
//     );
//     spyOn(deviceManagerService, 'deleteDevice').and.callThrough();
//     component.ngOnInit();
//     component.rowSelected(0);
//     component.isDeviceSelected(selectedDevice);
//     component.deleteDevice(selectedDevice);
//     expect(deviceManagerService.getData).toHaveBeenCalled();
//   });

//   it('should open dialog', () => {
//     component.selectedDevice = selectedDevice;
//     component.devices.push(selectedDevice);
//     component.openDialog(0);
//   });

//   it('should close dialog', () => {
//     component.selectedDevice = selectedDevice;
//     component.devices.push(selectedDevice);
//     component.deleteDevice(0);
//     expect(component).toThrow();
//   });

// });
