import { ASTNode } from '../ast/ast';
import { OnInit } from '@angular/core';

export abstract class EditorComponent implements OnInit {
    node: ASTNode;

    abstract ngOnInit(): void;
}
