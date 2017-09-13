import { ArduinoRestService } from './arduino-rest.service';
import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

@Component({
    templateUrl: 'home.html'
})

export class HomePage {
    text: string = "";
    rangeValue: number = 0;
    toggleValue: boolean = false;

    constructor(
        public navCtrl: NavController, 
        private alertController: AlertController,
        private arduinoRestService: ArduinoRestService) {
    }

    public get restResources(): any {
        return this.arduinoRestService.restResources;
    }

    public isDigitalInput(resource: any): boolean {
        return false;
    } 

    public isDigitalOutput(resource: any): boolean {
        return false;
    } 

    public isAnalogOutput(resource: any): boolean {
        return false;
    } 

    public getDigitalValue(resource: any): boolean {
        return resource.on;
    }

    showName() {
        let alert = this.alertController.create({
            title: 'Input: ' 
              + this.text + ' ' 
              + this.rangeValue +  ' ' 
              + this.toggleValue,
            buttons: ['OK']
        });
        alert.present();
    }
}