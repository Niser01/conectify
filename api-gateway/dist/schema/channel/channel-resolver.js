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
import Channel from "./channel-type.js";
const URL = process.env.CHANNELS_URL || "http://localhost:8080/channels";
let ChannelResolver = class ChannelResolver {
    async channeById(id) {
        let channel = await axios.get(URL + "/" + id)
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Message not found");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return channel;
    }
    async channels() {
        let channels = await axios.get(URL)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return channels;
    }
    async searchChannel(search) {
        let channel = await axios.get(URL + "/search/" + search)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return channel;
    }
    async createChannel(channelName, description, members, files, messages, admins) {
        let message = await axios.post(URL, {
            channelName: channelName,
            description: description,
            members: members,
            files: files,
            messages: messages,
            admins: admins,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Channel could not be created");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async updateChannel(id, channelName, description, members, files, messages, admins) {
        let message = await axios.put(URL + "/" + id, {
            channelName: channelName,
            description: description,
            members: members,
            files: files,
            messages: messages,
            admins: admins,
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Channel could not be created");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async deleteChannel(id, user_id) {
        let message = await axios.delete(URL + "/" + id, {
            data: {
                user_id: user_id
            }
        })
            .then(function (response) {
            if (response.status === 404) {
                throw new Error("Channel could not be deleted");
            }
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return message;
    }
    async addMemberToChannel(id, member_id) {
        let message = await axios.put(URL + "/" + id + "/members/add/" + member_id)
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
    async removeMemberFromChannel(id, member_id) {
        let message = await axios.put(URL + "/" + id + "/members/remove/" + member_id)
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
    async getMembers(channel_id) {
        let members = await axios.get(URL + channel_id + "/members")
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return members;
    }
};
__decorate([
    Query(returns => Channel),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channeById", null);
__decorate([
    Query(returns => [Channel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channels", null);
__decorate([
    Query(returns => [Channel]),
    __param(0, Arg("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "searchChannel", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("channelName")),
    __param(1, Arg("description")),
    __param(2, Arg("members")),
    __param(3, Arg("files")),
    __param(4, Arg("messages")),
    __param(5, Arg("admins")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "createChannel", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("channelName")),
    __param(2, Arg("description")),
    __param(3, Arg("members")),
    __param(4, Arg("files")),
    __param(5, Arg("messages")),
    __param(6, Arg("admins")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "updateChannel", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("user_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "deleteChannel", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("member_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "addMemberToChannel", null);
__decorate([
    Mutation(returns => String, { nullable: true }),
    __param(0, Arg("id")),
    __param(1, Arg("member_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "removeMemberFromChannel", null);
__decorate([
    Query(returns => [Number]),
    __param(0, Arg("channel_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "getMembers", null);
ChannelResolver = __decorate([
    Resolver(Channel)
], ChannelResolver);
export default ChannelResolver;
