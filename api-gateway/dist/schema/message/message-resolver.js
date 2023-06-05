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
import { PlainMessage, Message, MessageAsThread } from "./message-type.js";
import NewMessageInput from "./message-input.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import FormData from "form-data";
import amqp from "amqplib/callback_api.js";
const URL = process.env.MESSAGES_URL || "http://localhost/api/messages";
const filesURL = process.env.FILES_URL || "http://localhost:8080";
const mqURL = process.env.MQ_URL || 'amqp://localhost';
const USERS_URL = process.env.USERS_URL || "http://localhost:8080";
const CHANNELS_URL = process.env.CHANNELS_URL || "http://localhost:8080/channels";
let MessageResolver = class MessageResolver {
    async plainMessage(id) {
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
        this.getFiles(message);
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
            this.getFiles(message.replies[i]);
        }
        this.transformToGraphql(message);
        this.getFiles(message);
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
            this.getFiles(messages[i]);
        }
        return messages;
    }
    async userRecentMessages(userId, limit) {
        const count = limit ? limit : "10";
        let messages = await axios.get(URL + "/user/" + userId + "?limit=" + count)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
            this.getFiles(messages[i]);
            this.getUserName(messages[i]);
            this.getChannelName(messages[i]);
        }
        return messages;
    }
    async channelLastMessages(channelId, limit) {
        const count = limit ? limit : "10";
        let messages = await axios.get(URL + "/channel/" + channelId + "?limit=" + count)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
            this.getFiles(messages[i]);
        }
        return messages;
    }
    async channelUpdates(channelId, lastUpdate) {
        let messages = await axios.get(URL + "/channel/" + channelId + "/updates?lastUpdate=" + lastUpdate)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
            this.transformToGraphql(messages[i]);
            this.getFiles(messages[i]);
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
            this.getFiles(messages[i]);
        }
        return messages;
    }
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
    async createMessageAndUploadFile(newMessageData, { createReadStream, filename, encoding, mimetype }) {
        const stream = createReadStream();
        const fileContents = (await streamToBuffer(stream));
        const form = new FormData();
        form.append("fileName", filename);
        console.log("creating file reference in files service");
        let files_response = await axios.post(filesURL + "/file/" + newMessageData.userId + "/" + newMessageData.channelId, form, { headers: form.getHeaders() })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("File not found");
            }
            else if (response.status === 403) {
                throw new Error("User not authorized");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
            return "error";
        });
        console.log("sending file to files service through rabbitmq");
        amqp.connect(mqURL, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = "filesQ";
                var exchange = "filesExchange";
                var msg = 'Hello World!';
                var options = {
                    contentType: "multipart/form-data",
                    persistent: true,
                    headers: {
                        "filename": files_response.fileName,
                        "userId": newMessageData.userId,
                        "fileId": files_response.id,
                        "mimetype": mimetype,
                        "channelId": newMessageData.channelId
                    }
                };
                // channel.assertQueue(queue, {
                //   durable: true
                // });
                channel.assertExchange(exchange, 'fanout', {
                    durable: true
                });
                // channel.bindQueue(queue, exchange, '');
                // channel.publish(exchange,'', Buffer.from(msg), options);
                channel.publish(exchange, '', fileContents, options);
                console.log(" [x] Sent %s", msg);
            });
        });
        console.log('files service response');
        console.log(files_response);
        console.log(files_response.id);
        console.log('updating new message data and sending to messages service');
        newMessageData.filesId = [files_response.id];
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
    getFiles(message) {
        if (!message.filesId) {
            return;
        }
        let files = axios({
            method: 'get',
            url: filesURL + "/files/",
            headers: {},
            data: message.filesId
        }).then(function (response) {
            if (response.status === 404) {
                throw new Error("File not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
            return "Something went wrong.";
        });
        message.files = files;
    }
    getUserName(message) {
        let name = axios.get(USERS_URL + "/users/id_read/" + message.userId)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Id not found");
            }
            return response.data.Names + " " + response.data.LastNames;
        })
            .catch(function (error) {
            console.log(error);
        });
        message.userName = name;
    }
    getChannelName(message) {
        let channelName = axios.get(CHANNELS_URL + "/" + message.channelId)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Channel not found");
            }
            return response.data.name;
        })
            .catch(function (error) {
            console.log(error);
            return "error getting channel name";
        });
        message.channelName = channelName;
    }
};
__decorate([
    Query(returns => PlainMessage),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "plainMessage", null);
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
    __param(0, Arg("userId")),
    __param(1, Arg("limit", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "userRecentMessages", null);
__decorate([
    Query(returns => [Message]),
    __param(0, Arg("channelId")),
    __param(1, Arg("limit", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "channelLastMessages", null);
__decorate([
    Query(returns => [Message]),
    __param(0, Arg("channelId")),
    __param(1, Arg("lastUpdate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "channelUpdates", null);
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
    __param(0, Arg("newMessageData")),
    __param(1, Arg("file", () => GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewMessageInput, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessageAndUploadFile", null);
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
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (data) => chunks.push(Buffer.from(data)));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (error) => reject(error));
    });
}
