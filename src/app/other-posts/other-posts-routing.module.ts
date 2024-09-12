import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherPostsPage } from './other-posts.page';

const routes: Routes = [
  {
    path: '',
    component: OtherPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherPostsPageRoutingModule {}
