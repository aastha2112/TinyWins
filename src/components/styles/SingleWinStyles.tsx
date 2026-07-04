import { StyleSheet } from "react-native";

export const SingleWinStyles = StyleSheet.create({
    winContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 80,
        width: '100%' ,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    winTextCont: {
        gap: 2
    },
    winTitle: {
        fontSize: 17,
        fontWeight: 500,
        color: '#000'
    },
    winSubtitle: {
        fontSize: 14,
        fontWeight: 500,
        color: '#808080'
    },
    winWin: {},
})