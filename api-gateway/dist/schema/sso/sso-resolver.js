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
import fetch from "node-fetch";
import { Token, UserCredentials } from "./sso-type.js";
import { URLSearchParams } from 'url';
const URL = process.env.SSO_URL || "http://172.21.0.1:3000";
let SSOResolver = class SSOResolver {
    async login(email, password) {
        var form = new URLSearchParams();
        form.append("email", email);
        form.append("password", password);
        var token = await fetch(URL + "/auth/login", {
            body: form,
            method: "post"
        })
            .then(function (response) {
            if (Math.floor(response.status / 200) !== 1) {
                throw new Error("User not authorized");
            }
            return response.json();
        })
            .catch(function (error) {
            console.log(error);
        });
        return token;
    }
    async register(email, password) {
        var form = new URLSearchParams();
        form.append("email", email);
        form.append("password", password);
        var user = await fetch(URL + "/users", {
            body: form,
            method: "post"
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("not found");
            }
            return response.json();
        })
            .catch(function (error) {
            console.log(error);
        });
        return user;
    }
};
__decorate([
    Query(returns => Token),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SSOResolver.prototype, "login", null);
__decorate([
    Mutation(returns => UserCredentials),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SSOResolver.prototype, "register", null);
SSOResolver = __decorate([
    Resolver(Token)
], SSOResolver);
export { SSOResolver };
