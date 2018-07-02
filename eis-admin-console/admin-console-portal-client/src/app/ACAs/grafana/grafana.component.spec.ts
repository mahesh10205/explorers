import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GrafanaComponent } from './grafana.component';
import { NotificationService } from '../../service/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../safe.pipe';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';
import { LogService } from '../../service/log.service';


describe('GrafanaComponent', () => {
  let component: GrafanaComponent;
  let fixture: ComponentFixture<GrafanaComponent>;
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ GrafanaComponent, SafePipe ],
      providers: [NotificationService, TranslateService,DomSanitizer, AuthService, LogService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafanaComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NotificationService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(component, 'getURL').and.returnValue({
        'dashboard': 'http://3.28.94.21:3000/',
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get URL', () => {   
    component.ngOnInit();
    const result = component.dashboardUrl
    expect(result).toBeTruthy
    expect(result).toContain('http://3.28.94.21:3000/');
  });

  it('validating label', () => {   
    const label = component.getLabel();
    expect(label).toBeTruthy
    expect(label).toContain('app.label.grafana');
  });
});
