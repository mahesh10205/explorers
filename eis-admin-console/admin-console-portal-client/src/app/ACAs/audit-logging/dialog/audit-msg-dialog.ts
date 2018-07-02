import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'audit-msg-dialog',
    templateUrl: 'audit-msg-dialog.html',
    styleUrls: ['./audit-msg-dialog.css'],
  })
  export class AuditMsgDialog {
  
   
    constructor(
      public dialogRef: MatDialogRef<AuditMsgDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }