import { View, Image, ScrollView, TextInput } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Text, Button, Rating } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'


//should change it so that it pushes here from the home one
//this is the online version
//idk why it doesn't show the recipe data but do i look like i know what i'm doing?
const recipeShow = () => {
  const [recipe, setrecipe] = useState({
    creatorName: "",
    recipeName: "",
    recipeDesc: "",
    method: "",
    banner: "",
    icon: "",
    count: "",
  })
  const { recipeID } = useLocalSearchParams()

  const BackToHome = async() => {
    router.replace("/home")
  }

    //dummy funcs for the buttons to submit ratings + comments
  const submitRating = async() => {
      console.log("sent rating")
    }

  const submitComment = async() => {
      console.log("sent comment")
    }
  useEffect(() => {
    async function getRecipe() {
      try {
        // Uses expo's .env file feature (All entries in the .env file must start with EXPO_PUBLIC for expo to recognise them)
        const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
        const response = await fetch(`${api_address}/fork/${recipeID}`);
        const data = await response.json();
        setrecipe({
          creatorName: data.creatorName,
          recipeName: data.recipeName,
          recipeDesc: data.recipeDesc,
          method: data.method,
          banner: data.banner,
          icon: data.icon,
          count: data.count,
        });
      }
      catch (error) {
        alert(`Failed to connect to API`);
      }
    }
    getRecipe()
  }, [])

  async function saveRecipe() {
    
    const db = await SQLite.openDatabaseAsync("fork.db");
    const statement = await db.prepareAsync('INSERT INTO forks (centralID, creator_name, name, description, method, banner, icon, count) VALUES ($centralID, $creator_name, $name, $description, $method, $banner, $icon, $count);');
    try {
      await statement.executeAsync({
        $centralID: recipeID,
        $creator_name: recipe.creatorName,
        $name: recipe.recipeName,
        $description: recipe.recipeDesc,
        $method: recipe.method,
        $banner: recipe.banner,
        $icon: recipe.icon,
        $count: recipe.count
      })
      alert("Recipe Forked!")
      // router.replace("../homePage");
    }
    catch (error){
      alert("Error forking recipe: "+error)
    }
    finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      router.back()
    }
  }
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
              <Rating showRating fractions={0} startingValue="{0}" />
            <TextInput maxLength={40} placeholder="Comment on this..."/>
              <Button className="dark:bg-secondary-300 w-[10vw] h-[10vw]" onPress={() => submitRating()}><Text className="text-center text-m">Submit Rating + Comment</Text></Button>
              <Button size="sm" color="green" onPress={() => {saveRecipe()}}>Fork it!</Button>
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default recipeShow
