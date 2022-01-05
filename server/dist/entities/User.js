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
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const Draft_1 = require("./Draft");
let User = class User {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.drafts = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    core_1.Property({ type: "date" }),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ type: "date", onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    core_1.Property({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    core_1.Property({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    core_1.Property({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    core_1.OneToMany(() => Draft_1.Draft, (draft) => draft.user, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "drafts", void 0);
__decorate([
    core_1.Property({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "trophies", void 0);
User = __decorate([
    core_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map