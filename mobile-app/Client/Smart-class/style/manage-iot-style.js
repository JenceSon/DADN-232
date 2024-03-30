import React from "react";
import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const manageIOTStyles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : 'white',
    },
    containerFlat:{
        gap : 20,
        paddingHorizontal : '2.5%',
        paddingVertical : '5%',
    },
    //list class room
    button1Room:{
        aspectRatio : 6,
        width : '100%',
        backgroundColor : '#0693F1',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal : '5%',
        borderRadius : 12,
        flexDirection : 'row'
    },
    button2Room:{
        aspectRatio : 6,
        width : '100%',
        backgroundColor : '#EFF8FF',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal : '5%',
        borderRadius : 12,
        flexDirection : 'row',
    },
    buttonText1:{
        fontSize : RFPercentage(3),
        color : '#ffffff',
        fontWeight : 'bold',
    },
    buttonText2:{
        fontSize : RFPercentage(3),
        color : 'black',
        fontWeight : 'bold',
    },
    //list building side
    buildingBtn:{
        width:'45%',
        aspectRatio: 1,
        marginVertical: "2.5%",
        backgroundColor : 'white',
        shadowColor : '#171717',
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity : 20,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'column',
        borderRadius : 10,
    },
    buildingText:{
        fontSize : RFPercentage(3),
        color : 'black',
        fontWeight : 'bold',
    },
    //iot side
    typeText:{
        fontSize : RFPercentage(2.5),
        color : 'black',
        fontWeight : 'bold',
        marginLeft : '5%',
        //marginBottom : '5%'
    },
    deviceBtn:{
        width : '20%',
        aspectRatio : 1,
        marginVertical : '2%',
        backgroundColor : '#3DB2FF',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'column',
        borderRadius : 12,
    },
    idText:{
        fontSize : RFPercentage(2),
        color : 'white',
        fontWeight : 'bold',
    },
    headerRoom:{
        fontSize : RFPercentage(3.5),
        textAlign : 'center',
        marginVertical : '5%',
        fontWeight : 'bold',
        color : '#0074CE',
    },
});