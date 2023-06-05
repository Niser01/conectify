var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, InputType } from "type-graphql";
let NewTokenInput = class NewTokenInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], NewTokenInput.prototype, "email", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], NewTokenInput.prototype, "password", void 0);
NewTokenInput = __decorate([
    InputType()
], NewTokenInput);
export { NewTokenInput };
let NewUserInput = class NewUserInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], NewUserInput.prototype, "email", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], NewUserInput.prototype, "password", void 0);
NewUserInput = __decorate([
    InputType()
], NewUserInput);
export { NewUserInput };
let NewUserCredentialsInput = class NewUserCredentialsInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], NewUserCredentialsInput.prototype, "token", void 0);
NewUserCredentialsInput = __decorate([
    InputType()
], NewUserCredentialsInput);
export { NewUserCredentialsInput };
