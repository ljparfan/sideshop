import CustomError from "./custom-error.js";
export default class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
//# sourceMappingURL=bad-request.js.map