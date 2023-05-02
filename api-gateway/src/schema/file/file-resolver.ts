import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import File from "./file-type.js";
import NewFileInput from "./file-input.js";

const URL = "URL TO MICROSERVICE";

@Resolver(File)
export default class ChannelResolver {}