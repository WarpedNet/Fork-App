import { View, Text, TextInput, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button } from "@rneui/themed"
import { router, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from "expo-image-manipulator"

const recipeEditPage = () => {

  const { recipeID } = useLocalSearchParams();

  const [recipe, setRecipe] = useState({
    name: "",
    icon: "",
    desc: "",
    method: "",
    bannerimg: ""
  });

  const getRecipe = async (id) => {
    const db = await SQLite.openDatabaseAsync("fork.db");
    const result = await db.getAllAsync("SELECT * FROM Forks WHERE ForkID = ?", id)
    setRecipe({name: result.recipe_name, desc: result.recipe_desc, method: result.recipe_method});
  }

  const getIconImage = async () => {
    let imageURI = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      aspect: [1,1]
    });

  const resizedImage = await ImageManipulator.manipulateAsync(imageURI.assets[0].uri, [{resize: {width: 100, height: 100}}], {format: ImageManipulator.SaveFormat.PNG, base64:true})
    // setRecipe({...recipe, icon: {base64:"data:image/png;base64"+resizedImage}})
    setRecipe({...recipe, icon: resizedImage})
  }

  const getBannerImage = async () => {
    let imageURI = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      aspect: [1,1]
    });

  const resizedImage = await ImageManipulator.manipulateAsync(imageURI.assets[0].uri, [{resize: {width: 600, height: 200}}], {format: ImageManipulator.SaveFormat.PNG, base64:true})
    // setRecipe({...recipe, icon: {base64:"data:image/png;base64"+resizedImage}})
    setRecipe({...recipe, bannerimg: resizedImage})
  }

  useEffect(() => {
    getRecipe(recipeID);
    
  }, [])

  const saveRecipeLocal = async() => {
    const db = await SQLite.openDatabaseAsync("fork.db");
    await db.execAsync("CREATE TABLE IF NOT EXISTS Forks (ForkID INTEGER PRIMARY KEY NOT NULL, recipe_name TEXT, icon TEXT, recipe_desc TEXT, recipe_method TEXT, banner_img TEXT)")
    await db.runAsync("INSERT INTO forks (recipe_name, icon, recipe_desc, recipe_method, banner_img) VALUES (?,?,?,?)", recipe.name, recipe.icon, recipe.desc, recipe.method, recipe.bannerimg)
  }
  
  return (
    <SafeAreaView>
      <View className="h-full w-full">
          <TextInput value={recipe.name} onChangeText={(e) => setRecipe({...recipe, name: e})} title="RecipeName"/>
          <Image source={recipe.icon} width={100} height={100}></Image>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getIconImage()}><Text className="text-center text-xl">Icon Image</Text></Button>
          <TextInput value={recipe.desc} onChangeText={(e) => setRecipe({...recipe, desc: e})} title="RecipeDesc"/>
          <TextInput value={recipe.method} onChangeText={(e) => setRecipe({...recipe, method: e})} title="RecipeMethod"/>
          <Image source={recipe.bannerimg} width={600} height={200}></Image>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getBannerImage()}><Text className="text-center text-xl">Banner Image</Text></Button>
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <Divider width={3} color="black" className="align-bottom"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => saveRecipeLocal()}><Text className="text-center text-xl">Save Local</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default recipeEditPage