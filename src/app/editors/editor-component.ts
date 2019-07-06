import { OnInit, Input } from '@angular/core';
import { ASTNode } from '../ast/ast-node/ast-node';
import { EditorFieldOptions } from './editor-decorator';

export abstract class EditorComponent implements OnInit {
    @Input() node: ASTNode;
    @Input() fields: EditorFieldOptions[];

    abstract ngOnInit(): void;
}
