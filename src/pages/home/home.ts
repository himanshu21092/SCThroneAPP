import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';

import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    queue: any;
    currentUser: any;
    user: any;
    loader: any;
    toast: any;

    constructor(public navCtrl: NavController, private httpProvider: HttpProvider, storage: Storage, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

        storage.get('user').then((user) => {
            console.log("User", user);
            this.user = user;
        });

    }

    showDoneBtn() {
        if (this.currentUser) {
            if (this.currentUser._id == this.user._id) {
                return true;
            }
        }
        return false;
    }

    getCurrentUserName() {
        if (this.currentUser) {
            return this.currentUser.name;
        }
        return false;
    }


    presentToast(message) {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        this.toast.present();
    }


    presentLoadingDefault() {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loader.present();
    }

    getCurrentState() {
        this.presentLoadingDefault();
        this.httpProvider.getCurrentState().subscribe(response => {
            let data: any = response;

            this.queue = data.queue;
            this.currentUser = data.currentUser;
            this.loader.dismiss();
        }, err => {
            console.log(err);
            this.loader.dismiss();
        });
    }

    nextInQueue(id) {
        this.presentLoadingDefault();

        this.httpProvider.iamNext(this.user._id).subscribe(res => {
            let response: any = res;
            this.loader.dismiss();
            this.presentToast(response.message);

            this.getCurrentState();
        }, err => {
            console.log(err);
            this.loader.dismiss();
        });
    }

    done(id) {
        this.presentLoadingDefault();

        this.httpProvider.done(this.user._id).subscribe(res => {
            let response: any = res;
            this.loader.dismiss();
            this.presentToast(response.message);
            this.getCurrentState();
        }, err => {
            console.log(err);
            this.loader.dismiss();
        });
    }

    ionViewDidLoad() {
        // Put here the code you want to execute
        this.getCurrentState();
    }

}
