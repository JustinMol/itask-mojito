import { Component, Input } from '@angular/core';
import { Task } from '../task/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent {

  @Input() openTask: Task;

  constructor(
    private router: Router
  ) {}

  closeTab() {
    this.router.navigate(['']);
  }

}
