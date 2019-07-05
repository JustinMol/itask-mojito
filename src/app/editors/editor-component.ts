import { OnInit, Input } from '@angular/core';
import { ASTNode } from '../ast/ast-node/ast-node';
import { Field } from './editor-decorator';

export abstract class EditorComponent implements OnInit {
    @Input() node: ASTNode;
    @Input() fields: Field[];

    abstract ngOnInit(): void;
}
