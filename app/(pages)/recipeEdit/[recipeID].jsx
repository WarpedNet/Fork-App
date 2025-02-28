import { View, Text, TextInput, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, ButtonGroup, Icon, Input } from "@rneui/themed"
import { MaterialCommunityIcons } from '@expo/vector-icons'  
import { router, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from "buffer"
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
  // Getting the select recipe data from the database
  const getRecipe = async (id) => {
    const db = await SQLite.openDatabaseAsync("fork.db");
    const result = await db.getAllAsync("SELECT * FROM Forks WHERE ForkID = ?", id)
    setRecipe({name: result.recipe_name, desc: result.recipe_desc, method: result.recipe_method});
  }
  // Getting the icon image from the user, resizing it then formatting it into base64
  const getIconImage = async () => {
    let imageURI = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      aspect: [1,1]
    });
    // Resizing the icon image to something small
  const resizedImage = await ImageManipulator.manipulateAsync(imageURI.assets[0].uri, [{resize: {width: 200, height: 200}}], {format: ImageManipulator.SaveFormat.PNG, base64:true})
    setRecipe({...recipe, icon: resizedImage.base64})
  }

  // Getting the banner image from the user, resizing it then formatting it into base64 (different aspect ratio to the icon)
  const getBannerImage = async () => {
    // Expo image picker allowing the user to pick an image from their phone library
    let imageURI = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      aspect: [3,1]
    });
  
    // Resizing the image to a set dimension and saving it as base 64, then storing that inside the useState for the page
  const resizedImage = await ImageManipulator.manipulateAsync(imageURI.assets[0].uri, [{resize: {width: 600, height: 200}}], {format: ImageManipulator.SaveFormat.PNG, base64:true})
    setRecipe({...recipe, bannerimg: resizedImage.base64})
  }

  // Automatically get the recipe on page load
  useEffect(() => {
    getRecipe(recipeID);
  }, [])

  // Takes the information from the useState and saves it into the local database
  const saveRecipeLocal = async() => {
    if (recipe.name.length > 1) {
      const db = await SQLite.openDatabaseAsync("fork.db");
      await db.execAsync("CREATE TABLE IF NOT EXISTS Forks (ForkID INTEGER PRIMARY KEY NOT NULL, recipe_name TEXT, icon TEXT, recipe_desc TEXT, recipe_method TEXT, banner_img TEXT)")
      // console.log("data:image/png;base64,"+recipe.icon)
      // await db.runAsync("INSERT INTO forks (recipe_name, icon, recipe_desc, recipe_method, banner_img) VALUES (?,?,?,?,?)", recipe.name, "data:image/png;base64,"+recipe.icon, recipe.desc, recipe.method, recipe.bannerimg)
      const statement = await db.prepareAsync('INSERT INTO forks (recipe_name, icon, recipe_desc, recipe_method, banner_img) VALUES ($name, $icon, $desc, $method, $bannerimg)')
      await statement.executeAsync({$name: recipe.name, $icon: recipe.icon, $desc: recipe.desc, $method: recipe.method, $bannerimg: recipe.bannerimg})
      // await db.runAsync("INSERT INTO forks (recipe_name, recipe_desc, recipe_method) VALUES (?,?,?)", recipe.name, recipe.desc, recipe.method)
      router.push("/viewLocal")
    }
  }
  
  return (
    <SafeAreaView>
      <View className="h-[50vh] w-full">
          <Input value={recipe.name} errorMessage='You need a recipe name!' rightIcon={<MaterialCommunityIcons name='silverware-fork' size={20} />} onChangeText={(e) => setRecipe({...recipe, name: e})} placeholder="Your Recipe Name"/>
          <Input value={recipe.desc} onChangeText={(e) => setRecipe({...recipe, desc: e})} placeholder="Description. 30 words max!"/>
          <Input value={recipe.method} onChangeText={(e) => setRecipe({...recipe, method: e})} placeholder="Method. Use commas to separate your steps, and be concise!"/>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getIconImage()}><Text className="text-center text-xl">Icon Image</Text></Button>
          <View className="h-[10vh] w-full justify-center items-center"> 
            <Image source={{uri: "data:image/png;base64,"+recipe.icon}} width={100} height={100}></Image>
            </View>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getBannerImage()}><Text className="text-center text-xl">Banner Image</Text></Button>
          <View className="h-[10vh] w-full justify-center items-center">
          <Image source={{uri: "data:image/png;base64,"+recipe.bannerimg}} width={300} height={100}></Image>
          </View>
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <Divider width={220} color='white' className="align-bottom"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" iconRight={<MaterialCommunityIcons name='silverware-fork' size={20} />} onPress={() => saveRecipeLocal()}><Text className="text-center text-xl">Save Local</Text></Button>
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => router.push("../viewLocal")}><Text className="text-center text-xl">Cancel</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default recipeEditPage