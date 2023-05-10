import { Field, InputType } from "type-graphql";

@InputType()
export class NewTokenInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class NewUserCredentialsInput {
    @Field()
    token: string;
}

