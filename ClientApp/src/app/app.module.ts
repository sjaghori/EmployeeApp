import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListComponent,
    DetailComponent,
    AddComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CoreModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'detail/:id', component: DetailComponent }
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
