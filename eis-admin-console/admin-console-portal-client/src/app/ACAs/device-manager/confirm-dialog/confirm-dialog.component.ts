import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(trueIfConfirm) {
    this.dialogRef.close(trueIfConfirm);
  }

  ngOnInit() {
  }
}
