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
import { Resolver, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { SavedElement } from "./composite-type.js";
const URL = process.env.USERS_URL || "http://localhost:8080";
let CompositeResolver = class CompositeResolver {
    async createSavedElement(IdUser, IdMessage) {
        let message = await axios.post(URL + "/savedElement", {
            IdUser: IdUser,
            IdMessage: IdMessage,
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
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("IdUser")),
    __param(1, Arg("IdMessage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CompositeResolver.prototype, "createSavedElement", null);
CompositeResolver = __decorate([
    Resolver(SavedElement)
], CompositeResolver);
export default CompositeResolver;
