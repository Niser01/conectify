var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Arg } from "type-graphql";
import axios from "axios";
import { parseString } from "xml2js";
import { event } from "./event-type.js";
const URL = process.env.SOAP_URL || 'http://35.223.216.194:55690';
const URLM = process.env.MESSAGES_URL || "http://localhost/api/messages";
let EventResolver = class EventResolver {
    async Get_events(user, userId, channelId) {
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
                eventos = result.Envelope.Body[0].getEventsResponse[0].events[0].event;
            });
        })
            .catch(function (error) {
            console.log(error);
        });
        console.log(JSON.stringify(eventos));
        var newMessageData = {
            userId: userId,
            content: JSON.stringify(eventos),
            channelId: channelId
        };
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
};
__decorate([
    Query(returns => String, { nullable: true }),
    __param(0, Arg("user")),
    __param(1, Arg("userId")),
    __param(2, Arg("channelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "Get_events", null);
EventResolver = __decorate([
    Resolver(event)
], EventResolver);
export default EventResolver;
