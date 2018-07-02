import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { ResponseContentType } from '@angular/http';
import { UrlInfo } from "../model/url-info";
import { UserInfo } from "../model/user-info";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class K8sService {
    csrfURL: string = "/k8s/api/v1/csrftoken/login";
    loginUrl: string = "/k8s/api/v1/login";
    statusUrl: string = "/k8s/api/v1/login/status"


    constructor(private http: Http) {

    }

    login(): void {

        let headersObj: Headers = new Headers();

        this.http.get(this.csrfURL).map(resp => {

            if (resp) {

                const tokenData: any = resp.json();
                let headersObj: Headers = new Headers();

                headersObj.append("x-csrf-token", tokenData.token);
                let loginPayload = '{"username":"","password":"","token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tNmN3d3oiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImE3NjgxMzVhLTFjNzMtMTFlOC05OThhLWZhMTYzZWIwN2ZlZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.GtXlBmGfGceiFQ301IivtQVO1N6jJsRptWM8f8SHDf0_u6G-2OyRViFQCU7FwYLk4GJXSg0sG_An2FjwrDj2hwtsECsmmTdIQUr2_qldtjwSmBEOyKnvfdoYf5xRAnUpwre1rSDpq9WA3Z8xJiGgtgKhOwiWh9kOl2J4LiOa0DbEnAdGjHJdBJD6hxKGrPMbWcw-PizFO-ed6v12M1ejJegcKzv8EEsrBRrxQYfecrRZmMfveFZlEKpoc8LsMr3zwdbJCaqhtJqjf_S3mdM05c4ltsOvOYA1wFMAJtDeggQd4kTd2ZqTDaDH9AiCe7zDE_NGSigiF0YnG21qZEy6aQ","kubeConfig":""}'
                
                this.http.post(this.loginUrl, loginPayload, { headers: headersObj }).map(loginResp => {

                    let loginRespData:any = loginResp.json();

                    let statusHeadersObj: Headers = new Headers();
                    statusHeadersObj.append("cookie", loginRespData.jweToken);                 

                    //cookie
                    this.http.get(this.statusUrl,{ headers: statusHeadersObj}).map(resp => {

                    });


                });
            }

        }
        )


    }


    prepareK8sService(): Observable<any> {
        let obs: Observable<any> = new Observable<any>(observer => {
    
          const csrfTokenUrl = "/k8s/api/v1/csrftoken/login";
    
          const loginUrl = "/k8s/api/v1/login";
    
          const statusUrl = "/k8s/api/v1/login/status";
    
          this.http.get(csrfTokenUrl).subscribe(tokenResp => {
            const tokenRespData: any = tokenResp.json();
            let loginHeadersObj: Headers = new Headers();          
            
            loginHeadersObj.append("x-csrf-token", tokenRespData.token);
            loginHeadersObj.append("Content-Type","application/json");
            let loginPayload = '{"username":"","password":"","token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tNmN3d3oiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImE3NjgxMzVhLTFjNzMtMTFlOC05OThhLWZhMTYzZWIwN2ZlZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.GtXlBmGfGceiFQ301IivtQVO1N6jJsRptWM8f8SHDf0_u6G-2OyRViFQCU7FwYLk4GJXSg0sG_An2FjwrDj2hwtsECsmmTdIQUr2_qldtjwSmBEOyKnvfdoYf5xRAnUpwre1rSDpq9WA3Z8xJiGgtgKhOwiWh9kOl2J4LiOa0DbEnAdGjHJdBJD6hxKGrPMbWcw-PizFO-ed6v12M1ejJegcKzv8EEsrBRrxQYfecrRZmMfveFZlEKpoc8LsMr3zwdbJCaqhtJqjf_S3mdM05c4ltsOvOYA1wFMAJtDeggQd4kTd2ZqTDaDH9AiCe7zDE_NGSigiF0YnG21qZEy6aQ","kubeConfig":""}'
                
    
            this.http.post(loginUrl, loginPayload, { headers: loginHeadersObj }).subscribe(loginResp => {
    
              const loginRespData: any = loginResp.json();
    
              let statusHeadersObj: Headers = new Headers();
              //statusHeadersObj.append("Cookie", loginRespData.jwtToken);
    
              this.http.get(statusUrl, { headers: statusHeadersObj }).subscribe(statusResp => {
                observer.next(statusResp.json());
              });
    
            });
    
          },err =>{
              console.log("err = "+err);
          });
    
        });
    
        return obs;
      }
    
}   