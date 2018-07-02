import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditMsgSettingsComponent } from './audit-msg-settings.component';
import { AdminConsoleFormsMaterialModule } from '../admin-console-forms-material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AuditMsgService } from '../service/audit-msg.service';
import { AuditMsgInfo } from '../model/audit-msg-info';
import { Observable } from "rxjs/Rx";
import { AuditMsgDialog } from '../dialog/audit-msg-dialog';
import { TestModule } from '../test.module';

describe('AuditMsgSettingsComponent', () => {
  let component: AuditMsgSettingsComponent;
  let fixture: ComponentFixture<AuditMsgSettingsComponent>;
  const auditMsgInfo: AuditMsgInfo = { anonymization: true, auditSourceID: "1234" };
  let auditMsgService:AuditMsgService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditMsgSettingsComponent],
      imports: [
        TestModule
      ],     
      providers: [AuditMsgService],
    })
      .compileComponents();
  }));

  beforeEach(() => {

    auditMsgService = TestBed.get(AuditMsgService);

    spyOn(auditMsgService, 'getAuditMsgInfo').and.returnValue(Observable.of(auditMsgInfo));

    spyOn(auditMsgService, 'saveAuditMsgInfo').and.returnValue(Observable.of('saved'));

    fixture = TestBed.createComponent(AuditMsgSettingsComponent);
   
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update the values and save', () => {

    component.auditSourceId="543567";
    component.pantientNameAnnonymized="off";

    fixture.detectChanges();
    component.onSave();


  });

});
