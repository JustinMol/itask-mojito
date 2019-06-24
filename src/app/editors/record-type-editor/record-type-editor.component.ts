import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordTypeService } from 'src/app/record-type.service';
import { switchMap, filter, takeUntil } from 'rxjs/operators';
import { RecordTypeDeclaration, RecordTypeField } from 'src/app/ast/ast';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-record-type-editor',
  templateUrl: './record-type-editor.component.html',
  styleUrls: ['./record-type-editor.component.less']
})
export class RecordTypeEditorComponent implements OnInit, OnDestroy {

  type: RecordTypeDeclaration;

  readonly columns = Object.getOwnPropertyNames(new RecordTypeField());

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordTypes: RecordTypeService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.recordTypes.get(params.get('id')))
    ).subscribe(type => {
      this.type = type;
    });

    this.recordTypes.getAll().pipe(
      filter(ts => !ts.includes(this.type)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addRecordField() {
    this.type.fields.push(new RecordTypeField());
    this.recordTypes.update(this.type);
  }

  updateRecordField() {
    this.recordTypes.update(this.type);
  }

  deleteRecordField(field: RecordTypeField) {
    const index = this.type.fields.findIndex(f => f === field);
    if (index > -1) {
      this.type.fields.splice(index, 1);
      this.recordTypes.update(this.type);
    }
  }

}
