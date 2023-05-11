import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { Message, MessageAsThread } from "./message-type.js";
import NewMessageInput from "./message-input.js";

const URL = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(Message)
export default class MessageResolver {
 



  @Query(returns => Message)
  async message(@Arg("id") id: string) {
    let message = await axios.get(URL + "/" + id)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    this.transformToGraphql(message);
    return message;
  }

  @Query(returns => MessageAsThread)
  async messageAsThread(@Arg("id") id: string) {
    let message = await axios.get(URL + "/" + id + "/thread")
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < message.replies.length; i++) {
      this.transformToGraphql(message.replies[i]);
    }
    this.transformToGraphql(message);
    return message;
  }

  @Query(returns => [Message])
  async messages() {
    let messages = await axios.get(URL)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < messages.length; i++) {
      this.transformToGraphql(messages[i]);
    }
    return messages;
  }

  @Query(returns => [Message])
  async searchMessages(@Arg("search") search: string) {
    let messages = await axios.get(URL + "/search?string=" + search)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < messages.length; i++) {
      this.transformToGraphql(messages[i]);
    }
    return messages;
  }

  //mutations to message queue is on consideration, would replace all axios calls for rabbitmq messages
  @Mutation(returns => String, { nullable: true })
  async createMessage(
    @Arg("newMessageData") newMessageData: NewMessageInput
  ) {
    let response = await axios.post(URL, newMessageData)
    .then(function (response) {
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  @Mutation(returns => String, { nullable: true })
  async editMessage(
    @Arg("id") id: string,
    @Arg("userId") userId: string,
    @Arg("content") content: string
  ) {
    let response = await axios.put(URL + "/" + id, {userId: userId, content: content})
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      } else if (response.status === 403) {
        throw new Error("User not authorized");
      }
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  @Mutation(returns => String, { nullable: true })
  async reactToMessage(
    @Arg("id") id: string,
    @Arg("userId") userId: string,
    @Arg("reaction") reaction: string
  ) {
    let response = await axios.put(URL + "/" + id + "/reactions", {userId: userId, reaction: reaction})
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      }
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  @Mutation(returns => String, { nullable: true })
  async toggleMessageVisibility(
    @Arg("id") id: string,
    @Arg("userId") userId: string
  ) {
    let response = await axios.put(URL + "/" + id + "/visible", {userId: userId})
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      } else if (response.status === 403) {
        throw new Error("User not authorized");
      }
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  @Mutation(returns => String, { nullable: true })
  async deleteMessage(
    @Arg("id") id: string,
    @Arg("userId") userId: string
  ) {
    let response = await axios.delete(URL + "/" + id, {data: {userId: userId}})
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      } else if (response.status === 403) {
        throw new Error("User not authorized");
      }
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  @Mutation(returns => String, { nullable: true })
  async deleteFileFromMessage(
    @Arg("id") id: string,
    @Arg("userId") userId: string,
    @Arg("fileId") fileId: string
  ) {
    let response = await axios.delete(URL + "/" + id + "/files/" + fileId, {data: {userId: userId}})
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Message not found");
      } else if (response.status === 403) {
        throw new Error("User not authorized");
      }
      return "ok";
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
    return response;
  }

  transformToGraphql(message) {
    if (Array.isArray(message.reactions)) {
      message.reactions = '{'+message.reactions.toString()+'}';
    } else {
      message.reactions = JSON.stringify(message.reactions);
    }
    message.created_at = new Date(message.created_at);
    message.updated_at = new Date(message.updated_at);
  }
}