import { Injectable } from '@angular/core';

import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';
import { ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { AuditMsgInfo } from '../model/audit-msg-info';
import { EnterpriseRepoInfo } from '../model/enterprise-repo-info';
import { TestEnterpriseRepoInfo } from '../model/test-enterprise-repo';

@Injectable()
export class AuditMsgService {

  BASE_URL = "/auditlogconfig";


  constructor(private http: Http) { }

  public getAuditMsgInfo(): Observable<AuditMsgInfo> {

    return this.http.get("/eat-auditmessageconfig").map(resp => resp.json());
    
  }

  public getRepositoryConfigInfo(): Observable<EnterpriseRepoInfo> {

    return this.http.get("/eat-repositoryconfiguration").map(resp => resp.json());
   }



  public saveAuditMsgInfo(auditMsgInfo: AuditMsgInfo): Observable<string> {

    return this.http.patch("/eat-auditmessageconfig", auditMsgInfo).map(resp => resp.text());
    }

  public saveEnterpriseRepoInfo(enterpriseRepoInfo: EnterpriseRepoInfo): Observable<string> {

    return this.http.patch("/eat-repositoryconfiguration", enterpriseRepoInfo).map(resp => resp.text());
   }
  public sendTestMsg(enterpriseRepoInfo: TestEnterpriseRepoInfo): Observable<string> {
    return this.http.post("/eat-repositoryconnection", enterpriseRepoInfo).map(resp => resp.text());
   }
}
