import { Coordinates } from './coordinates';
import { Exclude, Type } from 'class-transformer';
import { AST } from '../ast';
import { EventEmitter } from '@angular/core';
import { EdgeConnector, defaultSequenceConnector } from '../edge/edge-connector';
import { Variable } from '../values/variable';
import { TaskService } from 'src/app/task/task.service';

export declare type Location = { line: number, col: number };

export const DEFAULT_ANCHORS: Coordinates[] = [
    new Coordinates(0.5, 0),
    new Coordinates(1, 0.5),
    new Coordinates(0.5, 1),
    new Coordinates(0, 0.5),
];

export const ANCHORS_SQUARE: Coordinates[] = [
    ...DEFAULT_ANCHORS,
    new Coordinates(0.01, 0.01),
    new Coordinates(0.01, 0.99),
    new Coordinates(0.99, 0.99),
    new Coordinates(0.99, 0.01),
]

export class ASTNode extends AST {
    @Type(() => Coordinates)
    coordinates: Coordinates;
    location?: Location;

    @Exclude()
    hasChanged: EventEmitter<void> = new EventEmitter();

    setCoordinates(coordinates: Coordinates) {
        if (!this.coordinates || this.coordinates.x !== coordinates.x || this.coordinates.y !== coordinates.y) {
            this.coordinates = coordinates;
            this.hasChanged.emit();
        }
    }

    getEdgeConnector(): EdgeConnector {
        return defaultSequenceConnector;
    };

    getInputs(): (string | Variable)[] {
        return [];
    }

    invalidateInput(input: string | Variable): void {}

    getOutput(): string | Variable {
        return null;
    }
}
