var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";
let User = class User {
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], User.prototype, "ID", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "Names", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "LastNames", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], User.prototype, "PhotoId", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "EMail", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], User.prototype, "Status", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "PhoneNumber", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };
let SavedElement = class SavedElement {
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], SavedElement.prototype, "ID", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], SavedElement.prototype, "IDUser", void 0);
__decorate([
    Field(),
    __metadata("design:type", Number)
], SavedElement.prototype, "IDElement", void 0);
SavedElement = __decorate([
    ObjectType()
], SavedElement);
export { SavedElement };
