import { OnInit } from '@angular/core';
import { ASTNode } from '../ast/ast-node/ast-node';

export abstract class EditorComponent implements OnInit {
    node: ASTNode;

    abstract ngOnInit(): void;
}
