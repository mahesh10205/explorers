import { FormService } from './service/form.service';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {Http, XHRBackend, RequestOptions} from '@angular/http';

import { routes } from "./app.routes";
import { DashboardMaterialModule } from "./dashboard-material-module";

import { AppComponent } from "./app.component";
import { AdminConsoleComponent } from "./admin-console/admin-console.component";
import { K8sComponent } from "./ACAs/k8s/k8s.component";
import { GrafanaComponent } from "./ACAs/grafana/grafana.component";
import { KibanaComponent } from "./ACAs/kibana/kibana.component";
import { OpenstackComponent } from "./ACAs/openstack/openstack.component";
import { AuditLoggingComponent } from "./ACAs/audit-logging/audit-logging.component";
import { PrometheusComponent } from "./ACAs/prometheus/prometheus.component";
import { IFrameService } from "./service/iframe.service";
import { DeviceManagerService } from "./service/device-manager.service";
import { DataTableModule } from "primeng/datatable";
import { PanelModule } from "primeng/panel";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { NotificationService } from "./service/notification.service";
import { PingService } from "./service/ping.service";
import { SafePipe } from "./safe.pipe";
import { CanActivateViaAuthGuard } from "./CanActivateViaAuthGuard";
import { AcaComponentLoaderComponent } from "./aca-component-loader/aca-component-loader.component";
import { AuditMsgSettingsComponent } from "./ACAs/audit-logging/audit-msg-settings/audit-msg-settings.component";
import { EnterpriseRepositiryComponent } from "./ACAs/audit-logging/enterprise-repositiry/enterprise-repositiry.component";
import {
  DeviceManagerComponent,
} from "./ACAs/device-manager/device-manager.component";
import {
  RegisteredDevicesComponent,
} from "./ACAs/device-manager/registered-devices/registered-devices.component";
import { ConfigureDeviceComponent } from "./ACAs/device-manager/configure-device/configure-device.component";
import { MaterialTimeControlModule } from "./material-time-control/material-time-control.module";
import { AuditMsgDialog } from "./ACAs/audit-logging/dialog/audit-msg-dialog";
import { LogService } from "./service/log.service";
import { KibanaService } from "./service/kibana.service";
import { TokenInterceptor } from "./service/TokenInterceptor";
import { AuthService } from "./service/auth.service";
import { ConfirmDialogComponent } from './ACAs/device-manager/confirm-dialog/confirm-dialog.component';
import { FieldErrorDisplayComponent } from './ACAs/device-manager/util/field-error-display/field-error-display.component';
import { InterceptedHttp } from './service/intercepted-http.service';
import { TestModule } from './test.module';
import { AuditMsgService } from './ACAs/audit-logging/service/audit-msg.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    DashboardMaterialModule,
    ReactiveFormsModule,
    DataTableModule,
    PanelModule,
    DialogModule,
    TestModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: "ignore" }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialTimeControlModule,
    ConfirmDialogModule
  ],
  entryComponents: [
    AppComponent,
    ConfirmDialogComponent,
    ConfigureDeviceComponent,
    AdminConsoleComponent,
    K8sComponent,
    GrafanaComponent,
    KibanaComponent,
    OpenstackComponent,
    AuditLoggingComponent,
    PrometheusComponent,
    DeviceManagerComponent,
    AuditMsgDialog
  ],
  declarations: [
    AppComponent,
    AdminConsoleComponent,
    SafePipe,
    K8sComponent,
    GrafanaComponent,
    KibanaComponent,
    OpenstackComponent,
    AuditLoggingComponent,
    PrometheusComponent,
    AcaComponentLoaderComponent,
    AuditMsgSettingsComponent,
    EnterpriseRepositiryComponent,
    DeviceManagerComponent,
    RegisteredDevicesComponent,
    ConfigureDeviceComponent,
    AuditMsgDialog,
    ConfirmDialogComponent,
    FieldErrorDisplayComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ConfirmationService,
    AuditMsgService,
    IFrameService,
    CanActivateViaAuthGuard,
    NotificationService,
    PingService,
    DeviceManagerService,
    LogService,
    FormService,
    AuthService,
    KibanaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: Http,
      useFactory:
        (backend: XHRBackend, defaultOptions: RequestOptions, authService: AuthService) => {
        return new InterceptedHttp(backend, defaultOptions, authService);
      },
      deps: [XHRBackend, RequestOptions,AuthService]
  }
  ]
})
export class AppModule {}
