import { StyleSheet, Text, View } from 'react-native';
import { colors } from './global';
export const loginStyles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor: '#EFF8FF',
        padding : 5,
    },
    container1:{
        marginVertical : '10%',
    },
    container2:{
        
    },
    logoImage: {
        height: 300,
        width: 300,
        position : 'relative',
        alignSelf : 'center',

    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color : 'black',
    },
    textContent:{
        fontSize: 17,
        fontWeight : 'bold',
        textAlign : 'center',
        color : 'grey'
    },
    text:{
        fontSize : 20,
        color : '#0074CE',
        textAlign : 'left',
        position : 'relative',
        fontWeight : 'bold',
        marginLeft : '6%'
        
    },
    textInput:{
        marginVertical: '5%',
        height : 50,
        marginHorizontal: '5%',
        backgroundColor :'#ffffff',
        paddingHorizontal : 16,
        borderRadius : 12,
        fontSize : 20,
    },
    button:{
        marginTop : '5%',
        height : 60,
        marginHorizontal : '5%',
        backgroundColor : '#0693F1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal : 16,
        borderRadius : 12,
        flexDirection : 'row'
        
    },
    buttonUp:{
        marginVertical : '5%',
        height : 60,
        marginHorizontal : '5%',
        //backgroundColor : '#0693F1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal : 16,
        borderRadius : 12,
        flexDirection : 'row'
        
    },
    buttonText:{
        fontSize : 20,
        color : '#ffffff',
        fontWeight : 'bold',
    },
    buttonTextUp:{
        fontSize : 20,
        color : colors.primary80,
        fontWeight : 'bold',
    }
});
