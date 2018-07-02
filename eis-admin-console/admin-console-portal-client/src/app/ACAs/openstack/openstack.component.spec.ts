import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { OpenstackComponent } from "./openstack.component";
import { NotificationService } from '../../service/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../safe.pipe';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogService } from '../../service/log.service';
import { AuthService } from '../../service/auth.service';


describe("OpenstackComponent", () => {
  let component: OpenstackComponent;
  let fixture: ComponentFixture<OpenstackComponent>;
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ OpenstackComponent, SafePipe ],
      providers: [NotificationService, TranslateService,DomSanitizer, LogService, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenstackComponent);
    component = fixture.componentInstance;
    service = TestBed.get(NotificationService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(component, 'getURL').and.returnValue({
        'dashboard': 'http://3.28.93.151/auth/login/',
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get URL', () => {   
    component.openTitaniumDashboard();
  });

  it('validating label', () => {   
    const label = component.getLabel();
    expect(label).toBeTruthy
    expect(label).toContain('app.label.openstack');
  });
});