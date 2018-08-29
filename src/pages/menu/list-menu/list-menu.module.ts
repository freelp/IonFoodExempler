import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMenuPage } from './list-menu';

@NgModule({
  declarations: [
    ListMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMenuPage),
  ],
})
export class ListMenuPageModule {}
