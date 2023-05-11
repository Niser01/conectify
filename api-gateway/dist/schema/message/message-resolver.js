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
import { Message, MessageAsThread } from "./message-type.js";
import NewMessageInput from "./message-input.js";
const URL = process.env.MESSAGES_URL || "http://localhost/api/messages";
let MessageResolver = class MessageResolver {
    async message(id) {
        let message = await axios.get(URL + "/" + id)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        this.transformToGraphql(message);
        return message;
    }
    async messageAsThread(id) {
        let message = await axios.get(URL + "/" + id + "/thread")
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < message.replies.length; i++) {
            this.transformToGraphql(message.replies[i]);
        }
        this.transformToGraphql(message);
        return message;
    }
    async messages() {
        let messages = await axios.get(URL)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
        }
        return messages;
    }
    async searchMessages(search) {
        let messages = await axios.get(URL + "/search?string=" + search)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
        }
        return messages;
    }
    //mutations to message queue is on consideration, would replace all axios calls for rabbitmq messages
    async createMessage(newMessageData) {
        let response = await axios.post(URL, newMessageData)
            .then(function (response) {
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
    }
    async editMessage(id, userId, content) {
        let response = await axios.put(URL + "/" + id, { userId: userId, content: content })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            else if (response.status === 403) {
                throw new Error("User not authorized");
            }
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
    }
    async reactToMessage(id, userId, reaction) {
        let response = await axios.put(URL + "/" + id + "/reactions", { userId: userId, reaction: reaction })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
    }
    async toggleMessageVisibility(id, userId) {
        let response = await axios.put(URL + "/" + id + "/visible", { userId: userId })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            else if (response.status === 403) {
                throw new Error("User not authorized");
            }
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
    }
    async deleteMessage(id, userId) {
        let response = await axios.delete(URL + "/" + id, { data: { userId: userId } })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            else if (response.status === 403) {
                throw new Error("User not authorized");
            }
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
    }
    async deleteFileFromMessage(id, userId, fileId) {
        let response = await axios.delete(URL + "/" + id + "/files/" + fileId, { data: { userId: userId } })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            else if (response.status === 403) {
                throw new Error("User not authorized");
            }
            return "ok";
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        return response;
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
    Query(returns => Message),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "message", null);
__decorate([
    Query(returns => MessageAsThread),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageAsThread", null);
__decorate([
    Query(returns => [Message]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messages", null);
__decorate([
    Query(returns => [Message]),
    __param(0, Arg("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "searchMessages", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("newMessageData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("userId")),
    __param(2, Arg("content")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "editMessage", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("userId")),
    __param(2, Arg("reaction")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "reactToMessage", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "toggleMessageVisibility", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("userId")),
    __param(2, Arg("fileId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteFileFromMessage", null);
MessageResolver = __decorate([
    Resolver(Message)
], MessageResolver);
export default MessageResolver;
