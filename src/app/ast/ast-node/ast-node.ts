import { Coordinates } from './coordinates';
import { Exclude, Type } from 'class-transformer';
import { AST } from '../ast';
import { EventEmitter } from '@angular/core';

export declare type Location = { line: number, col: number };

export const ANCHORS: Coordinates[] = [
    new Coordinates(0.5, 0),
    new Coordinates(1, 0.5),
    new Coordinates(0.5, 1),
    new Coordinates(0, 0.5),
];

export abstract class ASTNode extends AST {
    @Type(() => Coordinates)
    coordinates: Coordinates;
    location?: Location;

    @Exclude()
    isMoved$: EventEmitter<void> = new EventEmitter();

    setCoordinates(coordinates: Coordinates) {
        if (!this.coordinates || this.coordinates.x !== coordinates.x || this.coordinates.y !== coordinates.y) {
            this.coordinates = coordinates;
            this.isMoved$.emit();
        }
    }
}
