"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (_, __, next) => {
    console.log('Request!');
    next();
};
exports.logger = logger;
//# sourceMappingURL=logging.middleware.js.map