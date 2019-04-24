import { iTaskGeneratable } from './itask-generatable';

export class UserInput implements iTaskGeneratable<UserInput> {
    toCode(t: UserInput): string {
        throw new Error("Method not implemented.");
    }

    fromCode(code: string): UserInput {
        throw new Error("Method not implemented.");
    }
}
