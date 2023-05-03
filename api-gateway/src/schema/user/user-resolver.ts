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








}


