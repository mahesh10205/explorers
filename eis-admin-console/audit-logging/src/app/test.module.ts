import { AuditMsgDialog } from "./dialog/audit-msg-dialog";
import { NgModule } from "@angular/core";
import { AdminConsoleFormsMaterialModule } from "./admin-console-forms-material-module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [AuditMsgDialog],
  imports: [AdminConsoleFormsMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule],
  exports: [AdminConsoleFormsMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule],
  entryComponents: [AuditMsgDialog]
})
export class TestModule { }