import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { User, SavedElement } from "./user-type.js";
import { url, port } from './user_server.js';

const URL = `http://localhost:8080`;

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

    @Query(returns => User)
    async userByNames(@Arg("names") names: string ) {
        let message = await axios.get(URL + "/users/names_read/"+names)
        .then(function (response) {
            if (response.status === 404) {
              throw new Error("User name not found" );
            }
            return response.data;
          });

          return message;
    }


    @Query(returns => User)
    async userByLastName(@Arg("lastNames") names: string ) {
        let message = await axios.get(URL + "/users/lastNames_read/"+names)
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


    @Query(returns => User)
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
        let message = await axios.put(URL + "/users/update/", {
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


    @Mutation(returns => String, { nullable: true })
    async createSavedElement(
      @Arg("IdUser") IdUser: number,
      @Arg("IdElement") IdElement: number,
    ){
      let message = await axios.post(URL + "/savedElement", {
        IdUser: IdUser,
        IdElement: IdElement,
      })
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("SavedElement not created" );
        }
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    @Query(returns => SavedElement)
    async getSavedElementById(@Arg("idElement") idElement: number){
      let message = await axios.get(URL + "/savedElement/"+idElement)
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
      let message = await axios.delete(URL + "/savedElement/"+idElement)
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
      let message = await axios.delete(URL + "/savedElement/deleteAll/"+idUser)
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


}


