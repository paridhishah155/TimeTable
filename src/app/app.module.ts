import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './common/service/component/header/header.component';
import { ProfessorModule } from './professor/professor.module';
import { GlobalHelperService } from './common/service/global-helper.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfessorModule
  ],
  providers: [GlobalHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
