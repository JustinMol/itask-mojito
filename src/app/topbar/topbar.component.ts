import { Component, Input } from '@angular/core';
import { Task } from '../outline/task.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent {

  @Input() openTask: Task;

}
