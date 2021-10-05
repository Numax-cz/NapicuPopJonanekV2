import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { JonanekComponent } from './jonanek/jonanek.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ShopComponent } from './shop/shop.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { ShopSoundComponent } from './shop-sound/shop-sound.component';
import { ShopBackgroundComponent } from './shop-background/shop-background.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsAlertSessionComponent } from './settings-alert-session/settings-alert-session.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: JonanekComponent,
    children: [
      {
        path: 'shop',
        component: ShopComponent,
        children: [
          { path: 'sound', component: ShopSoundComponent },
          { path: 'background', component: ShopBackgroundComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'login', component: LoginComponent },
          { path: 'settings/session', component: SettingsAlertSessionComponent },
        ],
      },
    ],
  },
  {},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    JonanekComponent,
    ShopComponent,
    ErrorComponent,
    ShopSoundComponent,
    ShopBackgroundComponent,
    SettingsComponent,
    SettingsAlertSessionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
