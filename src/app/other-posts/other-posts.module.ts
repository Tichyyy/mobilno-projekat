import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherPostsPageRoutingModule } from './other-posts-routing.module';

import { OtherPostsPage } from './other-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherPostsPageRoutingModule
  ],
  declarations: [OtherPostsPage]
})
export class OtherPostsPageModule {}
