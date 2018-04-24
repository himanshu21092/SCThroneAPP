import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';

import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private googlePlus: GooglePlus, private httpProvider: HttpProvider, private storage: Storage) {
    }

    async login() {
        try {
            const response: any = await this.googlePlus.login({});
            console.log(response);


            this.httpProvider.addNewEmployee(response).subscribe(user => {
                console.log(user);
                this.storage.set('user', user);
                this.navCtrl.push(HomePage);
            }, err => {
                console.log(err);
                // Employee already exists
                if (err.status == 409) {
                    let user: any = err.error.employee;
                    this.storage.set('user', user);
                    this.navCtrl.push(HomePage);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
