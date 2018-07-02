import { ACA } from "./ACA";
import { ACACreator } from "./ACACreator";
import { Type } from "@angular/compiler/src/core";
import { NotificationService } from "../service/notification.service";
import { URL } from "./URL";

/**
* A registration object of ACAs. The registry provides a mechanism for registering ACAs and creating ACAs.
* 
 * @author David Polyak (212070346)
*/
export class ACARegistry {
    private static acas: Array<ACA> = new Array();
    private static acasurl: Map<String, String> = new Map();
    private static acaComponentMap: Map<String, Type> = new Map();

    /**
     * Returns the ACA as a Type.
     * @param appId The ACA application identifier.
     * @returns The ACA as a Type.
     */
    public static getACAComponent(appId: String): Type {
        if (undefined != appId) {
            return this.acaComponentMap.get(appId);
        }

        return null;
    }

    /**
     * Returns the ACA with the specified application identifier.
     * @param appId The ACA application identifier.
     * @returns An ACA or undefined if there is no ACA with the specified appId.
     */
    public static getACA(appId: String): ACA {
        if (undefined != appId) {

            /*
            *  Check if an ACA already exists.
            */
            this.acas.forEach(aca => {
                if (aca.getAppID() == appId) {
                    console.log("Found an existing ACA", aca);
                    return aca;
                }
            });
        }

        return undefined;
    }

     /**
     * Returns the ACAURL with the specified application identifier.
     * @param appId The ACA application identifier.
     * @returns An ACAURL or undefined if there is no ACA with the specified appId.
     */
    public static getURL(appId: String): String {
        let retval:String = 'default';
        if (undefined != appId) {

            retval=this.acasurl.get(appId);
           
        }

        return retval;
    }

    /**
     * Creates an ACA with the specified application identifier.
     * @param appId The ACA application identifier.
     * @param notificationService The NotificationService for the ACA.
     * @return The ACA, or undefined if the parameters are invalid.
     */
    public static createACA(appId: String, url:String, notificationService: NotificationService): ACA {

        /*
         * Check if an ACA already exists.
         */
        let aca: ACA = ACARegistry.getACA(appId);

        if (undefined == aca) {
            if (undefined != appId && undefined != notificationService) {

                if (this.acaComponentMap.has(appId)) {

                    let creator: ACACreator<NotificationService> = new ACACreator(this.acaComponentMap.get(appId));

                    if (creator) {
                        console.log("Created a new ACA", appId);
                        aca = <ACA>creator.getNew(notificationService);
                        aca.setUrl(url);
                        this.acasurl.set(appId, url);
                    }

                } else {
                    console.error("No ACA component exsits with application identifier of", appId);
                }
            }
        } else {
            console.log("Not creating an ACA component, an ACA already exists for", appId);
        }

        return aca;
    }

    /**
     * Registers a new ACA component.
     * @param appId The ACA application identifier.
     * @param component The ACA component.
     */
    public static register(appId: String, component: Type) {
        console.log("Adding to registry " + appId + " for ", component);
        this.acaComponentMap.set(appId, component);
    }
}

