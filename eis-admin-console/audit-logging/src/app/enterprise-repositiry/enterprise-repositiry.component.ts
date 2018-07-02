import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { EnterpriseRepoInfo } from '../model/enterprise-repo-info';
import { ProtocolInfo } from '../model/protocol-info';
import { AuditMsgService } from '../service/audit-msg.service';
import { TestEnterpriseRepoInfo } from '../model/test-enterprise-repo';
import { AuditMsgDialog } from '../dialog/audit-msg-dialog';
import { FormControl, Validators, FormGroupDirective, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'enterprise-repositiry',
  templateUrl: './enterprise-repositiry.component.html',
  styleUrls: ['./enterprise-repositiry.component.css'],
 
})
export class EnterpriseRepositiryComponent implements OnInit {

  enterpriseRepoInfo: EnterpriseRepoInfo = new EnterpriseRepoInfo();

  protocolInfoList: any;

  hostName1 = new FormControl('', [Validators.required]);

  hostName2 = new FormControl('', [Validators.required]);

  portNoControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);

  portNoControl2 = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);

  // portNoControl = new FormControl('', [Validators.required,Validators.pattern("/^[0-9]*")]);



  
  constructor(private auditMsgService: AuditMsgService, public dialog: MatDialog,private builder: FormBuilder) { }

  ngOnInit() {

      this.auditMsgService.getRepositoryConfigInfo().subscribe(data => {
      this.enterpriseRepoInfo = data;
      this.protocolInfoList = [];

      this.protocolInfoList.push(new ProtocolInfo(1001, "TCP - without Syslog"));
      this.protocolInfoList.push(new ProtocolInfo(1002, "UDP - without Syslog"));
      this.protocolInfoList.push(new ProtocolInfo(1003, "TCP BSD Syslog"));
      this.protocolInfoList.push(new ProtocolInfo(1004, "UDP BSD Syslog"));
      this.protocolInfoList.push(new ProtocolInfo(1005, "TCP IETF Syslog"));
      this.protocolInfoList.push(new ProtocolInfo(1006, "UDP IETF Syslog"));
      if (!data.isDisableTLS) {
        this.protocolInfoList.push(new ProtocolInfo(1007, "TLS IETF Syslog"));
        this.protocolInfoList.push(new ProtocolInfo(1008, "TLS BSD Syslog"));
      }

    });
  }

  onSave(): void {
    
    if (this.isValidForm()) {
      this.auditMsgService.saveEnterpriseRepoInfo(this.enterpriseRepoInfo).subscribe(data => {
        console.log("data = " + data);
        this.openDialog(data);
      })
    } else {
      this.openDialog("Invalid data");
    }
  }

  isValidForm(): boolean {


    return this.hostName1.valid && this.hostName2.valid && this.portNoControl.valid && this.portNoControl2.valid;
  }

  onEnterpriseRepo1TestMsg(): void {

    const testEnterpriseRepoInfo: TestEnterpriseRepoInfo = new TestEnterpriseRepoInfo();
    testEnterpriseRepoInfo.host = this.enterpriseRepoInfo.repository_1_host;
    testEnterpriseRepoInfo.port = this.enterpriseRepoInfo.repository_1_port;
    testEnterpriseRepoInfo.protocol = this.enterpriseRepoInfo.repository_1_protocol;

    this.auditMsgService.sendTestMsg(testEnterpriseRepoInfo).subscribe(data => {
      console.log("data = " + data);
      this.openDialog(data);
    }, err => {
      console.log("err = " + err);
      this.openDialog(err._body);
    })
  }

  onEnterpriseRepo2TestMsg(): void {

    const testEnterpriseRepoInfo: TestEnterpriseRepoInfo = new TestEnterpriseRepoInfo();
    testEnterpriseRepoInfo.host = this.enterpriseRepoInfo.repository_2_host;
    testEnterpriseRepoInfo.port = this.enterpriseRepoInfo.repository_2_port;
    testEnterpriseRepoInfo.protocol = this.enterpriseRepoInfo.repository_2_protocol;
    this.auditMsgService.sendTestMsg(testEnterpriseRepoInfo).subscribe(data => {
      console.log("data = " + data);
      this.openDialog(data);
    }, err => {
      console.log("err = " + err);
      this.openDialog(err._body);
    })
  }

  openDialog(data: string): void {
    let dialogRef = this.dialog.open(AuditMsgDialog, {
      width: '250px',
      data: { info: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  getPortNoErrorMessage1(): string {

    return this.getPortNoErrorMessage(this.portNoControl);
  }

  getPortNoErrorMessage2(): string {
    return this.getPortNoErrorMessage(this.portNoControl2);
  }

  getPortNoErrorMessage(control: FormControl): string {

    let msg: string = '';
    if (control.hasError('required')) {
      msg = 'You must enter a number';
    } else if (control.hasError('pattern')) {
      msg = 'Invalid Value';
    }

    return msg;

  }

}


