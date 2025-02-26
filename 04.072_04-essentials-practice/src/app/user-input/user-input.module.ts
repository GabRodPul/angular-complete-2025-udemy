import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputComponent } from './user-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserInputComponent]
})
export class UserInputModule { }
