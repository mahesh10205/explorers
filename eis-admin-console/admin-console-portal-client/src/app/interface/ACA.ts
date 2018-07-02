import { NotificationService } from "../service/notification.service";
import { ACARegistry } from "./ACARegistry";
import { DomSanitizer } from "@angular/platform-browser";
import {LogService, Level} from '../service/log.service';

/**
 * Abstract class defining an Admin Console Application (ACA). This automatically subscribes to the NotificationService 
 * and provides children with an array of notifications specific to it
 * 
 * @author David Polyak (212070346).
 */
export abstract class ACA {
    abstract getAppID(): String;
    abstract getLabel(): String;
    private notifications: any[] = new Array<any>();
    url: String;


    constructor(public notificationService: NotificationService, logService: LogService) {
        this.subscribe();
    }

    private subscribe() {
        this.notificationService.notificationMapSubject.subscribe((value: Map<String, any[]>) => {
            console.log(this.getAppID() + " notified of change to NotificationService value", value);
            this.notifications = value.get(this.getAppID());
        });
    }

    public setUrl(url:String) {
        this.url = url;
    }

    public getNotifications() : any[] {
        return this.notifications;
    }

    pretify(notifications: any[]) {
        return JSON.stringify(notifications);
    }
    public getURL(): String{
        let _acaurl = ACARegistry.getURL(this.getAppID());
        return _acaurl;
    }
}