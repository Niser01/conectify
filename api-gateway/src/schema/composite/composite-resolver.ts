import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import MessageResolver from "../message/message-resolver"
import createSavedElement from "../user/user-resolver"
import {SavedElement} from "./composite-type"

const URL1 = process.env.USERS_URL || "http://localhost:8080";
const URL2 = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(SavedElement)
export default class CompositeResolver {

    @Mutation(returns => String,{nullable:true})
    async pushSavedElement(
        @Arg("idUser") idUser:number,
        @Arg("idElement") idElement: number,
    ){
        idElement: MessageResolver
    }


}