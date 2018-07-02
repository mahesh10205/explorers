import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ACARegistry } from '../interface/ACARegistry';
import { Type } from '@angular/compiler/src/core';
import { ACA } from '../interface/ACA';

@Component({
  selector: 'app-aca-component-loader',
  templateUrl: './aca-component-loader.component.html',
  styleUrls: ['./aca-component-loader.component.css']
})
export class AcaComponentLoaderComponent implements OnInit {
  @Input() aca: ACA;
  @ViewChild('acaComponent', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(ACARegistry.getACAComponent(this.aca.getAppID()));
    const componentRef = this.entry.createComponent(factory);
  }
}
