import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { User, SavedElement } from "./user-type.js";
import { url, port } from './user_server.js';

const URL = process.env.USERS_URL || "http://localhost:8080";
const URLMessages = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(User)
export default class UserResolver {

    @Mutation(returns => String, { nullable: true })
    async userCreate(
      @Arg("Names") Names: string, 
      @Arg("LastNames") LastNames: string, 
      @Arg("PhotoId") PhotoId: number,
      @Arg("EMail") EMail: string, 
      @Arg("Status") Status: number,
      @Arg("PhoneNumber") PhoneNumber: string, 
      ) {
        let message = await axios.post(URL + "/users/create", {
          Names: Names,
          LastNames: LastNames,
          PhotoId: PhotoId,
          EMail: EMail,
          Status: Status,
          PhoneNumber: PhoneNumber,
            
        })
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User not created" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }



    @Query(returns => User)
    async userById(@Arg("id") id: string ) {
        let message = await axios.get(URL + "/users/id_read/"+id)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Id not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Query(returns => User)
    async userByEmail(@Arg("eMail") email: string ) {
        let message = await axios.get(URL + "/users/email_read/"+email)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Email not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Query(returns => [User])
    async userByNames(@Arg("names") names: string ) {
        let message = await axios.get(URL + "/users/name_read/"+names)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User name not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

          return message;
    }


    @Query(returns => [User])
    async userByLastName(@Arg("lastNames") lastNames: string ) {
        let message = await axios.get(URL + "/users/lastname_read/"+lastNames)
        .then(function (response) {
            if (response.status === 404) {  
              throw new Error("User's lastname not found" );
            }
            return response.data;
          })  
          .catch(function (error) {
            console.log(error);
          });
          return message;
    }


    @Query(returns =>  [User])
    async userByPhone(@Arg("phoneNumber") phone: string ) {
        let message = await axios.get(URL + "/users/phone_read/"+phone)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Phone not found" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }


    @Mutation(returns => String, { nullable: true })
    async userUpdate(
      @Arg("Id") Id: string,
      @Arg("Names") Names: string,
      @Arg("LastNames") LastNames: string,
      @Arg("PhotoId") PhotoId: number,
      @Arg("EMail") EMail: string,
      @Arg("Status") Status: number,
      @Arg("PhoneNumber") PhoneNumber: string,
      ) {
        let message = await axios.put(URL + "/users/update", {
          Names: Names,
          LastNames: LastNames,
          PhotoId: PhotoId,
          EMail: EMail,
          Status: Status,
          PhoneNumber: PhoneNumber,
        })
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
    async userDelete(@Arg("id") id: string ) {
        let message = await axios.delete(URL + "/users/delete/"+id)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User not deleted" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }

    @Mutation(returns => String, { nullable: true })
    async userEditStatus (
      @Arg("Id") Id: number, 
      @Arg("Status") Status: number ) {
        let message = await axios.put(URL + "/users/edit_status", {
          Id: Id,  
          Status: Status,
        })
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




/*
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



*/






    @Mutation(returns => String, {nullable: true})
    async createSavedElement(
      @Arg("IdUser") IdUser: number,
      @Arg("IdElement") IdElement: number){

      let messages = await axios.get(URLMessages)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
        for (let i = 0; i < messages.length; i++) {
          this.transformToGraphql(messages[i]);
        }


        let message = await axios.post(URL + "/savedElement/create", {
          IdUser: IdUser,
          IdElement: messages._id,            
        })
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User not created" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
      }
    
    
    @Query(returns => [SavedElement])
    async getSavedElementByIdUser (@Arg("idUser") idUser: number){
      let message = await axios.get(URL + "/savedElement/id_read/"+idUser)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not found" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    @Mutation(returns => String, { nullable: true })
    async deleteSavedElement(@Arg("idElement") idElement: number){
      let message = await axios.delete(URL + "/savedElement/delete/"+idElement)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not deleted" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    @Mutation(returns => String, { nullable: true })
    async deleteAllSavedElement(@Arg("idUser") idUser: number){
      let message = await axios.delete(URL + "/savedElement/delete_all/"+idUser)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not deleted" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
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


