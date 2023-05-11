import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import {SavedElement,MessageId} from "./composite-type.js"
import MessagebyId from "../message/message-resolver.js"

const URL = process.env.USERS_URL || "http://localhost:8080";
const URL1 = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(SavedElement)
export default class CompositeResolver {


    @Query(returns => MessageId)
    async MessagebyId(@Arg("id") id: string) {
      let message = await axios.get(URL1 + "/" + id)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("Message not found");
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      return message;
    }

    @Mutation(returns => String,{nullable:true})
    async pushSavedElement(
        @Arg("idUser") idUser:number,
    ){
        let message = await axios.get(URL1 + "/" + idUser)
        let user = await axios.post(URL + "/savedElement", {
            IdUser: idUser,
            IdElement: message,
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