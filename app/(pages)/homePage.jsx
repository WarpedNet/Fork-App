import { View, Text, VirtualizedList, ActivityIndicator } from 'react-native'
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
  
  async function search(query) {
    const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
    const response = await fetch(`${api_address}/search/${query}`);
    const data = await response.json();
    setrecipes(data);
  }
  // Prevents render until data is fetched (Man I love async)
  if (recipes == null) {
    return (<ActivityIndicator />)
    }

    return (
    <SafeAreaView className="flex flex-col gap-4">
            <View className=" relative w-3/5 h-1/9" >
                <Text className="text-xl text-center font-bold">Welcome, User</Text>
                <View className="flex flex-row">
                <Button color="green" className="gap-10" buttonStyle={{borderRadius:5, width: 125}}>Account</Button>
                <Text>                                      </Text>
                <Button color="green" buttonStyle={{borderRadius:5, width: 125}}>Your Forks</Button>
                </View>
            </View>

            <View className=" relative inset-y-0 w-full h-1/4 border-solid border-2 rounded">
                <Text className="text-lg text-center font-bold">Popular Forks</Text>
        <VirtualizedList style={{flex:1, marginTop:50}}
        data={recipes}
        initialNumToRender={3}
        renderItem={({item}) => <RecipeIconDisplay id={item.item.id} title={item.item.title} description={item.item.description} icon={item.item.icon} />}
        keyExtractor={item => item.id}
        getItemCount={(data) => data.length}
        getItem={getItem}
        />
            </View>

    </SafeAreaView>
    )
}
