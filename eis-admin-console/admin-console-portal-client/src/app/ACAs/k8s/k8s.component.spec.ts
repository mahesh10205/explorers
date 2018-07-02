import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { K8sComponent } from './k8s.component';
import { NotificationService } from '../../service/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../safe.pipe';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogService } from '../../service/log.service';
import { AuthService } from '../../service/auth.service';

describe('K8sComponent', () => {
  let component: K8sComponent;
  let fixture: ComponentFixture<K8sComponent>;
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ K8sComponent, SafePipe ],
      providers: [NotificationService, TranslateService,DomSanitizer, LogService, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(K8sComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NotificationService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(component, 'getURL').and.returnValue({
        'dashboard': 'https://3.28.94.24:6443/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/',
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get URL', () => {   
    component.ngOnInit();
    const result = component.dashboardUrl
    expect(result).toBeTruthy
    expect(result).toContain('https://3.28.94.24:6443/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/');
  });

  it('validating label', () => {   
    const label = component.getLabel();
    expect(label).toBeTruthy
    expect(label).toContain('app.label.kubernetes');
  });
});
