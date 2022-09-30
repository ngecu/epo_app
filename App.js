import React,{useState, useEffect,usState} from 'react';
import MapView,{Marker,Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Alert,Button } from 'react-native';

export default function App() {

  const [locations, updateLocations] = useState('')

  const [titleText, setTitleText] = useState("Music App");
  const [bodyText, setbodyText] = useState("Music App");

  


  useEffect(() => {
       
    fetchLocations()
  }, [])

  const fetchLocations = () =>{

    fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=locations")
    .then((res) => res.json())
    .then((json) => {
        const samplelocation_array = json.locations
        console.log("sample_locations ",samplelocation_array.length)
        updateLocations(samplelocation_array)
      
    })
    .catch(error => {
        // handle the error
    });



}

const onPressTitle = () => {
  setTitleText("Bird's Nest [pressed]");
};

  return (
    <View style={{marginTop:50,flex:1}}>

<Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {"\n"}
        {"\n"}
      </Text>
      <Text numberOfLines={5}>{bodyText}</Text>
    </Text>

      <MapView 

initialRegion={{
   
  // latitude: -0.795704,
  // longitude: 37.132202,
  latitude:-37.0543789815584,
  longitude:145.8693861464103,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}
      
      style={styles.map} >
          {locations.length > 0 && locations.map(l => (
        <Marker coordinate={{  
          
          
          latitude: Number(l.latlong.split(",")[0]),
          longitude: Number(l.latlong.split(",")[1])}} >

            <Callout
            onPress={() => Alert.alert('Simple Button pressed')}
            >
     

              <Text>{l.location}</Text>
              </Callout>
          </Marker>
          ))}
         </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
