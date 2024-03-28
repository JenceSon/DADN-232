import React from "react";
import { StyleSheet } from "react-native";


export const manageIOTStyles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : 'white',
        

    },
    button1:{
        marginVertical : '5%',
        height : 60,
        marginHorizontal : '5%',
        backgroundColor : '#0693F1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal : 16,
        borderRadius : 12,
        flexDirection : 'row'
    },
    button2:{
        marginVertical : '5%',
        height : 60,
        marginHorizontal : '5%',
        backgroundColor : '#EFF8FF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal : 16,
        borderRadius : 12,
        flexDirection : 'row'
    },
    buttonText1:{
        fontSize : 20,
        right : '200%',
        color : '#ffffff',
        fontWeight : 'bold',
    },
    buttonText2:{
        fontSize : 20,
        right : '200%',
        color : 'black',
        fontWeight : 'bold',
    },
    icon:{
        left : '200%',
        
    },
    buildingBtn:{
        height : 150,
        width : 150,
        alignSelf :'center',
        marginHorizontal : '5%',
        marginVertical : '5%',
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
        borderRadius : 12,
    },
    buildingText:{
        fontSize : 20,
        color : 'black',
        fontWeight : 'bold',
    },
    
    //iot side
    typeText:{
        fontSize : 20,
        color : 'black',
        fontWeight : 'bold',
        marginLeft : '5%',
        //marginBottom : '5%'
    },
    deviceBtn:{
        height : 70,
        width : 70,
        marginVertical : '2.5%',
        marginHorizontal : '3%',
        backgroundColor : '#3DB2FF',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'column',
        borderRadius : 12,
    },
    idText:{
        fontSize : 15,
        color : 'white',
        fontWeight : 'bold',
    },
    headerRoom:{
        fontSize : 25,
        textAlign : 'center',
        marginVertical : '5%',
        fontWeight : 'bold',
        color : '#0074CE',
    }
    
});