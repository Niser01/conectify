import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { PlainMessage, Message, MessageAsThread } from "./message-type.js";
import NewMessageInput from "./message-input.js";

import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import Upload, { FileUpload } from "graphql-upload/Upload.mjs";
import FormData from "form-data";
import { Readable } from "stream";
import amqp from "amqplib/callback_api.js";


const URL = process.env.MESSAGES_URL || "http://localhost/api/messages";
const filesURL = process.env.FILES_URL || "http://localhost:8080";
const mqURL = process.env.MQ_URL || 'amqp://localhost';
const USERS_URL = process.env.USERS_URL || "http://localhost:8080";
const CHANNELS_URL = process.env.CHANNELS_URL || "http://localhost:8080/channels";


@Resolver(Message)
export default class MessageResolver {

  @Query(returns => PlainMessage)
  async plainMessage(@Arg("id") id: string) {
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
    this.getFiles(message);
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
      this.getFiles(message.replies[i]);
    }
    this.transformToGraphql(message);
    this.getFiles(message);
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
      this.getFiles(messages[i]);
    }
    return messages;
  }

  @Query(returns => [Message])
  async userRecentMessages(
    @Arg("userId") userId: string,
    @Arg("limit", { nullable: true }) limit?: string
  ) {
    const count = limit ? limit : "10";
    let messages = await axios.get(URL + "/user/" + userId + "?limit=" + count)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < messages.length; i++) {
      this.transformToGraphql(messages[i]);
      this.getFiles(messages[i]);
      this.getUserName(messages[i]);
      this.getChannelName(messages[i]);
    }
    return messages;
  }

  @Query(returns => [Message])
  async channelLastMessages(
    @Arg("channelId") channelId: string,
    @Arg("limit", { nullable: true }) limit?: string
  ) {
    const count = limit ? limit : "10";
    let messages = await axios.get(URL + "/channel/" + channelId + "?limit=" + count)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < messages.length; i++) {
      this.transformToGraphql(messages[i]);
      this.getFiles(messages[i]);
    }
    return messages;
  }

  @Query(returns => [Message])
  async channelUpdates(
    @Arg("channelId") channelId: string,
    @Arg("lastUpdate") lastUpdate: string
  ) {
    let messages = await axios.get(URL + "/channel/" + channelId + "/updates?lastUpdate=" + lastUpdate)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    for (let i = 0; i < messages.length; i++) {
      this.transformToGraphql(messages[i]);
      this.getFiles(messages[i]);
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
      this.getFiles(messages[i]);
    }
    return messages;
  }


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
  async createMessageAndUploadFile(
    @Arg("newMessageData") newMessageData: NewMessageInput,
    @Arg("file", () => GraphQLUpload) { createReadStream, filename, encoding, mimetype } : FileUpload
  ) {
    
    const stream = createReadStream();
    const fileContents = (await streamToBuffer(stream));

    const form = new FormData();
    form.append("fileName", filename);
    console.log("creating file reference in files service");
    let files_response = await axios.post(filesURL + "/file/" + newMessageData.userId + "/" + newMessageData.channelId, form, { headers: form.getHeaders() })
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("File not found");
      } else if (response.status === 403) {
        throw new Error("User not authorized");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });

    console.log("sending file to files service through rabbitmq");

    amqp.connect(mqURL, function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        
        var queue = "filesQ";
        var exchange = "filesExchange";
        var msg = 'Hello World!';
        var options = {
          contentType: "multipart/form-data",
          persistent: true,
          headers: {
            "filename": files_response.fileName,
            "userId": newMessageData.userId,
            "fileId": files_response.id,
            "mimetype": mimetype,
            "channelId": newMessageData.channelId
          }
        };

        // channel.assertQueue(queue, {
        //   durable: true
        // });

        channel.assertExchange(exchange, 'fanout', {
          durable: true
        });
        // channel.bindQueue(queue, exchange, '');
        // channel.publish(exchange,'', Buffer.from(msg), options);
        channel.publish(exchange,'', fileContents, options);
        console.log(" [x] Sent %s", msg);   
      });
    }); 
    console.log('files service response');
    console.log(files_response);
    console.log(files_response.id);
    console.log('updating new message data and sending to messages service');
    newMessageData.filesId = [files_response.id];
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

  getFiles(message) {
    if (!message.filesId) {
      return;
    }
    let files = axios({
      method: 'get',
      url: filesURL + "/files/",
      headers: {},
      data: message.filesId
    }).then(function (response) {
      if (response.status === 404) {
        throw new Error("File not found");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return "Something went wrong."
    });
    message.files = files;
  }

  getUserName(message) {
    let name =  axios.get(USERS_URL + "/users/id_read/"+ message.userId)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Id not found" );
      }
      return response.data.Names + " " + response.data.LastNames;
    })
    .catch(function (error) {
      console.log(error);
    });
    message.userName = name;
  }

  getChannelName(message) {
    let channelName = axios.get(CHANNELS_URL + "/" + message.channelId)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error("Channel not found");
      }
      return response.data.name;
    })
    .catch(function (error) {
      console.log(error);
      return "error getting channel name";
    });
    message.channelName = channelName;
  }
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (data) => chunks.push(Buffer.from(data)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error) => reject(error));
  });
}