import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import Channel from "./channel-type.js";
import NewChannelInput from "./channel-input.js";

const URL = "URL TO MICROSERVICE";

@Resolver(Channel)
export default class ChannelResolver {}