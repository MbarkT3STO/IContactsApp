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

import { GetContactsComponent } from './User/get-Contacts/get-Contacts.component';
import { CreateContactComponent } from './User/create-Contact/create-Contact.component';

import { UserHeaderComponent } from './User/user-Header/user-Header.component';
import { UserLayoutComponent } from './User/user-Layout/user-Layout.component';
import { UserFooterComponent } from './User/user-Footer/user-Footer.component';
import { UserSideBarComponent } from './User/user-Side-Bar/user-Side-Bar.component';

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
    GetContactsComponent,
    CreateContactComponent,
    UserHeaderComponent,
    UserLayoutComponent,
    UserFooterComponent,
    UserSideBarComponent,
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

      // { path: 'Check-User', component: CheckUserComponent },

      { path: 'User-Dashboard', component: UserDashboardComponent },

      // { path: 'User/Contact/Get-Contacts', component: GetContactsComponent },
      { path: 'User/Contact/Get-Contacts', component: UserLayoutComponent, children: [ {path: '', component: GetContactsComponent} ] },
      { path: 'User/Contact/Create-Contact', component: CreateContactComponent },

      // { path: 'User-Dashboard' , component: UserLayoutComponent, children: [ {path: '', component: UserDashboardComponent} ]}
      
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
