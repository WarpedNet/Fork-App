import { View, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Text, Button } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router, useLocalSearchParams } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'

const recipeShow = () => {

  const { recipeID } = useLocalSearchParams();
  const [recipe, setrecipe] = useState(null);

  async function getRecipe() {
    const db = await SQLite.openDatabaseAsync('fork.db');
    const statement = await db.prepareAsync('SELECT * FROM forks WHERE id = $id;');
    try {
      const queryResult = await statement.executeAsync({$id: recipeID});
      setrecipe(await queryResult.getFirstAsync());
    }
    finally {
      statement.finalizeAsync();
    }
  }

  async function deleteRecipe() {
    const db = await SQLite.openDatabaseAsync('fork.db');
    const statement = await db.prepareAsync('DELETE FROM forks WHERE id = $id;');
    try {
      await statement.executeAsync({$id: recipe.id});
    }
    finally {
      await statement.finalizeAsync();
      router.push("../viewLocal");
    }
  }

  async function uploadRecipe() {
    try {
      const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
      const userToken = await SecureStore.getItemAsync("FORK_USER_TOKEN")
      const response = await fetch(`${api_address}/fork`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userToken,
          parentID: null,
          recipeName: recipe.name,
          recipeDesc: recipe.description,
          recipeMethod: recipe.method,
          bannerImg: recipe.banner,
          icon: recipe.icon,
        }),
      });
      if (response.status == 401) {
        alert("Login token expired");
        router.push("login");
      }
      if (response.status == 200) {
        alert("Fork Created!");
      }
    }
    catch (error) {
      alert("Error uploading recipe: "+error);
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])

  if (!recipe) {
    return (<View><Text>Loading...</Text></View>);
  }
  return (
    <View>
      <SafeAreaView>
        <View className="h-full w-full">
            <Text>{recipe.name}</Text>
            <Image source={{uri: "data:image/png;base64,"+recipe.icon}} width={100} height={100}></Image>
            <Text>{recipe.description}</Text>
            <Text>{recipe.method}</Text>
            <Image source={{uri: "data:image/png;base64,"+recipe.banner}} width={600} height={200}></Image>
            {/* Bottom Bar */}
            <View className="h-[10vh]">
              <Divider width={3} color="black" className="align-bottom"></Divider>
              <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
                <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => router.push(`../recipeEdit/${recipeID}`)}><Text className="text-center text-xl">Edit</Text></Button>
                <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => uploadRecipe()}><Text className="text-center text-xl">Upload</Text></Button>
                <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => deleteRecipe()}><Text className="text-center text-xl">Delete</Text></Button>
              </View>
            </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default recipeShow