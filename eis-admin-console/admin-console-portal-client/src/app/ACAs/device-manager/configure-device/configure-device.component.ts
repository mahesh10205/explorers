import { CapabilityType } from './../../../model/capability-type';
import { FormService } from './../../../service/form.service';
import { DeviceImpl } from './../../../model/impl/device-impl';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Device } from './../../../model/device';
import { CapabilityImpl } from './../../../model/impl/capability-impl';
import { Capability } from './../../../model/capability';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { DeviceManagerService } from '../../../service/device-manager.service';
import {LogService, Level} from '../../../service/log.service';

@Component({
  selector: 'app-configure-device',
  templateUrl: './configure-device.component.html',
  styleUrls: ['./configure-device.component.css']
})
export class ConfigureDeviceComponent implements OnInit {
  public data: any = [];
  public action: any;
  public duplicateFlag: any;

  @ViewChild('f') f: any;
  public details: any = [];
  public siteIdError = false;
  public cStore_ip = false;
  public cStore_port = false;

  public cFind_ip = false;
  public cFind_port = false;

  public cMove_ip = false;
  public cMove_port = false;
  public cMove_aetitle = false;
  public isFormValid = false;
  public capabilities: any;

  btnValidate = false;
  sample12 = false;
  data1 = false;
  data2 = false;
  data3 = false;

  public capability: any;
  public selectedData: any = {};

  expandCapability = 99;

  public cStore: Capability = new CapabilityImpl(CapabilityType.C_STORE);
  public cFind: Capability = new CapabilityImpl(CapabilityType.C_FIND);
  public cMove: Capability = new CapabilityImpl(CapabilityType.C_MOVE);

  @Input() selectedDevice: Device;
  systemIDExist: boolean = false;
 systemIDExistMsg: string;

  systemIdErrorMessage;

  capabilitiesPanelOpenState: boolean = false;
  isAddDevice = true;
  submitActionlabel;

  configureDeviceForm: FormGroup;
  capabilitiesForm: FormGroup;

  isCapabilitiesValid = false;
  isCapabilityValid = false;
  isPortValid = false;
  isIPValid = false;
  isAETitleValid = false;

  connectors: Array<any>;
  REGEX_IP = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/;
  REGEX_PORT = /^[1-9][0-9]+$/i;

  constructor(public deviceManagerService: DeviceManagerService, public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfigureDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCallingComponent: any, public formService: FormService, private logger: LogService
  ) {
    this.selectedDevice = dataFromCallingComponent.selectedDevice || new DeviceImpl();
    this.connectors = this.selectedDevice.connectors;
    this.isAddDevice = dataFromCallingComponent.isAddDevice;
    this.submitActionlabel = this.isAddDevice ? 'Register' : 'Update';
    this.setupForm();
  }

  setupForm() {
    this.configureDeviceForm = this.formBuilder.group({
      device: this.formBuilder.group({
        imagingDeviceID: [this.selectedDevice.imagingDeviceID],
        systemID: [this.selectedDevice.systemID, Validators.required],
        productName: [this.selectedDevice.productName, Validators.required],
        manufacturer: [this.selectedDevice.manufacturer, Validators.required],
        belongsTo: this.formBuilder.group({
          siteID: [this.selectedDevice.belongsTo.siteID],
          siteName: [this.selectedDevice.belongsTo.siteName, Validators.required],
          country: [this.selectedDevice.belongsTo.country, Validators.required],
          region: [this.selectedDevice.belongsTo.region, Validators.required],
        })
      })
    });
    let capabilities = this.createCapabilities();
    this.capabilitiesForm = this.formBuilder.group({
      capabilities: this.formBuilder.array(capabilities)
    });
    this.isAtleastOneCapabilityExists(capabilities);
  }

  createCapabilities(): FormGroup[] {
    let capabilityTypes = Object.values(CapabilityType);
    let capabilities: Array<FormGroup> = [];
    let registeredCapabilities = [];
    if (this.connectors && this.connectors.length > 0) {
      this.connectors[0].capabilities.forEach(capability => {
        capabilities.push(this.createCapability(capability));
        registeredCapabilities.push(capability.capability);
      });
      if (registeredCapabilities.length < 3) {
        let capabilityTypesSet: Set<string> = new Set(capabilityTypes), registeredCapabilitiesSet = new Set(registeredCapabilities);
        let notYetRegisteredCapabilityTypes = [...capabilityTypes].filter(v => !registeredCapabilitiesSet.has(v));
        notYetRegisteredCapabilityTypes.forEach(notRegisteredCapability => {
          capabilities.push(this.createCapability(new CapabilityImpl(notRegisteredCapability)));
        });
      }
    } else {
      capabilityTypes.forEach(capabilityType => {
        capabilities.push(this.createCapability(new CapabilityImpl(capabilityType)));
      });
    }
    return capabilities;
  }

  createCapability(capability) {
    return this.formBuilder.group({
      capability: [capability.capability],
      configuration: this.formBuilder.group({
        port: [capability.configuration.port],
        ip: [capability.configuration.ip],
        aetitle: [capability.configuration.aetitle],
      })
    });
  }

  ngOnInit() {
    this.buildCapabilities();
  }

