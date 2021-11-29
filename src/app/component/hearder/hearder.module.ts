import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HearderComponent } from './hearder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [HearderComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [HearderComponent]
})
export class HearderModule { }
