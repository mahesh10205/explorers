import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import * as _ from 'lodash';
import { ACA } from '../interface/ACA';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSelectionListChange, getMatInputUnsupportedTypeError } from '@angular/material';
import { K8sComponent } from '../ACAs/k8s/k8s.component';
import { ACARegistry } from '../interface/ACARegistry';
import { UrlInfo } from '../model/url-info';
import { IFrameService } from '../service/iframe.service';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers, ResponseContentType } from "@angular/http";
import { AuthService } from '../service/auth.service';
import { LogService, Level } from '../service/log.service';

@Component({
  selector: 'admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
  providers: [NotificationService]
})
export class AdminConsoleComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  loggedInUser: string;
  loggedIn: boolean;
  public acas: Array<ACA> = new Array();
  public applicationsJSON: any = [];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private iframeService: IFrameService,
    private notificationService: NotificationService,
    private componentFactoryResolver: ComponentFactoryResolver, private http: Http, private logger:LogService, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.subscribe();
  }
  ngOnInit() {
    
    
    if (!this.authService.isLoggedin()) {
      this.authService.save();
    }
    if (this.authService.isLoggedin()) {
      this.postLogin();
      this.authService.getUser().subscribe(data => {
     
        console.log(data);
        this.logger.log(Level.INFO,data);
        if (data) {
          this.loggedInUser = data.sub;
        }
      });
    } 
  }
  

  logout(): void {
    this.authService.logout();
    this.remove();
  }
  public remove(): void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("session_state");
  }
  postLogin() {

    this.loggedInUser = this.iframeService.userInfo ? this.iframeService.userInfo.user : ""

    // let headersObj: Headers = new Headers();
    // headersObj.append("Authorization", this.authService.autherizationInfo());

    this.http.get("/applications")
      .subscribe(
        res => {
          console.log(res.json());
          this.logger.log(Level.INFO,res.json());
          this.applicationsJSON = res.json();
          this.applicationsJSON.forEach((applicationJSON, index) => {
            let url = new Map<String, String>();
            url.set('url', applicationJSON.urls);
            let aca: ACA = ACARegistry.createACA(applicationJSON.appId, applicationJSON.urls, this.notificationService);

            if (null != aca) {
              this.acas[index] = aca;
            } else {
              console.error("There is no ACA with ID ", applicationJSON.appId);
              this.logger.log(Level.SEVERE,"There is no ACA with ID "+ applicationJSON.appId);
            }
          });
        }
      );
  }

  private subscribe() {
    this.notificationService.notificationDataSubject.subscribe((value: any[]) => {
      console.log("Admin Console Component notified of change to NotificationService value", value);
      this.logger.log(Level.INFO,"Admin Console Component notified of change to NotificationService value"+ value);
      this.notificationData = value;
    });
  }

  public notificationData: any[] = new Array<any[]>();
  public getNotificationCount(aca?: ACA): String {
    const count = this.notificationService.getNotificationCount(aca);
    if (count == '0') return '';
    return count;
  }

}
