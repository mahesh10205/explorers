// import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// import { DeviceManagerComponent } from "./device-manager.component";
// import { RegisteredDevicesComponent } from "./registered-devices/registered-devices.component";
// import { DashboardMaterialModule } from "../../dashboard-material-module";
// import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
// import { HttpLoaderFactory } from "../../app.module";
// import { HttpClient, HttpClientModule } from "@angular/common/http";
// import { NotificationService } from "../../service/notification.service";
// import { HttpModule } from "@angular/http";
// import { ConfirmationService } from "primeng/api";
// import { PingService } from "../../service/ping.service";
// import { IFrameService } from "../../service/iframe.service";
// import { DeviceManagerService } from "../../service/device-manager.service";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { DebugElement } from "@angular/core";
// import { By } from "@angular/platform-browser";
// import { MatDialog, MatDialogRef } from "@angular/material";
// import { Observable } from "rxjs/Observable";

// describe("DeviceManagerComponent", () => {
//   let component: DeviceManagerComponent;
//   let fixture: ComponentFixture<DeviceManagerComponent>;
//   let debugElement: DebugElement;
//   let element: HTMLElement;
//   let dialog: MatDialog;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DeviceManagerComponent, RegisteredDevicesComponent],
//       imports: [
//         HttpModule,
//         BrowserAnimationsModule,
//         DashboardMaterialModule,
//         HttpClientModule,
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
//         DeviceManagerService
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DeviceManagerComponent);
//     component = fixture.componentInstance;
//     debugElement = fixture.debugElement;
//     element = debugElement.nativeElement;
//     dialog = TestBed.get(MatDialog);
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should have Tab Label", () => {
//     expect(component.getLabel()).toContain("manager");
//   });

//   it("should have AppID", () => {
//     expect(component.getAppID()).toContain("manager");
//   });

//   it("should show add dialog on click of add icon", () => {
//     spyOn(dialog, "open").and.callThrough();

//     const editButton = debugElement.query(By.css("[id=addDevice]"));
//     editButton.triggerEventHandler("click", null);

//     expect(dialog.open).toHaveBeenCalled();
//   });
// });
