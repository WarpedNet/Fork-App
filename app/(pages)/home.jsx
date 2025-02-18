import React from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"; 
import {Text, View, Button, TouchableOpacity, VirtualizedList} from "react-native";
import { Avatar, Header} from "@rneui/base";
import { Image, SearchBar } from '@rneui/themed';
import ForkComponent from "../../components/ForkComponent";
import { router } from "expo-router";;
// generating dummy data for a list 
const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: 'Recipe ${index + 1}',
  });

const getItemCount = _data => 40;

const Item = ({title}) => (
  <View style={{height:100, marginVertical: 1, backgroundColor:'white', justifyContent: 'center', borderColor: 'black', borderTopWidth: 5}}>
    <Text>{title}</Text>
  </View>
)

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* big title for the thing */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}}leftComponent={{icon: 'home', style:{fontSize: 20}}} centerComponent={{text: 'Home', style:{fontSize: 20, fontWeight: "bold"}}} />
        <SearchBar platform={'android'} lightTheme={"true"} placeholder="Find Forks..." />
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
        initialNumToRender={5}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  )
}

 
