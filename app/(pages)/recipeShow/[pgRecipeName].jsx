import { View, Image, TextInput } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Text, Button, Rating } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router, useLocalSearchParams } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'


//should change it so that it pushes here from the home one
//this is the online version
//idk why it doesn't show the recipe data but do i look like i know what i'm doing?
const recipeShow = () => {

const [recipe, setrecipe] = useState({
  name: "",
  icon: "",
  desc: "",
  method: "",
  bannerimg: ""
})
const { recipeName } = useLocalSearchParams()

const BackToHome = async() => {
  router.push("/home")
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
    
    const db = await SQLite.openDatabaseAsync("fork.db");
    const result = await db.getFirstAsync("SELECT * FROM Forks WHERE recipe_name = ?", recipeName);
    setrecipe({
      name: result.recipe_name,
      icon: result.icon,
      desc: result.recipe_desc,
      method: result.recipe_method,
      bannerimg: result.banner_img
    })
  }
  getRecipe()
}, [])

  return (
    <View>
    <SafeAreaView>
      <View className="h-full w-full">
          <Text className="text-xl font-extrabold md: text-base font-bold text-center">{recipe.name}</Text>
          <Image source={{uri: "data:image/png;base64,"+recipe.icon}} width={100} height={100}></Image>
          <Text>{recipe.desc}</Text>
          <Text>{recipe.method}</Text>
          <Image source={{uri: "data:image/png;base64,"+recipe.bannerimg}} width={600} height={200}></Image>
          <TextInput className="absolute bottom-0 left-0" maxLength={40} placeholder="Comment on this..."/>
          {/* Bottom Bar */}
          <View className="h-2/4">
            <Divider width={3} color="black" className="align-bottom h-2/3"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
            <Rating showRating fractions="{1}" startingValue="{2.5}" />
            <Button className="dark:bg-secondary-300 w-[10vw] h-[10vw]" onPress={() => submitRating()}><Text className="text-center text-m">Submit Rating + Comment</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
    </View>
  )
}

export default recipeShow
