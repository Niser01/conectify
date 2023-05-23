import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
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

    channelItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'space-between',
        padding:"4.5%",
        borderBottomWidth: 1,
        borderBottomColor: '#353535',

    },
    channelInfoContainer: {
        flex: 1,

    },
    channelName: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"#fff"
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
        color: '#212121',
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
        paddingTop:"13%",
        backgroundColor: '#FC6161',
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

    channelsTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"#fff",
        padding:"4.5%",
        borderBottomWidth: 1.5,
        borderBottomColor: '#DDDDDD',
    },

    footer: {
        backgroundColor: '#EEEEEE',
        height:"9%",
        bottom: 0,
        position :"absolute",
        width:"100%"
        
    },
    footerSub: {
        flexDirection: 'row',
        paddingTop:"3%",
        paddingLeft:"3%",
        paddingRight:"3%",
        justifyContent: 'space-around',

    },
    footerImg:{
        width: 40,
        height: 40,
    },
    footerSubImgText:{
        flexDirection: 'column',
        alignItems: 'center', 
    },
    footerText:{
        color:"#000"
    },
    profileHeaderPicture:{
        width:180,
        height:35,
    },
    profileContainer:{
        width: "100%",
        height: "20%",
        alignItems: 'center', 
        paddingTop:"5%",

    },
    profilePhotoContainer:{
        width: "80%",
        height: "100%",
        alignItems: 'center', 
        borderBottomWidth: 1,
        borderBottomColor: '#353535',
    },
    profilePhoto:{
        width: "45%",
        height: "95%",
        borderRadius: 150,
    },
    profileTextContainer:{
        width: "100%",
        height: "20%",
        paddingTop:"5%",
    },
    profileTextTitleContainer:{
        width: "80%",
        color:"#fff",
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom:"5%"
    },
    profileTextRegularContainer:{
        width: "80%",
        color:"#fff",
        fontSize: 20,
        paddingBottom:"4%",
        flexDirection:"row",
        justifyContent:'space-evenly' 
    },



    profileInfoIcon:{
        height:30,
        width:30,
    },

    profileBotones:{
        paddingTop:"10%",
    },
    profiletextBotones:{
        backgroundColor:"#FC6161",
        color:"#fff",
        fontSize: 20,
        padding:"4%",
        borderRadius: 5,
        flexDirection:"row",
        justifyContent:'space-evenly'
    },
    profiletextBotonesEdit:{
        color:"#fff",
        fontSize: 20,
        padding:"4%",
        borderRadius: 5,
        flexDirection:"row",
        alignItems:"center",
    },
    profileTextRegularContainerEdit:{
        width: "80%",
        color:"#fff",
        fontSize: 20,
        paddingBottom:"5%",
        paddingTop:"5%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-evenly',
        borderWidth: 1,
        borderColor:"#353535",
    },
    


});
