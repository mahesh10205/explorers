import { TestBed, inject } from '@angular/core/testing';

import { AuditMsgService } from './audit-msg.service';

import { HttpModule } from "@angular/http";

describe('AuditMsgService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [AuditMsgService],
      imports:[HttpModule]
    });

   // TestBed.get()

  });

  it('should be created', inject([AuditMsgService], (service: AuditMsgService) => {
    expect(service).toBeTruthy();
  }));
});
