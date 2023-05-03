import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { User, SavedElement } from "./user-type.js";
import { url, port, entryPoint } from './user_server.js';

const URL = `http://localhost:${port}/${entryPoint}`;

@Resolver(User)
export default class UserResolver {
    @Query(returns => User)
    async userById(@Arg("id") id: string ) {
        let message = await axios.get(URL + "/id_read/"+id)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Message not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Query(returns => User)
    async userByEmail(@Arg("email") email: string ) {
        let message = await axios.get(URL + "/email_read/"+email)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Message not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Query(returns => User)
    async userByNames(@Arg("names") names: string ) {
        let message = await axios.get(URL + "/names_read/"+names)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Message not found" );
            }
            return response.data;
          });

          return message;
    }


    @Query(returns => User)
    async userByLastName(@Arg("lastNames") names: string ) {
        let message = await axios.get(URL + "/lastNames_read/"+names)
        .then(function (response) {
            if (response.status === 404) {  
              throw new Error("Message not found" );
            }
            return response.data;
          })  
          .catch(function (error) {
            console.log(error);
          });
          return message;
    }


    @Query(returns => User)
    async userByPhone(@Arg("phone") phone: string ) {
        let message = await axios.get(URL + "/phone_read/"+phone)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Message not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }








}


