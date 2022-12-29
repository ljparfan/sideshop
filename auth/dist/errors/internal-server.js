import CustomError from "./custom-error.js";
export default class InternalServerError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 500;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
//# sourceMappingURL=internal-server.js.map