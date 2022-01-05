import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EqualValidateDirective } from './lib/directives/equal-validate.directive';
import { BtxGlobalAttributesComponent } from './lib/btx-components/btx-global-attributes/btx-global-attributes.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BtxComponentsModule } from './lib/btx-components/btx-components.module';
import { ButtonComponent } from './samples/button/button.component';
import { HeaderTopComponent } from './samples/header-top/header-top.component';
import { HeaderNavComponent } from './samples/header-nav/header-nav.component';
import { InputComponent } from './samples/input/input.component';
import { SelectComponent } from './samples/select/select.component';
import { FormComponent } from './samples/form/form.component';
import { TableComponent } from './samples/table/table.component';
import { ColorComponent } from './samples/color/color.component';
import { TypeComponent } from './samples/type/type.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroService } from './cadastro/cadastro.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {DatePipe, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    EqualValidateDirective,
    BtxGlobalAttributesComponent,
    ButtonComponent,
    HeaderTopComponent,
    HeaderNavComponent,
    InputComponent,
    SelectComponent,
    FormComponent,
    TableComponent,
    ColorComponent,
    TypeComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BtxComponentsModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
  ],
  providers: [CadastroService, DatePipe, 
    { 
      provide: LOCALE_ID, 
      useValue: 'pt-BR' 
    } ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
