import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { parseString } from "xml2js";
import {event, eventmessage} from "./event-type.js";

const URL = process.env.SOAP_URL || 'http://35.223.216.194:55690';
const URLM = process.env.MESSAGES_URL || "http://localhost/api/messages";

@Resolver(event)
export default class EventResolver {

  @Query(returns => String, { nullable: true })
  async Get_events(
    @Arg("user") user: string,
    @Arg("userId") userId: string,
    @Arg("channelId") channelId: string,)
   {
    const xmlBody = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <getEventsRequest>
                <username>${user}</username>
            </getEventsRequest>
        </soap:Body>
    </soap:Envelope>`;
    var eventos;
    let events = await axios.post(URL, xmlBody)
      .then(function (response) { 
        parseString(response.data, (err, result) => {

          if (err) {
            console.error('Failed to parse XML response:', err);
            return;
          }
          eventos  = result.Envelope.Body[0].getEventsResponse[0].events[0].event;
          console.log(eventos);
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log(eventos);

      var newMessageData ={
      userId: userId,
      content: eventos,
      channelId: channelId};

      console.log(newMessageData);

      let response = await axios.post(URLM, newMessageData)
      .then(function (response) {
        console.log(eventos);
        return "ok";
      })
      .catch(function (error) {
        console.log(error);
        return "error";
      }); 
      
      return response;

  }

}


