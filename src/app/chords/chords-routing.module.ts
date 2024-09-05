import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChordsPage } from './chords.page';

const routes: Routes = [
  {
    path: '',
    component: ChordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChordsPageRoutingModule {}
