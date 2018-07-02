import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IFrameService } from '../service/iframe.service';



describe('LoginComponent', () => {
  let routerService: Router;
  let iFrameService: IFrameService;
  let activateService: ActivatedRoute;
  let loginComponent = new LoginComponent(routerService, iFrameService, activateService);



  it('should return password error message', async(() => {

    expect(loginComponent.getPwdErrorMessage()).toHaveBeenCalled;
    expect(loginComponent.getPwdErrorMessage()).toEqual("You must enter a value");

  }));

  it('should return UserId error message', async(() => {

    expect(loginComponent.getUserIdErrorMessage()).toHaveBeenCalled;
    expect(loginComponent.getUserIdErrorMessage()).toEqual("You must enter a value");
  }));


  it('should return password error message on entring null value', async(() => {

    expect(loginComponent.getPwdErrorMessage()).toHaveBeenCalled;
    expect(loginComponent.getPwdErrorMessage()).toBeNull;
  }));


  it('should not return password Error mesage', async(() => {

    expect(loginComponent.getPwdErrorMessage()).toBeFalsy;

  }));




  it('should error exist', async(() => {

    expect(loginComponent.isErrorsExist()).toBeTruthy;

  }));



});
