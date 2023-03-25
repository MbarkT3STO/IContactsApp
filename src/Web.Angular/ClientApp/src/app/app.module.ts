import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserDashboardComponent } from './User-Dashboard/User-Dashboard.component';
import { LoginComponent } from './Auth/Login/Login.component';
import { AuthService } from './Services/Auth/Auth.service';
import { CheckUserComponent } from './Check-User/Check-User.component';
import { IdentityService } from './Services/Identity/Identity.service';
import { GroupService } from './Services/Group/Group.service';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';

import { GetGroupsComponent } from './User/Group/get-Groups/get-Groups.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserDashboardComponent,
    LoginComponent,
    HomeComponent,
    CheckUserComponent,
    GetGroupsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },

      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },

      { path: 'Check-User', component: CheckUserComponent },

      { path: 'User-Dashboard', component: UserDashboardComponent },

      { path: 'User/Group/Get-Groups', component: GetGroupsComponent },
    ]),
  ],
  providers: [
    AuthService,
    IdentityService,
    GroupService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
