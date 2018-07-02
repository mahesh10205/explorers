import { Component, OnInit } from '@angular/core';
import { ACARegistry } from '../../interface/ACARegistry';
import { Http, Response, Headers, ResponseContentType } from "@angular/http";
import { ACA } from '../../interface/ACA';
import { NotificationService } from '../../service/notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { DomSanitizer } from '@angular/platform-browser';
import { KibanaService } from '../../service/kibana.service';
import { AuthService } from '../../service/auth.service';
import {LogService, Level} from '../../service/log.service';

@Component({
  selector: '.app-kibana',
  templateUrl: './kibana.component.html',
  styleUrls: ['./kibana.component.css'],
})
export class KibanaComponent extends ACA implements OnInit {
  private label: String = "app.label.kibana";
  public static id: String = "kibana";
  fromdate = new FormControl(new Date());
  todate = new FormControl(new Date());
  showDates = false;
  private fromTime = { hour: 0, minute: 0, meriden: 'PM', format: 24 };
  private toTime = { hour: 0, minute: 0, meriden: 'PM', format: 24 };
  isZip = false;
  currentTimeZone;
  dashboardUrl;
  timezoneUrl = '';
  logExportUrl = '';

  constructor(notificationService: NotificationService,
    private kibanaService: KibanaService,
    private sanitizer: DomSanitizer,
    private http: Http, private authService: AuthService,
    private logger: LogService) {
    super(notificationService, logger);
  }

  getAppID(): String {
    return KibanaComponent.id;
  }

  getLabel(): String {
    return this.label;
  }

  ngOnInit() {
    const urls: any = this.getURL();
    if (urls !== undefined) {

      this.dashboardUrl = urls.dashboard+"?"+"jwt="+this.authService.acessToken();
      console.log('Dashboard Url: ' + this.dashboardUrl);
      this.logger.log(Level.INFO,"Dashboard Url: " + this.dashboardUrl);
      this.logExportUrl = urls.logexport;
      this.timezoneUrl = urls.timezone;
      this.kibanaService.getTimezone(this.timezoneUrl).subscribe((res) => {
        console.log(res);
        this.logger.log(Level.INFO,res);
        this.currentTimeZone = res;
      });
    } else {
      console.error('Dashboard URLs are NOT configured');
    }
  }
  submit(): void {
    this.saveFile();
  }
  saveFile() {
    console.log("downloading")
    let headersObj: Headers = new Headers();
    headersObj.append('Content-Type', 'application/json');
    headersObj.append('Accept', 'application/octet-stream');
    let _fromDate: Date = this.fromdate.value;
    _fromDate.setHours(this.fromTime.hour);
    _fromDate.setMinutes(this.fromTime.minute);
    _fromDate.setSeconds(0);
    let _toDate: Date = this.todate.value;
    _toDate.setHours(this.toTime.hour);
    _toDate.setMinutes(this.toTime.minute);
    _toDate.setSeconds(0);
    const data = {
      startDate: _fromDate,
      endDate: _toDate,
      format: this.isZip ? 'zip' : 'json'
    };
    console.log(data)
    this.kibanaService.getLogExportFile(this.logExportUrl, {
      fromDate: _fromDate,
      toDate: _toDate,
      format: this.isZip ? 'zip' : 'json'
    }).subscribe(
      response => this.saveToFileSystem(response)
    );
  }
  saveToFileSystem(response) {
    console.log(response)
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const filename2 = filename.replace(/\"/g, '')
    const blob = new Blob([response._body]);
    saveAs(blob, filename2);
  }
}

ACARegistry.register(KibanaComponent.id, KibanaComponent);
