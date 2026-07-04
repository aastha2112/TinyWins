import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
    // screen
    screenSafeView: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 25,
    },
    // container
    screenViewContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    // text
    headingText: {
        fontSize: 28,
        color: '#000',
        fontWeight: 600
    },
    subHeadingText:{
        fontSize: 18,
        color: '#808080',
        fontWeight: 500
    },
    normalText: {
        fontSize: 14,
        color: '#808080',
        fontWeight: 400
    },
    // button
    button: {
        width: "60%",
        backgroundColor: "#000",
        paddingVertical: 15,
        borderRadius: 50,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",
      },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "400",
    },
    // input
    inputField : {
        width: '80%',
        paddingVertical: 5,
        borderBottomColor: '#808080',
        borderBottomWidth: 2
    }

})