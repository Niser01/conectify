import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { User,UserId, SavedElement } from "./user-type.js";
import { print } from "graphql";


const URL = process.env.USERS_URL || "http://localhost:8080";
const URLMessages = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(User)
export default class UserResolver {

    @Mutation(returns => String, { nullable: true })
    async Create_User(
      @Arg("Names") Names: string, 
      @Arg("LastNames") LastNames: string, 
      @Arg("PhotoId") PhotoId: string,
      @Arg("EMail") EMail: string, 
      @Arg("Status") Status: number,
      @Arg("PhoneNumber") PhoneNumber: string, 
      @Arg("SSO_UserId") SSO_UserId: string
      ) {
        let message = await axios.post(URL + "/users/create", {
          Names: Names,
          LastNames: LastNames,
          PhotoId: PhotoId,
          EMail: EMail,
          Status: Status,
          PhoneNumber: PhoneNumber,
          SSO_UserId: SSO_UserId,
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
    async Read_userByid(
      @Arg("id") id: string 
      ) {
        let message = await axios.get(URL + "/users/id_read/"+ id)
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
    async Read_userByemail(
      @Arg("eMail") email: string 
      ) {
        let message = await axios.get(URL + "/users/email_read/" + email)
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

    @Query(returns => [UserId])
    async Read_idByemail(
      @Arg("eMail") email: string 
    ){
      let message = await axios.get(URL + "/users/id_by_email/" + email)      
      .then(function (response) {
          if (response.status === 404) {
            throw new Error("Id not found" );
          }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(message);
      return message;
    }

    @Query(returns => [User])
    async Read_userByname(@Arg("names") names: string ) {
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
    async Read_userBylastname(@Arg("lastNames") lastNames: string ) {
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
    async Read_userBypnumber(@Arg("phoneNumber") phone: string ) {
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


    @Query(returns => [UserId])
    async Read_idBySSOId(
      @Arg("SSO_UserId") SSO_UserId: string
    ){
      let message = await axios.get(URL + "/users/id_by_sso/" + SSO_UserId)
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

    @Mutation(returns => String, { nullable: true })
    async Update_photoId(
      @Arg("Id") Id: number,
      @Arg("PhotoId") PhotoId: string,
    ){
      let message = await axios.put(URL + "/users/update_photo",{
        Id: Id,
        PhotoId: PhotoId
      })
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("Photo not updated" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return message;
    }

    @Mutation(returns => String, { nullable: true })
    async Update_userByid(      
      @Arg("Names") Names: string,
      @Arg("LastNames") LastNames: string,
      @Arg("PhotoId") PhotoId: string,
      @Arg("EMail") EMail: string,
      @Arg("Status") Status: number,
      @Arg("PhoneNumber") PhoneNumber: string,
      @Arg("SSO_UserId") SSO_UserId: string,
      @Arg("Id") Id: number,
      ) {
        let message = await axios.put(URL + "/users/update", {
          Names: Names,
          LastNames: LastNames,
          PhotoId: PhotoId,
          EMail: EMail,
          Status: Status,
          PhoneNumber: PhoneNumber,
          SSO_UserId: SSO_UserId,
          Id: Id,
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
    async Delete_userByid(
      @Arg("Id") Id: number,
      ) {
        let message = await axios.delete(URL + "/users/delete",{
          data: {
            Id: Id
          }
        })
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
    async Edit_statusByid (
      @Arg("Id") Id: number, 
      @Arg("Status") Status: number ) {
        let message = await axios.put(URL + "/users/edit_status", {
          Id: Id,  
          Status: Status,
        })
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("Status not updated" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
    }


    @Mutation(returns => String, {nullable: true})
    async Create_savedElement(
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
              throw new Error("Saved element not created" );
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        return message;
      }
    
    
    @Query(returns => [SavedElement])
    async Read_savedElements (
      @Arg("idUser") idUser: number
      ){
      let message = await axios.get(URL + "/savedElement/id_read/"+ idUser)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("Saved Element not found" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      return message;
    }

    @Mutation(returns => String, { nullable: true })
    async Delete_savedElement(
      @Arg("IdElement") IdElement: number
      ){
      let message = await axios.delete(URL + "/savedElement/delete", {
        data: {
          IdElement: IdElement
        }
      })
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not deleted" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      return message;
    }

    @Mutation(returns => String, { nullable: true })
    async Delete_allsavedElements(
      @Arg("IdUser") IdUser: number
      ){
      let message = await axios.delete(URL + "/savedElement/delete_all", {
        data: {
          IdUser: IdUser
        }
      })
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not deleted" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      return message;
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


