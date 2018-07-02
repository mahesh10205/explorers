import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuditMsgService } from '../service/audit-msg.service';
import { AuditMsgInfo } from '../model/audit-msg-info';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuditMsgDialog } from '../dialog/audit-msg-dialog';

@Component({
  selector: 'audit-msg-settings',
  templateUrl: './audit-msg-settings.component.html',
  styleUrls: ['./audit-msg-settings.component.css'],
 
})
export class AuditMsgSettingsComponent implements OnInit {

  msgSettingsFormGroup: FormGroup;

 public auditSourceId: string;
 public pantientNameAnnonymized: string = "on";

  auditSourceIdFormCtrl = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder, private auditMsgService: AuditMsgService,public dialog: MatDialog) {
    this.msgSettingsFormGroup = fb.group({
      auditSourceIdFormCtrl: this.auditSourceIdFormCtrl,
      pantientNameFormCtrl: ["",Validators.required ],
    });
  }



  ngOnInit() {

    this.auditMsgService.getAuditMsgInfo().subscribe(data => {
      this.auditSourceId = data.auditSourceID;
      if (data.anonymization === true) {
        this.pantientNameAnnonymized = "on";
      } else {
        this.pantientNameAnnonymized = "off";
      }
    })
  }

  onSave(): void {
    console.log("onsave");
    console.log("auditSourceId = " + this.auditSourceId);
    console.log("pantientNameAnnonymized = " + this.pantientNameAnnonymized);

    const auditMsgInfo: AuditMsgInfo = new AuditMsgInfo();
    auditMsgInfo.auditSourceID = this.auditSourceId;

    if (this.pantientNameAnnonymized === "on") {
      auditMsgInfo.anonymization = true;
    } else {
      auditMsgInfo.anonymization = false;
    }

    this.auditMsgService.saveAuditMsgInfo(auditMsgInfo).subscribe(data => {
      console.log("data = " + data);
      this.openDialog(data);
    })

  }

  openDialog(data:string): void {
    let dialogRef = this.dialog.open(AuditMsgDialog, {
      width: '250px',
      data: { info: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

  onCancel(): void {
    console.log("onCancel");
  }

}
