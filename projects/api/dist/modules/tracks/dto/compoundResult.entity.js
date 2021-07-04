"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectIndexCount = exports.CountTuple = exports.CompoundResults = void 0;
const eager_import_0 = require("./compoundResult.entity");
const graphql_1 = require("@nestjs/graphql");
let CompoundResults = class CompoundResults {
    static _GRAPHQL_METADATA_FACTORY() {
        return { ids: { nullable: false, type: () => [Number] }, totalResults: { nullable: false, type: () => Number }, counts: { nullable: false, type: () => require("./compoundResult.entity").SelectIndexCount } };
    }
};
CompoundResults = __decorate([
    graphql_1.ObjectType()
], CompoundResults);
exports.CompoundResults = CompoundResults;
let CountTuple = class CountTuple {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { nullable: false, type: () => String }, count: { nullable: false, type: () => Number } };
    }
};
CountTuple = __decorate([
    graphql_1.ObjectType()
], CountTuple);
exports.CountTuple = CountTuple;
let SelectIndexCount = class SelectIndexCount {
    static _GRAPHQL_METADATA_FACTORY() {
        return { singer: { nullable: false, type: () => [require("./compoundResult.entity").CountTuple] }, orchestra: { nullable: false, type: () => [require("./compoundResult.entity").CountTuple] }, genre: { nullable: false, type: () => [require("./compoundResult.entity").CountTuple] } };
    }
};
SelectIndexCount = __decorate([
    graphql_1.ObjectType()
], SelectIndexCount);
exports.SelectIndexCount = SelectIndexCount;
//# sourceMappingURL=compoundResult.entity.js.map