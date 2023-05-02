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
let Message = class Message {
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], Message.prototype, "_id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Message.prototype, "userId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], Message.prototype, "edited", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Message.prototype, "channelId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "thread", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], Message.prototype, "visible", void 0);
__decorate([
    Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], Message.prototype, "replies", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "reactions", void 0);
__decorate([
    Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], Message.prototype, "filesId", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Message.prototype, "updated_at", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Message.prototype, "created_at", void 0);
Message = __decorate([
    ObjectType()
], Message);
export { Message };
let MessageAsThread = class MessageAsThread {
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], MessageAsThread.prototype, "_id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], MessageAsThread.prototype, "userId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], MessageAsThread.prototype, "content", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], MessageAsThread.prototype, "edited", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], MessageAsThread.prototype, "channelId", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], MessageAsThread.prototype, "thread", void 0);
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], MessageAsThread.prototype, "visible", void 0);
__decorate([
    Field(type => [Message], { nullable: true }),
    __metadata("design:type", Array)
], MessageAsThread.prototype, "replies", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], MessageAsThread.prototype, "reactions", void 0);
__decorate([
    Field(type => [String], { nullable: true }),
    __metadata("design:type", Array)
], MessageAsThread.prototype, "filesId", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], MessageAsThread.prototype, "updated_at", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], MessageAsThread.prototype, "created_at", void 0);
MessageAsThread = __decorate([
    ObjectType()
], MessageAsThread);
export { MessageAsThread };
