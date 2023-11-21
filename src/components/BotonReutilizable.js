import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
const BotonReutilizable = ({onPress, style, texto}) => 
{

    const HandleOnPress = () => {


            onPress()
        
        
    }


    return ( 
    
        < TouchableOpacity onPress = {HandleOnPress} style = {[style]} > 
            <Text style = {styles.buttonText}> {texto} </Text>    
        </TouchableOpacity > 
        
        );
};
const styles = StyleSheet.create({
    buttonContainer: {
    width: '100%', 
    backgroundColor: '#007AFF', 
    borderRadius: 5, 
    marginTop: 15, 
    marginBottom: 15,
    },  
    buttonText: {
    color: '#fff', 
    fontSize: 14, 
    textAlign: 'center',  
}, 
}); 

export default BotonReutilizable;