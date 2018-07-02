import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrometheusComponent } from "./prometheus.component";
import { NotificationService } from '../../service/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../safe.pipe';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';
import { LogService } from '../../service/log.service';


describe("PrometheusComponent", () => {
  let component: PrometheusComponent;
  let fixture: ComponentFixture<PrometheusComponent>;
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ PrometheusComponent, SafePipe ],
      providers: [NotificationService, TranslateService,DomSanitizer,AuthService, LogService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrometheusComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NotificationService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(component, 'getURL').and.returnValue({
        'dashboard': 'http://3.28.94.16:31334',
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get URL', () => {   
    component.ngOnInit();
    const result = component.dashboardUrl
    expect(result).toBeTruthy
    expect(result).toContain('http://3.28.94.16:31334');
  });

  it('validating label', () => {   
    const label = component.getLabel();
    expect(label).toBeTruthy
    expect(label).toContain('app.label.prometheus');
  });
});

