import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

@Component({
    templateUrl: 'home.html'
})

export class HomePage {
    text: string = "";
    rangeValue: number = 0;
    toggleValue: boolean = false;

    constructor(public navCtrl: NavController, private alertController: AlertController) {
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