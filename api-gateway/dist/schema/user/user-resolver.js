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
import { Resolver, Query, Arg } from "type-graphql";
import axios from "axios";
import { User } from "./user-type.js";
import { port, entryPoint } from './user_server.js';
const URL = `http://localhost:${port}/${entryPoint}`;
let UserResolver = class UserResolver {
    async userById(id) {
        let message = await axios.get(URL + "/id_read/" + id)
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
    async userByEmail(email) {
        let message = await axios.get(URL + "/email_read/" + email)
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
    async userByNames(names) {
        let message = await axios.get(URL + "/names_read/" + names)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return response.data;
        });
        return message;
    }
    async userByLastName(names) {
        let message = await axios.get(URL + "/lastNames_read/" + names)
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
    async userByPhone(phone) {
        let message = await axios.get(URL + "/phone_read/" + phone)
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
};
__decorate([
    Query(returns => User),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByEmail", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("names")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByNames", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("lastNames")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByLastName", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("phone")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByPhone", null);
UserResolver = __decorate([
    Resolver(User)
], UserResolver);
export default UserResolver;
