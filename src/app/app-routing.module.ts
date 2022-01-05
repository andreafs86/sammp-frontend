import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './samples/button/button.component';
import { FormComponent } from './samples/form/form.component';
import { InputComponent } from './samples/input/input.component';
import { SelectComponent } from './samples/select/select.component';
import { HeaderTopComponent } from './samples/header-top/header-top.component';
import { HeaderNavComponent } from './samples/header-nav/header-nav.component';
import { TableComponent } from './samples/table/table.component';
import { ColorComponent } from './samples/color/color.component';
import { TypeComponent } from './samples/type/type.component';
import { CadastroComponent} from './cadastro/cadastro.component';


const routes: Routes = [
  { path: 'button', component: ButtonComponent },
  { path: 'form', component: FormComponent },
  { path: 'input', component: InputComponent },
  { path: 'select', component: SelectComponent },
  { path: 'header', component: HeaderTopComponent },
  { path: 'nav', component: HeaderNavComponent },
  { path: 'table', component: TableComponent },
  { path: 'color', component: ColorComponent },
  { path: 'type', component: TypeComponent },
  { path: 'cadastro', component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
