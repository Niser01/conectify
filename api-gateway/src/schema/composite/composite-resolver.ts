import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import {SavedElement} from "./composite-type.js"


const URL = process.env.USERS_URL || "http://localhost:8080";


@Resolver(SavedElement)
export default class CompositeResolver {

    @Mutation(returns => String, { nullable: true })
    async createSavedElement(
      @Arg("IdUser") IdUser: number,
      @Arg("IdMessage") IdMessage: number,
    ){
      let message = await axios.post(URL + "/savedElement", {
        IdUser: IdUser,
        IdMessage: IdMessage,
      })
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not created" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }


}