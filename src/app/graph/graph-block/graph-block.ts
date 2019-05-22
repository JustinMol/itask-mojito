import { Type } from '@angular/core';

export class GraphBlock {
    type: string;
    name: string;
    svg: string;
    description?: string;
    component?: Type<any>;
}
