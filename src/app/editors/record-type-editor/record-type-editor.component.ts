import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordTypeService } from 'src/app/record-type.service';
import { switchMap, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RecordTypeDeclaration, RecordTypeField } from 'src/app/ast/data-type/record-type';
import { getFieldOptions } from '../editor-decorator';

@Component({
  selector: 'app-record-type-editor',
  templateUrl: './record-type-editor.component.html',
  styleUrls: ['./record-type-editor.component.less']
})
export class RecordTypeEditorComponent implements OnInit, OnDestroy {

  value: RecordTypeDeclaration;

  readonly columns = getFieldOptions(new RecordTypeField());

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordTypes: RecordTypeService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.recordTypes.get(params.get('id')))
    ).subscribe(value => {
      this.value = value;
    });

    this.recordTypes.getAll().pipe(
      filter(ts => !ts.includes(this.value)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addRecordField() {
    this.value.fields.push(new RecordTypeField());
    this.recordTypes.update(this.value);
  }

  updateRecordField() {
    this.recordTypes.update(this.value);
  }

  deleteRecordField(field: RecordTypeField) {
    const index = this.value.fields.findIndex(f => f === field);
    if (index > -1) {
      this.value.fields.splice(index, 1);
      this.recordTypes.update(this.value);
    }
  }

}
