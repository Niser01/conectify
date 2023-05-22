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
import { User, UserId, SavedElement } from "./user-type.js";
const URL = process.env.USERS_URL || "http://localhost:8080";
const URLMessages = process.env.MESSAGES_URL || "http://localhost/api/messages";
let UserResolver = class UserResolver {
    async Create_User(Names, LastNames, PhotoId, EMail, Status, PhoneNumber, SSO_UserId) {
        let message = await axios.post(URL + "/users/create", {
            Names: Names,
            LastNames: LastNames,
            PhotoId: PhotoId,
            EMail: EMail,
            Status: Status,
            PhoneNumber: PhoneNumber,
            SSO_UserId: SSO_UserId,
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
    async Read_userByid(id) {
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
    async Read_userByemail(email) {
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
    async Read_idByemail(email) {
        let message = await axios.get(URL + "/users/id_by_email/" + email)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Id not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        console.log(message);
        return message;
    }
    async Read_userByname(names) {
        let message = await axios.get(URL + "/users/name_read/" + names)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("User name not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Read_userBylastname(lastNames) {
        let message = await axios.get(URL + "/users/lastname_read/" + lastNames)
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
    async Read_userBypnumber(phone) {
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
    async Read_idBySSOId(SSO_UserId) {
        let message = await axios.get(URL + "/users/id_by_sso/" + SSO_UserId)
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
    async Update_photoId(Id, PhotoId) {
        let message = await axios.put(URL + "/users/update_photo", {
            Id: Id,
            PhotoId: PhotoId
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Photo not updated");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Update_userByid(Names, LastNames, PhotoId, EMail, Status, PhoneNumber, SSO_UserId, Id) {
        let message = await axios.put(URL + "/users/update", {
            Names: Names,
            LastNames: LastNames,
            PhotoId: PhotoId,
            EMail: EMail,
            Status: Status,
            PhoneNumber: PhoneNumber,
            SSO_UserId: SSO_UserId,
            Id: Id,
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
    async Delete_userByid(Id) {
        let message = await axios.delete(URL + "/users/delete", {
            data: {
                Id: Id
            }
        })
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
    async Edit_statusByid(Id, Status) {
        let message = await axios.put(URL + "/users/edit_status", {
            Id: Id,
            Status: Status,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Status not updated");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Create_savedElement(IdUser, IdElement) {
        let messages = await axios.get(URLMessages)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
        }
        let message = await axios.post(URL + "/savedElement/create", {
            IdUser: IdUser,
            IdElement: messages._id,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Saved element not created");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Read_savedElements(idUser) {
        let message = await axios.get(URL + "/savedElement/id_read/" + idUser)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Saved Element not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Delete_savedElement(IdElement) {
        let message = await axios.delete(URL + "/savedElement/delete", {
            data: {
                IdElement: IdElement
            }
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("SavedElement not deleted");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async Delete_allsavedElements(IdUser) {
        let message = await axios.delete(URL + "/savedElement/delete_all", {
            data: {
                IdUser: IdUser
            }
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("SavedElement not deleted");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    transformToGraphql(message) {
        if (Array.isArray(message.reactions)) {
            message.reactions = '{' + message.reactions.toString() + '}';
        }
        else {
            message.reactions = JSON.stringify(message.reactions);
        }
        message.created_at = new Date(message.created_at);
        message.updated_at = new Date(message.updated_at);
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
    __param(6, Arg("SSO_UserId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Create_User", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_userByid", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("eMail")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_userByemail", null);
__decorate([
    Query(returns => [UserId]),
    __param(0, Arg("eMail")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_idByemail", null);
__decorate([
    Query(returns => [User]),
    __param(0, Arg("names")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_userByname", null);
__decorate([
    Query(returns => [User]),
    __param(0, Arg("lastNames")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_userBylastname", null);
__decorate([
    Query(returns => [User]),
    __param(0, Arg("phoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_userBypnumber", null);
__decorate([
    Query(returns => [UserId]),
    __param(0, Arg("SSO_UserId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_idBySSOId", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Id")),
    __param(1, Arg("PhotoId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Update_photoId", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Names")),
    __param(1, Arg("LastNames")),
    __param(2, Arg("PhotoId")),
    __param(3, Arg("EMail")),
    __param(4, Arg("Status")),
    __param(5, Arg("PhoneNumber")),
    __param(6, Arg("SSO_UserId")),
    __param(7, Arg("Id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Update_userByid", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Delete_userByid", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("Id")),
    __param(1, Arg("Status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Edit_statusByid", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("IdUser")),
    __param(1, Arg("IdElement")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Create_savedElement", null);
__decorate([
    Query(returns => [SavedElement]),
    __param(0, Arg("idUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Read_savedElements", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("IdElement")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Delete_savedElement", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("IdUser")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Delete_allsavedElements", null);
UserResolver = __decorate([
    Resolver(User)
], UserResolver);
export default UserResolver;
