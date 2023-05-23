import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1835',
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 16,
    },
    messageContainer: {
        marginBottom: 8,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    messageBubble: {
        backgroundColor: '#363636',
        borderRadius: 16,
        padding: 8,
    },
    messageHeader: {
        color: '#FFF',
        fontSize: 18,
    },
    messageSubHeader: {
        color: '#FFF',
        fontSize: 12,
    },
    messageText: {
        color: '#FFF',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#555',
        padding: 8,
        backgroundColor: '#333',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#444',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
        color: '#FFF',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    channelList: {
        padding: 16,
    },
    channelItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'space-between',
        marginBottom: 16,
    },
    channelInfoContainer: {
        flex: 1,
        marginLeft: 4,
    },
    channelName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    channelDescription: {
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#999',
    },
    channelActions: {
        flexDirection: 'row',
        marginLeft: 4,
    },
    joinButton: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    leaveButton: {
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    messagesButton: {
        backgroundColor: '#5856D6',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    logo: {
        width: "85%",
        height: "20%",
        resizeMode:"contain",
        marginBottom: 32,
    },
    loginInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginBottom: 16,
        color: '#FFF',
    },
    loginButton: {
        backgroundColor: '#FC6161',
        borderRadius: 4,
        paddingHorizontal: "8%",
        paddingVertical: "2%",
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1B1835',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        justifyContent: 'space-between',
    },
    headerSub: {
        flexDirection: 'row',
        alignItems: 'center',        
    },
    userPicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    userName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
      },
});
