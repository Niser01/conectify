import "reflect-metadata";
import { Field, ObjectType, ID, } from "type-graphql";

@ObjectType()
export  class Token {
    @Field()
    token: string;

    @Field()
    exp: string;
}

@ObjectType()
export class UserCredentials {
    @Field()
    id: string;

    @Field()
    email: string;
}