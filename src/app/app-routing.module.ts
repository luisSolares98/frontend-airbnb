import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListChatComponent } from './chat/list-chat/list-chat.component';
import { ItemComponent } from './components/item/item.component';
import { ReserveComponent } from './components/reserve/reserve.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reserve',
    component: ReserveComponent
  },
  {
    path: 'item',
    component: ItemComponent
  },
  { path: 'chat', component: ListChatComponent },
  { path: 'chat/:uuid', component: ListChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
