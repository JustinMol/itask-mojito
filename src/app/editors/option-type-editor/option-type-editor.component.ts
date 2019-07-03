import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionTypeService } from 'src/app/option-type.service';
import { switchMap, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OptionTypeDeclaration, OptionDeclaration } from 'src/app/ast/data-type/option-type';

@Component({
  selector: 'app-option-type-editor',
  templateUrl: './option-type-editor.component.html',
  styleUrls: ['./option-type-editor.component.less']
})
export class OptionTypeEditorComponent implements OnInit, OnDestroy {

  type: OptionTypeDeclaration;

  readonly columns = Object.getOwnPropertyNames(new OptionDeclaration());

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private optionTypes: OptionTypeService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.optionTypes.get(params.get('id')))
    ).subscribe(type => {
      this.type = type;
    });

    this.optionTypes.getAll().pipe(
      filter(ts => !ts.includes(this.type)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addOption() {
    this.type.options.push(new OptionDeclaration());
    this.optionTypes.update(this.type);
  }

  updateOption() {
    this.optionTypes.update(this.type);
  }

  deleteOption(option: OptionDeclaration) {
    const index = this.type.options.findIndex(o => o === option);
    if (index > -1) {
      this.type.options.splice(index, 1);
      this.optionTypes.update(this.type);
    }
  }

}
