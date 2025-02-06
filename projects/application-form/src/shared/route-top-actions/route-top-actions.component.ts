import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-route-top-actions',
  imports: [CommonModule,MatIconModule],
  templateUrl: './route-top-actions.component.html',
  styleUrl: './route-top-actions.component.scss'
})
export class RouteTopActionsComponent {

  @Input() noPrevious = false;
  @Input() noNext = false;
  @Output() clickNext = new EventEmitter<void>();
  @Output() clickBack = new EventEmitter<void>();

  constructor() { }
  
  onNextClick() {
    this.clickNext.emit();
  }

  onBackClick() {
    this.clickBack.emit();
  }
}
