// import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// import { ConfigureDeviceComponent } from "./configure-device.component";
// import { HttpModule } from "@angular/http";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { DashboardMaterialModule } from "../../../dashboard-material-module";
// import { HttpClientModule, HttpClient } from "@angular/common/http";
// import { DialogModule } from "primeng/dialog";
// import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
// import { HttpLoaderFactory } from "../../../app.module";
// import { ConfirmationService } from "primeng/api";
// import { IFrameService } from "../../../service/iframe.service";
// import { NotificationService } from "../../../service/notification.service";
// import { PingService } from "../../../service/ping.service";
// import { DeviceManagerService } from "../../../service/device-manager.service";
// import { FormsModule } from "@angular/forms";
// import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
// import { MatDialogRef, MatDialog } from "@angular/material";

// xdescribe("ConfigureDeviceComponent", () => {
//   let component: ConfigureDeviceComponent;
//   let fixture: ComponentFixture<ConfigureDeviceComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ConfigureDeviceComponent],
//       imports: [
//         HttpModule,
//         FormsModule,
//         BrowserDynamicTestingModule,
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
//         DeviceManagerService
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfigureDeviceComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   xit("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
