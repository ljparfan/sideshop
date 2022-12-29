import CustomError from "./custom-error.js";
export default class NotAuthorizedError extends CustomError {
    constructor() {
        super();
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not authorized" }];
    }
}
//# sourceMappingURL=not-authorized.js.map