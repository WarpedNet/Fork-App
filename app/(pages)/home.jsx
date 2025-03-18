import React from "react";
import {useState, useEffect} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"; 
import {Text, Image, View, Button, TouchableOpacity, VirtualizedList,ActivityIndicator} from "react-native";
import { Avatar, Header} from "@rneui/base";
import { SearchBar } from '@rneui/themed';
import ForkComponent from "../../components/ForkComponent";
import { router } from "expo-router";;
// generating dummy data for a list

const getItem = (data, index) => ({
  id: data[index].fork_id,
  title: data[index].recipe_name,
  description: data[index].recipe_desc,
  icon: data[index].recipe_icon,
  });

// this prop takes dummy data that can be replaced by SQL queries to show title and desc of recipe
// ontouch will take user to recipe page by the ID of the recipe
const Item = ({title, description, icon}) => (
  <View className="rounded-xl p-10" style={{height:100, marginVertical: 10, backgroundColor:'white', justifyContent: 'center', borderColor: 'grey', borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth:2, borderRightWidth:2}}>
    <TouchableOpacity>
    <Text className="text-xl font-bold">{title}</Text>
    <Text className="text-sm font-thin">{description}</Text>
    </TouchableOpacity>
    {/* If the icon is null, set default image */}
    <Image className="absolute right-20 w-10 h-10" source={(icon != null) ? {uri: "data:image/png;base64,"+icon} : require("../../assets/pie.jpg")}/>
  </View>
)

export default function Home() { 
  // Stores the recipies fetched from database
  const [recipes, setrecipes] = useState(null); 
  // Fetches data from api on page load
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Uses expo's .env file feature (All entries in the .env file must start with EXPO_PUBLIC for expo to recognise them)
        const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
        const response = await fetch(`${api_address}/fork`);
        const data = await response.json();
        setrecipes(data);
      }
      catch (error) {
        alert(`${api_address}`);
      }
    }
    fetchRecipes()
  }, [])
  
  // Prevents render until data is fetched (Man I love async)
  if (recipies == null) {
    return (<ActivityIndicator />)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* big title for the thing */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}}leftComponent={{icon: 'home', style:{fontSize: 20}}} centerComponent={{text: 'Home', style:{fontSize: 20, fontWeight: "bold"}}} />
        <SearchBar platform={'android'} lightTheme={"true"} placeholder="Find Forks..." />
        <Image className="absolute w-10 h-10" source={require('../../assets/pie.jpg')}/>
        {/* for searchBar: search function for onChangeText */}
        <Text className="text-center">Browse the forks, or:</Text>
        <View style={[{width: "40%", position:"absolute", top:220, right:120, backgroundColor: "green"}]}>
          <Button  //button takes you to online version of fork edit
          title="Create your Own!"
          color="lime"
           />
        </View>
        {/* creating a virtualized list, this is for saving memory when we have multiple recipes, it will only visualize a set amount at a time (in this case, 5) */}
        <VirtualizedList style={{flex:1, marginTop:50}}
        data={recipes}
        initialNumToRender={5}
        renderItem={({item}) => <Item title={item.title} description={item.description} icon={item.icon} />}
        keyExtractor={item => item.id}
        getItemCount={(data) => data.length}
        getItem={getItem}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  )
}
