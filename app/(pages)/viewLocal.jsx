import { View, Text, VirtualizedList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, Header } from "@rneui/themed"
import { router } from 'expo-router'



const viewLocal = () => {
  const [recipes, setrecipes] = useState(null)

  useEffect(() => {
    async function getData() {
      const db = await SQLite.openDatabaseAsync("fork.db");
      try {
    
        const result = await db.getAllAsync("SELECT * FROM forks")
        setrecipes(result)
      }
      catch (error) {
        alert("Could not fetch recipies: "+error)
      }
      finally {
        await db.closeAsync();
      }
    }
    getData()
  }, [])
  
  const deleteDB = async() => {
    try {
      await SQLite.deleteDatabaseAsync("fork.db")
    }
    catch (error) {
      alert("Could not delete database: "+error)
    }
  }
  
  const RecipeIconDisplay = ({ID, recipeName, icon}) => {
    return (
      <View className="mx-5 my-2 justify-center items-center">
        <TouchableOpacity onPress={()=>{router.replace({pathname: '/recipeShow/[recipeID]', params: {recipeID: ID}})}}>
          <Image source={{uri: "data:image/png;base64,"+icon}} width={100} height={100} className="bg-secondary-200"></Image>
        </TouchableOpacity>
        <Text>{recipeName}</Text>
      </View>
    )
  }

  const getItem = (data, index) => (
    {
    id: data[index].id,
    title: data[index].name,
    description: data[index].description,
    icon: data[index].icon,
    });

  if (!recipes) {
    return (
      <SafeAreaView>
      <View className="h-full w-full">
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => { router.push("./recipeCreate")}}><Text className="text-center text-xl">Create Recipe</Text></Button>
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => {deleteDB()}}><Text className="text-center text-xl">Delete All</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
    )
  }
  return (
    <SafeAreaView>
      <View className="h-full w-full">
      <View>
          <Text className="text-xl text-center rounded-sm p-5 font-bold">Welcome, User</Text>
          <View className="flex flex-row gap-5">
            <Button color="green" onPress={() => router.replace("./homePage")} buttonStyle={{borderRadius:5, width: 110, marginLeft:10, marginBottom: 10 }}>homePage</Button>
          </View>
      </View>
        <VirtualizedList style={{flex:1, marginTop:50}}
        data={recipes}
        renderItem={(recipe) => <RecipeIconDisplay ID={recipe.item.id} recipeName={recipe.item.title} icon={recipe.item.icon}/>}
        keyExtractor={item => item.id}
        getItemCount={(data) => data.length}
        getItem={getItem}
        />

          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => { router.navigate("./recipeCreate")}}><Text className="text-center text-xl">Create Recipe</Text></Button>
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => {deleteDB()}}><Text className="text-center text-xl">Delete All</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default viewLocal
