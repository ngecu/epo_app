import React,{useState, useEffect,usState} from 'react';
import MapView,{Marker,Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Alert,Button } from 'react-native';
import Swiper from 'react-native-swiper';

export default function App() {

  const [locations, updateLocations] = useState('')

  const [titleText, setTitleText] = useState("Music App");
  const [bodyText, setbodyText] = useState("Music App");
  const [locationid, setLocation] = useState("");
  const [samples,setSamples] = useState([]);
  const [samplelocations,updateSampleLocations] = useState("");
  

  


  useEffect(() => {
       
    fetchLocations()
    fetchSampleLocations()
  }, [locationid])

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

const fetchSampleLocations = () =>{

  fetch("http://wmp.interaction.courses/api/v1/?apiKey=2izT6jiZ&mode=read&endpoint=samples_to_locations")
  .then((res) => res.json())
  .then((json) => {
      const samplelocation_array = json.samples_to_locations
      console.log("sample_locations sadasdasdasd",json.samples_to_locations)

      // samplelocation_array.filter((samplel)=>{
      //   return samplel.locationid == lcocation.id
      // }))
      updateSampleLocations(samplelocation_array)
    
  })
  .catch(error => {
      // handle the error
  });



}


const onPressTitle = () => {
  setTitleText("Bird's Nest [pressed]");
};

  return (

    
//     <View style={{marginTop:50,flex:1}}>

// <Text style={styles.baseText}>
//       <Text style={styles.titleText} onPress={onPressTitle}>
//         {titleText}
//         {"\n"}
//         {"\n"}
//       </Text>
//       <Text numberOfLines={5}>{bodyText}</Text>
//     </Text>

//       <MapView 

// initialRegion={{
   
//   // latitude: -0.795704,
//   // longitude: 37.132202,
//   latitude:-37.0543789815584,
//   longitude:145.8693861464103,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// }}
      
//       style={styles.map} >
//           {locations.length > 0 && locations.map(l => (
//         <Marker coordinate={{  
          
          
//           latitude: Number(l.latlong.split(",")[0]),
//           longitude: Number(l.latlong.split(",")[1])}} >

//             <Callout
//             onPress={() => Alert.alert('Simple Button pressed')}
//             >
     

//               <Text>{l.location}</Text>
//               </Callout>
//           </Marker>
//           ))}
//          </MapView>
//     </View>



<View style={{ flex: 1 }}>
  <View style={{ backgroundColor: 'gray', flex: 1 }} >
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
            onPress={() => setLocation(l.id)}
            >
     

              <Text>{l.location}</Text>
              </Callout>
          </Marker>
          ))}
         </MapView>
    </View>

  <View style={{ flex: 1 }}>
    <Swiper>
      
      
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'blue',
          justifyContent: 'center',
          height: Dimensions.get('window').height / 2
        }}>
      


      
        {samplelocations.length > 0 && samplelocations.map(l => (
          <>
          {l.locations_id == locationid ?(
  <Text style={{ color: 'white' }}>
  {l.samples_id}
</Text>
          ):(
            <Text style={{ color: 'white' }}>
            No Samples on this location
          </Text>
          )}
        </>
        ))}
      </View>
    </Swiper>
  </View>
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
