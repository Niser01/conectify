import { Resolver, Query, Arg, Mutation } from "type-graphql";
import fetch, { Headers, RequestInit } from "node-fetch";
import { Token, UserCredentials } from "./sso-type.js";
import FormData from "form-data";
import { URLSearchParams } from 'url';

const URL = process.env.SSO_URL || "http://172.21.0.1:3000";

@Resolver(Token)
export class SSOResolver {
  @Query(returns => Token)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    var form = new URLSearchParams();
    form.append("email", email);
    form.append("password", password);
    var token = await fetch( URL + "/auth/login",
                                {
                                  body: form,
                                  method: "post"
                                }
    )
    .then(function (response) {
      if (Math.floor(response.status/200) !== 1) {
        throw new Error("User not authorized");
      }
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    })
    return token;
  }

  @Mutation(returns => UserCredentials)
  async register(@Arg("email") email: string, @Arg("password") password: string) {
    var form = new URLSearchParams();
    form.append("email", email);
    form.append("password", password);
    var user = await fetch( URL + "/users",
                                {
                                  body: form,
                                  method: "post"
                                }
    )
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("not found");
      }
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    })
    return user;
  }
}
