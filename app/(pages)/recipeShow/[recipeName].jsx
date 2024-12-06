import { View, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Text, Button } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router, useLocalSearchParams } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'

const recipeShow = () => {

const [recipe, setrecipe] = useState({
  name: "",
  icon: "",
  desc: "",
  method: "",
  bannerimg: ""
})
const { recipeName } = useLocalSearchParams()

const deleteRecipe = async() => {
  const db = await SQLite.openDatabaseAsync("fork.db");
  await db.runAsync("DELETE FROM Forks WHERE recipe_name = ?", recipeName)
  router.push("/viewLocal")
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
          <Text>{recipe.name}</Text>
          <Image source={{uri: "data:image/png;base64,"+recipe.icon}} width={100} height={100}></Image>
          <Text>{recipe.desc}</Text>
          <Text>{recipe.method}</Text>
          <Image source={{uri: "data:image/png;base64,"+recipe.bannerimg}} width={600} height={200}></Image>
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <Divider width={3} color="black" className="align-bottom"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => deleteRecipe()}><Text className="text-center text-xl">Delete</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
    </View>
  )
}

export default recipeShow