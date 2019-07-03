import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDeclaration } from '../ast/task/task-declaration';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent {

  @Input() openTask: TaskDeclaration;

  constructor(
    private router: Router
  ) {}

  closeTab() {
    this.router.navigate(['']);
  }

}
