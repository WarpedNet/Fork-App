import { View, Text, VirtualizedList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, Header } from "@rneui/themed"
import { router } from 'expo-router'


export default function homePage() {
    

const getItem = (data, index) => ({
  id: data[index].id,
  title: data[index].name,
  description: data[index].description,
  icon: data[index].icon,
  });

const Item = ({id, title, description, icon}) => (
  <View className="rounded-xl p-10" style={{height:100, marginVertical: 10, backgroundColor:'white', justifyContent: 'center', borderColor: 'grey', borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth:2, borderRightWidth:2}}>
    <TouchableOpacity onPress={()=>{router.push({pathname: '/recipeShowOnline/[pgRecipeName]', params: {recipeID: id}})}}>
      <Text className="text-xl font-bold">{title}</Text>
      <Text className="text-sm font-thin">{description}</Text>
    </TouchableOpacity>
    {/* If the icon is null, set default image */}
    <Image className="absolute right-20 w-10 h-10" source={(icon != null) ? {uri: "data:image/png;base64,"+icon} : require("../../assets/pie.jpg")}/>
  </View>

)
  const [recipes, setrecipes] = useState(null); 
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
        alert(`Failed to connect to API`);
        router.back();
      }
    }
    fetchRecipes()
  }, [])
  // Prevents render until data is fetched (Man I love async)
  if (recipes == null) {
    return (<ActivityIndicator />)
  }

  return (
  <SafeAreaView className="bg-primary w-full h-full">
    <Header backgroundColor="green" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Home', style:{fontSize: 20, fontWeight: "bold"}}} />
    <View>
        <Text className="text-xl text-center rounded-sm p-5 font-bold">Welcome, User</Text>
        <View className="flex flex-col gap-5">
          <View className="flex flex-row gap-5">
            <Button color="green" onPress={() => router.push("./accounts/account")} buttonStyle={{borderRadius:5, width: 110, marginLeft:10, marginBottom: 10 }}>Account</Button>
            <Button color="green" buttonStyle={{borderRadius:5, width: 110}}>Your Forks</Button>
            <Button color="green" onPress={() => router.push("./viewOnline")} buttonStyle={{borderRadius:5, width: 110}}>All Forks</Button>
          </View>
          <View className="flex flex-row gap-5">
            <Button color="green" onPress={() => router.push("./viewLocal")} buttonStyle={{borderRadius:5, width: 110, marginLeft:10, marginBottom: 10 }}>Local Forks</Button>
          </View>
        </View>
    </View>

    <View className="rounded-xl w-full h-full">
      <Text className="text-lg text-center font-bold">Popular Forks</Text>
      <VirtualizedList style={{flex:1, marginTop:10, marginLeft:10, width: 375}}
      data={recipes}
      initialNumToRender={10}
      windowSize={100}
      renderItem={({item}) => <Item id={item.id} title={item.title} description={item.description} icon={item.icon} />}
      keyExtractor={item => item.id}
      getItemCount={(data) => data.length}
      getItem={getItem}
      />
    </View>

  </SafeAreaView>
  )
}
