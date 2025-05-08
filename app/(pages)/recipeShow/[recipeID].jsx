import { View, Image, ScrollView } from 'react-native'
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
  const [ingredients, setIngredients] = useState([]);

  async function getRecipe() {
    const db = await SQLite.openDatabaseAsync('fork.db');
    const statement = await db.prepareAsync('SELECT * FROM forks WHERE id = $id;');
    const getRecipeIngredients = await db.prepareAsync('SELECT ingredientid FROM fork_ingredients WHERE forkid = $forkid;')
    const getIngredients = await db.prepareAsync('SELECT * FROM ingredients WHERE id = $id')
    try {
      const queryResult = await statement.executeAsync({$id: recipeID});
      setrecipe(await queryResult.getFirstAsync());

      var recipeIngredients = await (await getRecipeIngredients.executeAsync({$forkid: recipeID})).getAllAsync();
      
      recipeIngredients.forEach(async (id) => {
        const ingredient = await (await getIngredients.executeAsync({$id: id.ingredientid})).getFirstAsync();
        ingredients.push(ingredient);
        await ingredient.resetAsync();
      });
    }
    catch (error) {
      alert("Could not fetch recipe: "+error)
    }
    finally {
      await statement.finalizeAsync();
      await getRecipeIngredients.finalizeAsync();
      await getIngredients.finalizeAsync();
      await db.closeAsync();
    }
  }

  async function deleteRecipe() {
    const db = await SQLite.openDatabaseAsync('fork.db');
    const statement = await db.prepareAsync('DELETE FROM forks WHERE id = $id;');
    try {
      await statement.executeAsync({$id: recipe.id});
    }
    catch (error) {
      alert("Failed to delete recipe: "+error)
    }
    finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      router.replace("../viewLocal");
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
          centralID: recipe.centralID,
          parentID: recipe.parentID,
          recipeName: recipe.name,
          recipeDesc: recipe.description,
          recipeMethod: recipe.method,
          bannerImg: recipe.banner,
          icon: recipe.icon,
          ingredients: ingredients
        }),
      });

      if (response.status == 200) {
        const centralID = await response.json()
        const db = await SQLite.openDatabaseAsync("fork.db");

        const statement = await db.prepareAsync(`UPDATE forks SET
          centralID = $centralID
          WHERE id = $id
        `);

        try {
          await statement.executeAsync({centralID: centralID,id: recipe.id})
          alert("Fork Created!");

        }
        catch (error) {
          alert("Failed to update local database!: "+error)
        }
        finally {
          await statement.finalizeAsync();
          await db.closeAsync();
          router.back()
        }
      }
      else if (response.status == 401) {
        alert("Login token expired");
        router.push("login");
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
        <ScrollView className="h-full w-full">
            <Image source={{uri: "data:image/png;base64,"+recipe.banner}} width={600} height={200}></Image>
            <Text className="text-xl font-bold md: text-base font-bold text-center">{recipe.recipeName}</Text>
            <Text>{recipe.recipeDesc}</Text>
            <Text>{recipe.method}</Text>
            {/* Bottom Bar */}
            <View className="h-3/4">
              <Divider width={3} color="black" className="align-bottom h-2/3"></Divider>
              <View className="flex-col gap-8 justify-center items-center mb-4 mt-2">
                <Button className="dark:bg-secondary-300 w-[10vw] h-[10vw]" onPress={() => {uploadRecipe()}}><Text className="text-center text-m">Upload Recipe</Text></Button>
                <Button size="sm" color="green" onPress={() => router.replace({pathname: "../recipeEdit/[recipeID]", params: {recipeID: recipeID}})}>Edit</Button>
                <Button size="sm" color="green" onPress={() => {deleteRecipe()}}>Delete</Button>
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default recipeShow