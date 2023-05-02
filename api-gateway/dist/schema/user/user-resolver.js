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
import { url, port, entryPoint } from './user_server.js';
const URL = `http://${url}:${port}/${entryPoint}`;
let UserResolver = class UserResolver {
    async userById(id) {
        return await axios.get(`${URL}/users/id_read/${id}`)
            .then(res => res.data)
            .catch(err => console.log(err));
    }
    async userByEmail(email) {
        return await axios.get(`${URL}/users/email_read/${email}`)
            .then(res => res.data)
            .catch(err => console.log(err));
    }
};
__decorate([
    Query(returns => User),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userById", null);
__decorate([
    Query(returns => User),
    __param(0, Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userByEmail", null);
UserResolver = __decorate([
    Resolver(User)
], UserResolver);
export default UserResolver;
/*

const resolvers = {
    Query: {
        userById:(_, {id}) => {
            return axios.get(`${URL}/users/id_read/${id}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        userByEmail:(_, {email}) => {
            return axios.get(`${URL}/users/email_read/${email}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        userByPhone:(_, {phone}) => {
            return axios.get(`${URL}/users/phone_read/${phone}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        userByName:(_, {name}) => {
            return axios.get(`${URL}/users/name_read/${name}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        userByLastname:(_, {lastname}) => {
            return axios.get(`${URL}/users/lastname_read/${lastname}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        savedElementById:(_, {id}) => {
            return axios.get(`${URL}/savedElement/id_read/${id}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        }
    },
    Mutation: {
        createUser: (_, {user}) => {
            return axios.post(`${URL}/users/create`, user)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        updateUser: (_, {id, user}) => {
            return axios.put(`${URL}/users/update/${id}`, user)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        editStatus: (_, {id, status}) => {
            return axios.put(`${URL}/users/editStatus/${id}`, status)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        deleteUser: (_, {id}) => {
            return axios.delete(`${URL}/users/delete/${id}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        createSavedElement: (_, {savedElement}) => {
            return axios.post(`${URL}/savedElement/create`, savedElement)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        deleteSavedElement: (_, {id}) => {
            return axios.delete(`${URL}/savedElement/delete/${id}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        deleteAllSavedElements: (_, {id}) => {
            return axios.delete(`${URL}/savedElement/delete_all/${id}`)
                .then(res => res.data)
                .catch(err => console.log(err))
        }
    }
};

export default resolvers;

*/ 
