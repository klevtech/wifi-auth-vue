interface IErrors {
    name: string;
    stack?: any;
    code: string;
    data: any
}

export class RequestError extends Error implements IErrors {
    data: any;
    code: string;

    constructor({ message = '', code = '', data = {} }: { message?: string, code?: string, data?: any }) {
        super(message);
        this.name = this.constructor.name;
        this.stack = new Error(message).stack;
        this.code = code || 'unknown';
        this.data = data || {};
    }
}