  saveDevice() {
    let capabilities = this.capabilitiesForm.get('capabilities').value;
    for (let i = capabilities.length - 1; i >= 0; i--) {
      if (!capabilities[i].configuration.ip || !capabilities[i].configuration.port || !capabilities[i].configuration.aetitle) {
        capabilities.splice(i, 1);
      }
    }
    let device = { ...this.configureDeviceForm.get('device').value, ...{ connectors: [{ 'type': 'DICOM', capabilities: capabilities }] } };

    device['metadata'] = [{ 'ngssf': '' }];

    this.deviceManagerService.saveData(device, this.isAddDevice)
      .subscribe(details => {
        this.dialogRef.close();
      });
  }

  buildCapabilities() {
    this.selectedDevice.connectors[0].capabilities.forEach(details => {
      if (details.capability === CapabilityType.C_STORE.toString()) {
        this.cStore = {
          capability: details.capability,
          configuration: details.configuration,
          id: details.id
        };
      } else if (details.capability === CapabilityType.C_FIND.toString()) {
        this.cFind = {
          capability: details.capability,
          configuration: details.configuration,
          id: details.id
        };
      } else if (details.capability === CapabilityType.C_MOVE.toString()) {
        this.cMove = {
          capability: details.capability,
          configuration: details.configuration,
          id: details.id
        };
      }
    });
    this.selectedData = Object.assign({}, this.selectedDevice);
  }

  isConfigurationFieldValid(configurationFieldName, index) {
    let validFlag = true;
    let isAnyFieldInCapabilitySetTouched = false;

    let capabilities = this.capabilitiesForm.get('capabilities').value;
    if (capabilities[index] && capabilities[index].configuration && (capabilities[index].configuration.port || capabilities[index].configuration.ip || capabilities[index].configuration.aetitle)) {
      isAnyFieldInCapabilitySetTouched = true;
      let capabilityFormArray = this.capabilitiesForm.get('capabilities') as FormArray;
      switch (configurationFieldName) {
        case 'IP':
          if (capabilities[index].configuration.ip) {
            if (this.REGEX_IP.test(capabilities[index].configuration.ip)) {
              capabilityFormArray.at(index).get('configuration').get('ip').setErrors(undefined);
            } else {
              capabilityFormArray.at(index).get('configuration').get('ip').setErrors({ 'incorrect': true });
              validFlag = false;
            }
          } else {
            capabilityFormArray.at(index).get('configuration').get('ip').setErrors(undefined);
          }
          break;
        case 'PORT':
          if (capabilities[index].configuration.port) {
            if (this.REGEX_PORT.test(capabilities[index].configuration.port)) {
              capabilityFormArray.at(index).get('configuration').get('port').setErrors(undefined);
            } else {
              capabilityFormArray.at(index).get('configuration').get('port').setErrors({ 'incorrect': true });
              validFlag = false;
            }
          } else {
            capabilityFormArray.at(index).get('configuration').get('port').setErrors(undefined);
          }
          break;
        case 'AETITLE':
          if (capabilities[index].configuration.port && capabilities[index].configuration.ip) {
            if (capabilities[index].configuration.aetitle) {
              capabilityFormArray.at(index).get('configuration').get('aetitle').setErrors(undefined);
            } else {
              capabilityFormArray.at(index).get('configuration').get('aetitle').setErrors({ 'incorrect': true });
              validFlag = false;
            }
          }
      }
      if (this.isAtleastOneCapabilityExists(capabilities)) {
        this.capabilitiesForm.setErrors(undefined);
      } else {
        this.capabilitiesForm.setErrors({ 'incorrect': true });
      }
    } else {
      this.capabilitiesForm.setErrors({ 'incorrect': true });
    }
    return !validFlag;
  }

  isAtleastOneCapabilityExists(capabilities) {
    let valid = true;
    let atleastOneEntered = false;
    capabilities.forEach(capability => {
      if (capability.configuration && (capability.configuration.port || capability.configuration.ip || capability.configuration.aetitle)) {
        if (capability.configuration && capability.configuration.ip && this.REGEX_IP.test(capability.configuration.ip) &&
          capability.configuration && capability.configuration.port && this.REGEX_PORT.test(capability.configuration.port) &&
          capability.configuration && capability.configuration.aetitle) {
          console.log('all valid', capability);
          this.logger.log(Level.INFO,"all valid" + capability);
        } else {
          valid = false;
          return;
        }
        atleastOneEntered = true;
      }
    });
    this.isCapabilitiesValid = valid && atleastOneEntered;
    return this.isCapabilitiesValid;
  }

  isFieldValid(field: string) {
    if (field.indexOf('.') > -1) {
      let fields = field.split('.');
      let node = this.configureDeviceForm.get(fields[0]);
      fields.forEach((field, index) => {
        if (index > 0) {
          node = node.get(field);
        }
      });
      return !node.valid && node.touched;
    }
    return !this.configureDeviceForm.get(field).valid && this.configureDeviceForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isDuplicateSystemID() {
    let newSystemId = this.configureDeviceForm.get('device').get('systemID').value;

    if (!newSystemId || this.selectedDevice.systemID !== newSystemId && this.deviceManagerService.isExistingDevice(newSystemId)) {
      this.configureDeviceForm.get('device').get('systemID').setErrors({ 'incorrect': true });
      return true;
    } else {
      this.configureDeviceForm.get('device').get('systemID').setErrors(undefined);
      return false;
    }
  }

  setCapabilityExpanded(capabilityIndex) {
    this.expandCapability = capabilityIndex;
  }
}
