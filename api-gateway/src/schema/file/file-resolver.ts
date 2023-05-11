import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { File } from "./file-type.js";
import NewFileInput from "./file-input.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import Upload, { FileUpload } from "graphql-upload/Upload.mjs";
import FormData from "form-data";
import { Readable } from "stream";
import amqp from "amqplib/callback_api.js";


const URL = process.env.FILES_URL || "http://localhost:8080";

@Resolver()
export default class FileResolver {
  @Query(returns => [File])
  async getFilesByIds(@Arg("fileInput") fileInput: NewFileInput) {
    if (fileInput.filesId == null){
      throw new Error("Bad request. Channel id or files ids missing.");
    }
    let message = await axios({
      method: 'get',
      url: URL + "/files/",
      headers: {},
      data: fileInput.filesId
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
    return message;
  }

  @Query(returns => [File])
  async getFilesOfUser(@Arg("fileInput") fileInput: NewFileInput) {
    let params = fileInput.filters != null && fileInput.filters != "" ? JSON.parse(fileInput.filters) : {};
    let message = await axios({
      method: 'get',
      url: URL + "/files/" + fileInput.userId,
      params: params,
      headers: {},
      data: fileInput.channelIds
    }).then(function (response) {
      if (response.status === 404) {
        throw new Error("Files not found");
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return "Something went wrong."
    });
    return message;
  }

  @Mutation(() => File)
  async uploadFile(
    @Arg("userId") userId: string,
    @Arg("channelId") channelId: string,
    @Arg("file", () => GraphQLUpload) { createReadStream, filename, encoding, mimetype } : FileUpload) {
    
    const stream = createReadStream();
    const fileContents = (await streamToBuffer(stream));

    const form = new FormData();
    form.append("fileName", filename);
    
    let response = await axios.post(URL + "/file/" + userId + "/" + channelId, form, { headers: form.getHeaders() })
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

    amqp.connect('amqp://localhost', function(error0, connection) {
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
            "filename": response.fileName,
            "userId": userId,
            "fileId": response.id,
            "mimetype": mimetype,
            "channelId": channelId
          }
        };

        channel.assertQueue(queue, {
          durable: true
        });

        channel.assertExchange(exchange, 'fanout', {
          durable: true
        });
        channel.bindQueue(queue, exchange, '');
        // channel.publish(exchange,'', Buffer.from(msg), options);
        channel.publish(exchange,'', fileContents, options);
        console.log(" [x] Sent %s", msg);   
      });
    });    
    
    return response;
  }

  @Mutation(() => String)
  async uploadFileURL(
    @Arg("userId") userId: string,
    @Arg("channelId") channelId: string,
    @Arg("fileId") fileId: string,
    @Arg("fileURL") fileURL: string) {

    const form = new FormData();
    form.append("fileURL", fileURL);
      
    let response = await axios.post(URL + "/file/" + userId + "/" + channelId + "/" + fileId + "/", form, { headers: form.getHeaders() })
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
    
    return "OK";
  }

  @Mutation(() => [File])
  async uploadFiles(
    @Arg("userId") userId: string,
    @Arg("channelId") channelId: string,
    @Arg("files", () => [GraphQLUpload]) files : [FileUpload]) {

    let files_list:File[] = [];
    for (const file of files){
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      const fileContents = (await streamToBuffer(stream));

      const form = new FormData();
      form.append("fileName", filename);
      
      let response = await axios.post(URL + "/file/" + userId + "/" + channelId, form, { headers: form.getHeaders() })
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

      amqp.connect('amqp://localhost', function(error0, connection) {
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
              "filename": response.fileName,
              "userId": userId,
              "fileId": response.id,
              "mimetype": mimetype,
              "channelId": channelId
            }
          };

          channel.assertQueue(queue, {
            durable: true
          });

          channel.assertExchange(exchange, 'fanout', {
            durable: true
          });
          channel.bindQueue(queue, exchange, '');
          // channel.publish(exchange,'', Buffer.from(msg), options);
          channel.publish(exchange,'', fileContents, options);
          console.log(" [x] Sent %s", msg);   
        });
      });    
      
      files_list.push(response);
    }

    // let response = await axios.post(URL + "/files/" + userId + "/" + channelId, form, {headers: form.getHeaders()})
    // .then(function (response) {
    //   if (response.status === 404) {
    //     throw new Error("File not found");
    //   } else if (response.status === 403) {
    //     throw new Error("User not authorized");
    //   }
    //   return response.data;
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   return "error";
    // });
    return files_list;
  }

  @Mutation(returns => String, { nullable: true })
  async deleteFile(
    @Arg("userId") userId: string,
    @Arg("fileId") fileId: string
  ) {
    let response = await axios.delete(URL + "/file/" + userId, {params: {fileId: fileId}})
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
    return response;
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