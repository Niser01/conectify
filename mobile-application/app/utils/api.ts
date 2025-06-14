import axios from "axios";
import stringToColour from "./user-colors";

const AG_URL = 'http://34.173.4.99:4000/';


export type File = {
    id: string;
    userId: string;
    fileName: string;
    fileType: string;
    fileURL: string;
    channelIds: string[];
    date: string;
};

export type Message = {
    _id: string;
    userId: string;
    content?: string;
    edited: boolean;
    channelId: string;
    thread?: string;
    visible: boolean;
    replies?: string[];
    reactions?: string;
    files?: File[];
    updated_at: Date;
    created_at: Date;
};

export type Channel = {
    id: string;
    name?: string;
    description?: string;
    members?: number[];
    admins?: number[];
    messages?: string[];
    files?: string[];
};

export type User = {
    ID: string;
    Names?: string;
    LastNames?: string;
    EMail?: string;
    PhoneNumber?: string;
    PhotoId?: string;
    Status?: number;
};

export async function createMessage(channelId: string, userId: string, message: string, token: string) {
    const createMessageMutation = {
        "query": `mutation createMessage($newMessageData: NewMessageInput!) {
            createMessage(newMessageData: $newMessageData)
        }`,
        "variables": {
            "newMessageData": {
                "channelId": channelId,
                "content": message,
                "userId": userId
            }
        }
    };
    await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: createMessageMutation
    }).catch((error) => {
        console.log(error);
    });
}

export async function loadChannel(channelId: string, limit: number = 50, token: string): Promise<Message[]> {
    const lastMessagesQuery = {
        "query": `query ChannelLastMessages($channelId: String!, $limit: String) {
            channelLastMessages(channelId: $channelId, limit: $limit) {
                _id
                userId
                content
                edited
                channelId
                thread
                visible
                replies
                reactions
                files {
                    id
                    userId
                    fileName
                    fileType
                    fileURL
                    channelIds
                    date
                }
                updated_at
                created_at
            }
        }`,
        "variables": {
            "channelId": channelId,
            "limit": limit.toString()
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: lastMessagesQuery
    }).then((response) => {
        return response.data.data.channelLastMessages;
    }).catch((error) => {
        console.log(error);
    });
    return response;
}

export async function updateChannel(channelId: string, lastUpdate: Date,token: string): Promise<Message[]> {
    const channelUpdatesQuery = {
        "query": `query ChannelUpdates($lastUpdate: String!, $channelId: String!) {
        channelUpdates(lastUpdate: $lastUpdate, channelId: $channelId) {
            _id
            userId
            content
            edited
            channelId
            thread
            visible
            replies
            reactions
            files {
            id
            userId
            fileName
            fileType
            fileURL
            channelIds
            date
            }
            updated_at
            created_at
        }
        }`,
        "variables": {
        "channelId": channelId,
        "lastUpdate": new Date(lastUpdate).toISOString()
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: channelUpdatesQuery
    }).then((response) => {
        return response.data.data.channelUpdates;
    }).catch((error) => {
        console.log(error);
    });
    return response;
}

export async function listChannels(token: string): Promise<Channel[]> {
    const channelsQuery = {
        "query": `query Channels {
            channels {
                id
                name
                description
                members
                admins
                messages
                files
            }
        }`,
        "variables": {}
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: channelsQuery
    }).then((response) => {
        return response.data.data.channels;
    }).catch((error) => {
        console.log(error);
    });
    return response;
}

export async function getChannelById(channelId: string,token: string): Promise<Channel> {
    const channelQuery = {
        "query": `query ChanneById($channelId: String!) {
            channeById(id: $channelId) {
                id
                name
                description
                members
                files
                messages
                admins
            }
          }`,
        "variables": {
            "channelId": channelId
          }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: channelQuery
    }).then((response) => {
        return response.data.data.channeById;
    }).catch((error) => {
        console.log(error);
        throw "Channel not found";
    });
    return response;
}

export async function addUserToChannel(channelId: string, userId: number,token: string) {
    const addUserToChannelMutation = {
        "query": `mutation AddMemberToChannel($memberId: Float!, $addMemberToChannelId: String!) {
            addMemberToChannel(member_id: $memberId, id: $addMemberToChannelId)
        }`,
        "variables": {
            "memberId": userId,
            "addMemberToChannelId": channelId
        }
    };
    await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: addUserToChannelMutation
    }).catch((error) => {
        console.log(error);
    });
}

export async function removeUserFromChannel(channelId: string, userId: number,token: string) {
    const removeUserFromChannelMutation = {
        "query": `mutation RemoveMemberFromChannel($memberId: Float!, $removeMemberFromChannelId: String!) {
            removeMemberFromChannel(member_id: $memberId, id: $removeMemberFromChannelId)
        }`,
        "variables": {
            "memberId": userId,
            "removeMemberFromChannelId": channelId
        }
    };
    await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: removeUserFromChannelMutation
    }).catch((error) => {
        console.log(error);
    });
}

export async function getUserById(userId: string,token: string): Promise<User> {
    const userQuery = {
        "query": `query Read_userByid($readUserByidId: String!) {
            Read_userByid(id: $readUserByidId) {
                ID
                Names
                LastNames
                EMail
                PhoneNumber
                PhotoId
                Status
            }
        }`,
        "variables": {
            "readUserByidId": userId
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: userQuery
    }).then((response) => {
        response.data.data.Read_userByid.PhotoId = stringToColour(response.data.data.Read_userByid.Names+response.data.data.Read_userByid.LastNames);
        return response.data.data.Read_userByid;
    }).catch((error) => {
        console.log(error);
    });
    return response;
}

export async function Edit_statusByid(Id: number,Status: number ,token: string) {
    const userQuery={
        "query": `mutation Mutation($status: Float!, $id: Float!) {
            Edit_statusByid(Status: $status, Id: $id)
          }`,
          "variables": {
            "status": Status,
            "id": Id
          }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: userQuery
    }) .then((response) => {
        return response.data.data.Edit_statusByid;
    }).catch((error) => {
        console.log(error);
        throw "Status not updated";
    });
    return response;
}



export async function getUserDisplayById(userId: string,token: string): Promise<User> {
    const userQuery = {
        "query": `query Read_userByid($readUserByidId: String!) {
            Read_userByid(id: $readUserByidId) {
                ID
                Names
                LastNames
                PhotoId
            }
        }`,
        "variables": {
            "readUserByidId": userId
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true",
            "Authorization":token
          },
        data: userQuery
    }).then((response) => {
        response.data.data.Read_userByid.PhotoId = stringToColour(response.data.data.Read_userByid.Names+response.data.data.Read_userByid.LastNames);
        return response.data.data.Read_userByid;
    }).catch((error) => {
        console.log(error);
        throw "User not found";
    });
    return response;
}

export async function login(email: string, password: string): Promise<{token: string, id: string}> {
    const loginQuery = {
        "query": `query Login($password: String!, $email: String!) {
            login(password: $password, email: $email) {
              token
              id
              exp
            }
        }`,
        "variables": {
            "email": email,
            "password": password
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: {
            "content-type": "application/json",
            "apollo-require-preflight": "true"
          },
        data: loginQuery
    }).then((response) => {
        return { token: response.data.data.login.token, id: response.data.data.login.id };
    }).catch((error) => {
        console.log(error);
        throw "Login failed";
    });
    return response;
}

