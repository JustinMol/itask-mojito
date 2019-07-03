export class Coordinates {

    constructor(public x: number, public y: number) {}

    add(other: Coordinates) {
        return new Coordinates(this.x + other.x, this.y + other.y);
    }

    multiply(other: Coordinates) {
        return new Coordinates(this.x * other.x, this.y * other.y);
    }

    scale(n: number) {
        return new Coordinates(this.x * n, this.y * n);
    }

    distance(other: Coordinates) {
        const a = Math.abs(this.x - other.x);
        const b = Math.abs(this.y - other.y);
        return Math.sqrt(a * a + b * b);
    }

    snap(gridSize: number) {
        const x = this.x - this.x % gridSize; // or Math.ceil(this.x / gridSize) * gridSize
        const y = this.y - this.y % gridSize; // or Math.ceil(this.y / gridSize) * gridSize
        return new Coordinates(x, y);
    }

    toString() {
        return this.x + ',' + this.y;
    }

}
