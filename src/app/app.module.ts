import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage';

import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HttpProvider } from '../providers/http/http';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GooglePlus,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HttpProvider
    ]
})
export class AppModule { }
