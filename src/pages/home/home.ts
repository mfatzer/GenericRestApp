import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

@Component({
    templateUrl: 'home.html'
})

export class HomePage {
    text: string;
    rangeValue: number;

    constructor(public navCtrl: NavController, private alertController: AlertController) {
    }

    showName() {
        let alert = this.alertController.create({
            title: 'Input: ' + this.text + ' ' + this.rangeValue,
            buttons: ['OK']
        });
        alert.present();
    }
}