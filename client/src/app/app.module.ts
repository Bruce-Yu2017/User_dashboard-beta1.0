import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainService} from './main.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSelfComponent } from './edit-self/edit-self.component';
import { NewuserComponent } from './newuser/newuser.component';
import { EditOtherComponent } from './edit-other/edit-other.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditSelfComponent,
    NewuserComponent,
    EditOtherComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpModule,
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
