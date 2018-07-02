import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KibanaComponent } from './kibana.component';
import { NotificationService } from '../../service/notification.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatIcon, MatDatepicker, MatInput, MatFormField, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardMaterialModule } from '../../dashboard-material-module';
import { WMatTimePickerComponent } from '../../material-time-control/time-control/w-mat-timepicker/w-mat-timepicker.component';
import { HttpModule } from '@angular/http';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { KibanaService } from '../../service/kibana.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { SecurityContext } from '@angular/core/src/security';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../safe.pipe';
import { LogService } from '../../service/log.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';

describe('KibanaComponent', () => {
  let component: KibanaComponent;
  let fixture: ComponentFixture<KibanaComponent>;
  let service: NotificationService;
  let kService: KibanaService;
  let httpMock: HttpTestingController;

  let buttonEL: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, DashboardMaterialModule, HttpModule, NoopAnimationsModule, TranslateModule.forRoot()],
      declarations: [KibanaComponent, WMatTimePickerComponent, SafePipe],
      providers: [NotificationService, TranslateService, KibanaService, DomSanitizer,LogService, AuthService],
    }).compileComponents();
  });

  fixture = TestBed.createComponent(KibanaComponent);
  
    component = fixture.componentInstance;
    service = TestBed.get(NotificationService);
    beforeEach(() => {
    kService = TestBed.get(KibanaService);
    httpMock = TestBed.get(HttpTestingController);
    buttonEL = fixture.debugElement.query(By.css('button'));


    spyOn(component, 'getURL').and.returnValue({
      'dashboard': 'http://3.28.94.16:32456/',
      'logexport': '/search',
      'timezone': '/timezone'
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validating timezone', () => {
    spyOn(kService, 'getTimezone').and.returnValue(Observable.of('Eastern Time'));
    component.ngOnInit();
    const result = kService.getTimezone("timezone");
    result.subscribe(res => {
      console.log(res);
      expect(res).toBeTruthy();
      expect(res).toContain('Time');
    });
  });

  it('export logs', () => {
    spyOn(component, 'saveFile').and.callThrough();
    spyOn(kService, 'getLogExportFile').and.returnValue(Observable.of({
      status: 200,
      statusText: 'ok',
      url: '',
      body: { "took": 4, "timed_out": false, "_shards": { "total": 151, "successful": 151, "skipped": 146, "failed": 0 }, "hits": { "total": 0, "max_score": null, "hits": [] }, "aggregations": { "2": { "buckets": [] } } },
      headers: new Headers({
        'content-disposition': 'attachment; filename=KibanaLogs_2018-06-13T05:00:00.897Z__2018-06-13T05:00:00.897Z.json'
      })
    }));
    component.submit();
    expect(component.saveFile).toHaveBeenCalled();
  });

});