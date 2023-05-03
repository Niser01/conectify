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
import { User, SavedElement } from "./user-type.js";
import { port } from './user_server.js';
const URL = `http://localhost:${port}/`;
let UserResolver = class UserResolver {
    async userCreate(Names, LastNames, PhotoId, EMail, Status, PhoneNumber) {
        let message = await axios.post(URL + "/users/create", {
            Names: Names,
            LastNames: LastNames,
            PhotoId: PhotoId,
            EMail: EMail,
            Status: Status,
            PhoneNumber: PhoneNumber,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User not created");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userById(id) {
        let message = await axios.get(URL + "/users/id_read/" + id)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Id not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userByEmail(email) {
        let message = await axios.get(URL + "/users/email_read/" + email)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Email not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userByNames(names) {
        let message = await axios.get(URL + "/users/names_read/" + names)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User name not found");
            }
            return response.data;
        });
        return message;
    }
    async userByLastName(names) {
        let message = await axios.get(URL + "/users/lastNames_read/" + names)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User's lastname not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userByPhone(phone) {
        let message = await axios.get(URL + "/users/phone_read/" + phone)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Phone not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userUpdate(Id, Names, LastNames, PhotoId, EMail, Status, PhoneNumber) {
        let message = await axios.put(URL + "/users/update/", {
            Names: Names,
            LastNames: LastNames,
            PhotoId: PhotoId,
            EMail: EMail,
            Status: Status,
            PhoneNumber: PhoneNumber,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User not updated");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userDelete(id) {
        let message = await axios.delete(URL + "/users/delete/" + id)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User not deleted");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async userEditStatus(Id, Status) {
        let message = await axios.put(URL + "/users/edit_status", {
            Id: Id,
            Status: Status,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User not updated");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async createSavedElement(IdUser, IdElement, IdType) {
        let message = await axios.post(URL + "/savedElement", {
            IdUser: IdUser,
            IdElement: IdElement,
            IdType: IdType,
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
    async getSavedElementById(idElement) {
        let message = await axios.get(URL + "/savedElement/" + idElement)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("SavedElement not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    async deleteSavedElement(idElement) {
        let message = await axios.delete(URL + "/savedElement/" + idElement)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("SavedElement not deleted");
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
    __param(0, Arg("Names")),
    __param(1, Arg("LastNames")),
    __param(2, Arg("PhotoId")),
    __param(3, Arg("EMail")),
    __param(4, Arg("Status")),
    __param(5, Arg("PhoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userCreate", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("eMail")),
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
    __param(0, Arg("phoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByPhone", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Id")),
    __param(1, Arg("Names")),
    __param(2, Arg("LastNames")),
    __param(3, Arg("PhotoId")),
    __param(4, Arg("EMail")),
    __param(5, Arg("Status")),
    __param(6, Arg("PhoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userUpdate", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userDelete", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Id")),
    __param(1, Arg("Status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userEditStatus", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("IdUser")),
    __param(1, Arg("IdElement")),
    __param(2, Arg("IdType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createSavedElement", null);
__decorate([
    Query(returns => SavedElement),
    __param(0, Arg("idElement")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getSavedElementById", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("idElement")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteSavedElement", null);
UserResolver = __decorate([
    Resolver(User)
], UserResolver);
export default UserResolver;
