import { Component, OnInit } from '@angular/core';
import { Form, FormService } from './form.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.less']
})
export class FormListComponent implements OnInit {

  forms: Form[] = [];

  constructor(
    private formService: FormService
  ) {}

  addForm() {
    this.formService.addForm({
      name: `Form #${this.forms.length + 1}`,
    })
  }

  ngOnInit() {
    this.formService.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

}
