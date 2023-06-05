import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import Channel from "./channel-type.js";
import NewChannelInput from "./channel-input.js";

const URL = process.env.CHANNELS_URL || "http://localhost:8080/channels";

@Resolver(Channel)
export default class ChannelResolver {

    @Query(returns => Channel)
    async channeById(@Arg("id") id: string) {
      let channel = await axios.get(URL + "/" + id)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("Message not found");
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      return channel;
    }
  
    @Query(returns => [Channel])
    async channels() {
      let channels = await axios.get(URL)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      return channels;
    }
  
    @Query(returns => [Channel])
    async searchChannel(@Arg("search") search: string) {
      let channel = await axios.get(URL + "/search/" +search)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      return channel;
    }

    @Mutation(returns => String, { nullable: true })
    async createChannel(
      @Arg("channelName") channelName: string, 
      @Arg("description") description: string, 
      @Arg("members") members: number,
      @Arg("files") files: string, 
      @Arg("messages") messages: number,
      @Arg("admins") admins: string, 
      ) {
        let message = await axios.post(URL, {
          channelName: channelName,
          description: description,
          members: members,
          files: files,
          messages: messages,
          admins: admins,
            
        })
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Channel could not be created" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Mutation(returns => String, { nullable: true })
    async updateChannel(
      @Arg("id") id: number, 
      @Arg("channelName") channelName: string, 
      @Arg("description") description: string, 
      @Arg("members") members: number,
      @Arg("files") files: string, 
      @Arg("messages") messages: number,
      @Arg("admins") admins: string, 
      ) {
        let message = await axios.put(URL +"/" +id, {
          channelName: channelName,
          description: description,
          members: members,
          files: files,
          messages: messages,
          admins: admins,
            
        })
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Channel could not be created" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Mutation(returns => String, { nullable: true })
    async deleteChannel(@Arg("id") id: string, @Arg("user_id") user_id: number) {
        let message = await axios.delete(URL + "/"+id, {
          data: {
            user_id: user_id
          }})
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Channel could not be deleted" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Mutation(returns => String, { nullable: true })
    async addMemberToChannel (
      @Arg("id") id: string, 
      @Arg("member_id") member_id: number ) {
        let message = await axios.put(URL + "/"+ id + "/members/add/"+ member_id)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User not updated" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Mutation(returns => String, { nullable: true })
    async removeMemberFromChannel (
      @Arg("id") id: string, 
      @Arg("member_id") member_id: number ) {
        let message = await axios.put(URL + "/"+ id + "/members/remove/"+ member_id)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User not updated" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Query(returns => [Number])
    async getMembers(@Arg("channel_id") channel_id: string) {
      let members = await axios.get(URL + channel_id + "/members")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      return members;
    }
 
}