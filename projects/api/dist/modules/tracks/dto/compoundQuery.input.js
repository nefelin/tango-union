"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundSortInput = exports.PaginationInput = exports.CompoundQueryInput = void 0;
const eager_import_0 = require("./compoundQuery.input");
const graphql_1 = require("@nestjs/graphql");
let CompoundQueryInput = class CompoundQueryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { sort: { nullable: true, type: () => require("./compoundQuery.input").CompoundSortInput }, pagination: { nullable: true, type: () => require("./compoundQuery.input").PaginationInput }, text: { nullable: true, type: () => String }, orchestras: { nullable: true, type: () => [String] }, singers: { nullable: true, type: () => [String] }, titles: { nullable: true, type: () => [String] }, genres: { nullable: true, type: () => [String] } };
    }
};
CompoundQueryInput = __decorate([
    graphql_1.InputType()
], CompoundQueryInput);
exports.CompoundQueryInput = CompoundQueryInput;
let PaginationInput = class PaginationInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { limit: { nullable: false, type: () => Number }, offset: { nullable: false, type: () => Number } };
    }
};
PaginationInput = __decorate([
    graphql_1.InputType()
], PaginationInput);
exports.PaginationInput = PaginationInput;
let CompoundSortInput = class CompoundSortInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { singer: { nullable: true, type: () => Number }, orchestra: { nullable: true, type: () => Number }, genre: { nullable: true, type: () => Number }, year: { nullable: true, type: () => Number }, title: { nullable: true, type: () => Number }, secondsLong: { nullable: true, type: () => Number } };
    }
};
CompoundSortInput = __decorate([
    graphql_1.InputType()
], CompoundSortInput);
exports.CompoundSortInput = CompoundSortInput;
//# sourceMappingURL=compoundQuery.input.js.map