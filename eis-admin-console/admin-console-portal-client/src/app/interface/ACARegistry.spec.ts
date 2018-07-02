import { TestBed, getTestBed, inject, fakeAsync, tick, async } from '@angular/core/testing';
import { ACARegistry } from './ACARegistry';
import { KibanaComponent } from '../ACAs/kibana/kibana.component';
import { NotificationService } from '../service/notification.service';
import { KibanaService } from '../service/kibana.service';
import { HttpModule, Http } from '@angular/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { LogService } from '../service/log.service';


describe('ACARegistry', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpModule
            ],
            providers: [
                KibanaService,
                LogService,
                NotificationService
            ]
        });
    });

    it('Should Create', () => {
        const reg = new ACARegistry();

        expect(reg).toBeTruthy();
    });

    it('register() and getACAComponent() ', () => {
        ACARegistry.register(KibanaComponent.id, KibanaComponent);
        expect(ACARegistry.getACAComponent(KibanaComponent.id)).toBeTruthy();
    });

    // it('createACA() and getACA() and getURL()', async(
    //     inject(
    //         [
    //             KibanaService,
    //             NotificationService,
    //             Http,
    //             LogService
    //         ], (kibanaService: KibanaService,
    //             notificationService: NotificationService,
    //             http: Http,
    //             logService:LogService) => {
    //             const kComponet = new KibanaComponent(notificationService, kibanaService, null,http,null,logService);

    //             ACARegistry.register(KibanaComponent.id, KibanaComponent);
    //             const aca = ACARegistry.createACA(KibanaComponent.id, 'http://dummy-url.com', notificationService);
    //             const getaca = ACARegistry.getACA(KibanaComponent.id);

    //             expect(aca).toBeTruthy();
    //             expect(getaca).toBeTruthy();
    //             expect(getaca.getURL()).toBeTruthy();
    //             expect(getaca.getURL()).toBe('http://dummy-url.com');

    //         }
    //     ))
    // );
});