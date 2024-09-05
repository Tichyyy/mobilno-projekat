import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChordsPageRoutingModule } from './chords-routing.module';

import { ChordsPage } from './chords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChordsPageRoutingModule
  ],
  declarations: [ChordsPage]
})
export class ChordsPageModule {}
