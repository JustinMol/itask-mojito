export interface iTaskGeneratable<T> {
    toCode(t: T): string;
    fromCode(code: string): T;
}
