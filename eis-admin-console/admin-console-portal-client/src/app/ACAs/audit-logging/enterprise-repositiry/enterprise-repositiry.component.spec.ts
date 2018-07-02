// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { EnterpriseRepositiryComponent } from './enterprise-repositiry.component';

// import { AuditMsgService } from '../service/audit-msg.service';
// import { Observable } from "rxjs/Rx";
// import { ProtocolInfo } from '../model/protocol-info';
// import { TestModule } from '../../../test.module';
// import { AuthService } from '../../../service/auth.service';
// import { LogService } from '../../../service/log.service';

// describe('EnterpriseRepositiryComponent', () => {
//   let component: EnterpriseRepositiryComponent;
//   let fixture: ComponentFixture<EnterpriseRepositiryComponent>;
//   let auditMsgService: AuditMsgService;
//   let protocolInfoList = [];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [EnterpriseRepositiryComponent],
//       imports: [
//         TestModule
//       ],
//       providers: [AuditMsgService, AuthService, LogService]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {

//     protocolInfoList.push(new ProtocolInfo(1001, "TCP - without Syslog"));
//     protocolInfoList.push(new ProtocolInfo(1002, "UDP - without Syslog"));
//     protocolInfoList.push(new ProtocolInfo(1003, "TCP BSD Syslog"));
//     protocolInfoList.push(new ProtocolInfo(1004, "UDP BSD Syslog"));
//     protocolInfoList.push(new ProtocolInfo(1005, "TCP IETF Syslog"));
//     protocolInfoList.push(new ProtocolInfo(1006, "UDP IETF Syslog"));

//     auditMsgService = TestBed.get(AuditMsgService);

//     spyOn(auditMsgService, 'getRepositoryConfigInfo').and.returnValue(Observable.of(protocolInfoList));

//     spyOn(auditMsgService, 'saveEnterpriseRepoInfo').and.returnValue(Observable.of("Saved"));

//     spyOn(auditMsgService, 'sendTestMsg').and.returnValue(Observable.of("Connected"));

//     fixture = TestBed.createComponent(EnterpriseRepositiryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('test save ', () => {

//     component.enterpriseRepoInfo.repository_1_host = "host1";
//     component.enterpriseRepoInfo.repository_1_port = 12345;
//     component.enterpriseRepoInfo.repository_1_protocol = 1006;
//     component.enterpriseRepoInfo.repository_1_status = true;

//     component.enterpriseRepoInfo.repository_2_host = "host2";
//     component.enterpriseRepoInfo.repository_2_port = 12346;
//     component.enterpriseRepoInfo.repository_2_protocol = 1006;
//     component.enterpriseRepoInfo.repository_2_status = false;
//     fixture.detectChanges();
//     component.onSave();

//   });

//   it('test sentTest message1 ', () => {

//     component.enterpriseRepoInfo.repository_1_host = "host1";
//     component.enterpriseRepoInfo.repository_1_port = 12345;
//     component.enterpriseRepoInfo.repository_1_protocol = 1006;
//     component.enterpriseRepoInfo.repository_1_status = true;


//     fixture.detectChanges();
//     component.onEnterpriseRepo1TestMsg();

//   });

//   it('test sentTest message2 ', () => {

//     component.enterpriseRepoInfo.repository_2_host = "host2";
//     component.enterpriseRepoInfo.repository_2_port = 12346;
//     component.enterpriseRepoInfo.repository_2_protocol = 1006;
//     component.enterpriseRepoInfo.repository_2_status = false;
//     fixture.detectChanges();
//     component.onEnterpriseRepo2TestMsg();

//   });


// });
