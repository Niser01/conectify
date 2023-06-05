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
import { Field, ObjectType, InputType } from "type-graphql";
let event = class event {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "description", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "start", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "end", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "location", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], event.prototype, "allDay", void 0);
event = __decorate([
    ObjectType()
], event);
export { event };
let eventmessage = class eventmessage {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], eventmessage.prototype, "userId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], eventmessage.prototype, "content", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], eventmessage.prototype, "channelId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], eventmessage.prototype, "thread", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", Boolean)
], eventmessage.prototype, "visible", void 0);
__decorate([
    Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], eventmessage.prototype, "filesId", void 0);
eventmessage = __decorate([
    InputType()
], eventmessage);
export { eventmessage };
