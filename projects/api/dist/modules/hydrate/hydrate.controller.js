"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrateController = void 0;
const common_1 = require("@nestjs/common");
const hydrate_service_1 = require("./hydrate.service");
let HydrateController = class HydrateController {
    constructor(hydrateService) {
        this.hydrateService = hydrateService;
    }
    stopHydrating() {
        return this.hydrateService.stopHydrating();
    }
    startHydrating() {
        return this.hydrateService.startHydrating();
    }
    hydrationReport() {
        return this.hydrateService.report();
    }
};
__decorate([
    common_1.Get('stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HydrateController.prototype, "stopHydrating", null);
__decorate([
    common_1.Get('start'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HydrateController.prototype, "startHydrating", null);
__decorate([
    common_1.Get('report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HydrateController.prototype, "hydrationReport", null);
HydrateController = __decorate([
    common_1.Controller('hydrate'),
    __metadata("design:paramtypes", [hydrate_service_1.HydrateService])
], HydrateController);
exports.HydrateController = HydrateController;
//# sourceMappingURL=hydrate.controller.js.map