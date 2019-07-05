import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { Field } from '../editor-decorator';
import { ASTService } from 'src/app/ast/ast.service';
import { UserInputDeclaration } from 'src/app/ast/sources/user-input';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.less']
})
export class SimpleEditorComponent extends EditorComponent {

  constructor(protected ast: ASTService) {
    super();
  }

  ngOnInit(): void {
    console.log((this.node as UserInputDeclaration).type);
    // this.fields[2].options$.subscribe(options => {
    //   console.log('got sum options', options);
    //   console.log('current value is', this.fields[2].value);
    //   options.forEach(o => {
    //     console.log(o === this.fields[2].value);
    //   })
    // })
  }

  onValueChange(field: Field) {
    this.node[field.property] = field.value;
    this.ast.save();
    console.log((this.node as UserInputDeclaration).type);
  }
}
