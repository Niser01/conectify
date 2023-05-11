var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { SavedElement, MessageId } from "./composite-type.js";
const URL = process.env.USERS_URL || "http://localhost:8080";
const URL1 = process.env.MESSAGES_URL || "http://localhost/api/messages";
let CompositeResolver = class CompositeResolver {
    async MessagebyId(id) {
        let message = await axios.get(URL1 + "/" + id)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async pushSavedElement(idUser) {
        let message = await axios.get(URL1 + "/" + idUser);
        let user = await axios.post(URL + "/savedElement", {
            IdUser: idUser,
            IdElement: message,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("SavedElement not created");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
    }
};
__decorate([
    Query(returns => MessageId),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompositeResolver.prototype, "MessagebyId", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("idUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompositeResolver.prototype, "pushSavedElement", null);
CompositeResolver = __decorate([
    Resolver(SavedElement)
], CompositeResolver);
export default CompositeResolver;
