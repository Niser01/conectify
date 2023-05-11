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
import { File } from "./file-type.js";
import NewFileInput from "./file-input.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import FormData from "form-data";
import amqp from "amqplib/callback_api.js";
const URL = process.env.FILES_URL || "http://localhost:8080";
let FileResolver = class FileResolver {
    async getFilesByIds(fileInput) {
        if (fileInput.filesId == null) {
            throw new Error("Bad request. Channel id or files ids missing.");
        }
        let message = await axios({
            method: 'get',
            url: URL + "/files/",
            headers: {},
            data: fileInput.filesId
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
        return message;
    }
    async getFilesOfUser(fileInput) {
        let params = fileInput.filters != null && fileInput.filters != "" ? JSON.parse(fileInput.filters) : {};
        let message = await axios({
            method: 'get',
            url: URL + "/files/" + fileInput.userId,
            params: params,
            headers: {},
            data: fileInput.channelIds
        }).then(function (response) {
            if (response.status === 404) {
                throw new Error("Files not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
            return "Something went wrong.";
        });
        return message;
    }
    async uploadFile(userId, channelId, { createReadStream, filename, encoding, mimetype }) {
        const stream = createReadStream();
        const fileContents = (await streamToBuffer(stream));
        const form = new FormData();
        form.append("fileName", filename);
        let response = await axios.post(URL + "/file/" + userId + "/" + channelId, form, { headers: form.getHeaders() })
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
        amqp.connect('amqp://localhost', function (error0, connection) {
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
                        "filename": response.fileName,
                        "userId": userId,
                        "fileId": response.id,
                        "mimetype": mimetype,
                        "channelId": channelId
                    }
                };
                channel.assertQueue(queue, {
                    durable: true
                });
                channel.assertExchange(exchange, 'fanout', {
                    durable: true
                });
                channel.bindQueue(queue, exchange, '');
                // channel.publish(exchange,'', Buffer.from(msg), options);
                channel.publish(exchange, '', fileContents, options);
                console.log(" [x] Sent %s", msg);
            });
        });
        return response;
    }
    async uploadFileURL(userId, channelId, fileId, fileURL) {
        const form = new FormData();
        form.append("fileURL", fileURL);
        let response = await axios.post(URL + "/file/" + userId + "/" + channelId + "/" + fileId + "/", form, { headers: form.getHeaders() })
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
        return "OK";
    }
    async uploadFiles(userId, channelId, files) {
        let files_list = [];
        for (const file of files) {
            const { createReadStream, filename, mimetype } = await file;
            const stream = createReadStream();
            const fileContents = (await streamToBuffer(stream));
            const form = new FormData();
            form.append("fileName", filename);
            let response = await axios.post(URL + "/file/" + userId + "/" + channelId, form, { headers: form.getHeaders() })
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
            amqp.connect('amqp://localhost', function (error0, connection) {
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
                            "filename": response.fileName,
                            "userId": userId,
                            "fileId": response.id,
                            "mimetype": mimetype,
                            "channelId": channelId
                        }
                    };
                    channel.assertQueue(queue, {
                        durable: true
                    });
                    channel.assertExchange(exchange, 'fanout', {
                        durable: true
                    });
                    channel.bindQueue(queue, exchange, '');
                    // channel.publish(exchange,'', Buffer.from(msg), options);
                    channel.publish(exchange, '', fileContents, options);
                    console.log(" [x] Sent %s", msg);
                });
            });
            files_list.push(response);
        }
        // let response = await axios.post(URL + "/files/" + userId + "/" + channelId, form, {headers: form.getHeaders()})
        // .then(function (response) {
        //   if (response.status === 404) {
        //     throw new Error("File not found");
        //   } else if (response.status === 403) {
        //     throw new Error("User not authorized");
        //   }
        //   return response.data;
        // })
        // .catch(function (error) {
        //   console.log(error);
        //   return "error";
        // });
        return files_list;
    }
    async deleteFile(userId, fileId) {
        let response = await axios.delete(URL + "/file/" + userId, { params: { fileId: fileId } })
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
        return response;
    }
};
__decorate([
    Query(returns => [File]),
    __param(0, Arg("fileInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewFileInput]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "getFilesByIds", null);
__decorate([
    Query(returns => [File]),
    __param(0, Arg("fileInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewFileInput]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "getFilesOfUser", null);
__decorate([
    Mutation(() => File),
    __param(0, Arg("userId")),
    __param(1, Arg("channelId")),
    __param(2, Arg("file", () => GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "uploadFile", null);
__decorate([
    Mutation(() => String),
    __param(0, Arg("userId")),
    __param(1, Arg("channelId")),
    __param(2, Arg("fileId")),
    __param(3, Arg("fileURL")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "uploadFileURL", null);
__decorate([
    Mutation(() => [File]),
    __param(0, Arg("userId")),
    __param(1, Arg("channelId")),
    __param(2, Arg("files", () => [GraphQLUpload])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "uploadFiles", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("userId")),
    __param(1, Arg("fileId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "deleteFile", null);
FileResolver = __decorate([
    Resolver()
], FileResolver);
export default FileResolver;
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (data) => chunks.push(Buffer.from(data)));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (error) => reject(error));
    });
}
