import AsyncStorage from "@react-native-async-storage/async-storage"; 

const NUMEROEMERGENCIA_KEY='KEY_NUMEROEMERGENCIA';
const URLVIDEO_KEY='KEY_URLVIDEO';
const URLAUDIO_KEY='KEY_URLAUDIO';
const BACKGROUND_KEY='background';

export default class Storage{ 

 
    //Elimina las credenciales almacenadas al cerrar sesión 
    eliminarCredenciales = async() => { 
        try{
            await AsyncStorage.removeItem(NUMEROEMERGENCIA_KEY); 
            await AsyncStorage.removeItem(URLVIDEO_KEY); 
            await AsyncStorage.removeItem(URLAUDIO_KEY); 
        }catch(e){
            console.log(e);
        }
    }; 

    almacenarCredenciales = async(numero, url1, url2) => { 
        //Almacena las credenciales en el asyncStorage
        //(para leerlas al iniciar la próxima vez) 
        try {    
            await AsyncStorage.setItem(NUMEROEMERGENCIA_KEY, numero);  
            await AsyncStorage.setItem(URLVIDEO_KEY, url1); 
            await AsyncStorage.setItem(URLAUDIO_KEY, url2); 
        } catch(e) {    
            console.log(e);
        }
    }; 

    obtenerCredenciales = async() => { 
     
        let storedNumero = await AsyncStorage.getItem(NUMEROEMERGENCIA_KEY);
        let storedUrlVideo = await AsyncStorage.getItem(URLVIDEO_KEY);
        let storedUrlAudio = await AsyncStorage.getItem(URLAUDIO_KEY);
        const returnValue = {'numeroEmergencia':storedNumero, 'urlVideo':storedUrlVideo, 'urlAudio':storedUrlAudio}; 
   
        return returnValue; 
    }; 

    guardarBackground = async(background) => { 
        //Almacena las credenciales en el asyncStorage
        try {    
            await AsyncStorage.setItem(BACKGROUND_KEY, background);  
            return true;
        } catch(e) {    
            console.log(e);
            return false;
        }
    }; 

    obtenerBackground = async() => { 
        let storedBackground = await AsyncStorage.getItem(BACKGROUND_KEY);
        const returnValue = storedBackground; 
        return returnValue; 
    }; 

}