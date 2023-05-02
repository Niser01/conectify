import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { User, SavedElement } from "./user-type.js";
import { url, port, entryPoint } from './user_server.js';

const URL = `http://${url}:${port}/${entryPoint}`;

@Resolver(User)
export default class UserResolver {
    @Query(returns => User)
    async userById(@Arg("id") id: number) {
        return await axios.get(`${URL}/users/id_read/${id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
    @Query(returns => User)
    async userByEmail(@Arg("email") email: string) {
        return await axios.get(`${URL}/users/email_read/${email}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
}








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