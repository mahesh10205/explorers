import { ACA } from "./ACA";

interface ParameterConstructor<T> {
    new(argument:T): ACA;
}

export class ACACreator<T> {
    
    constructor(private creator: ParameterConstructor<T>) {

    }

    getNew(argument:T) {
        return new this.creator(argument);
    }
}