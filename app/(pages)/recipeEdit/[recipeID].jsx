import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, Input } from "@rneui/themed"
import { MaterialCommunityIcons } from '@expo/vector-icons'  
import { router, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from "expo-image-manipulator"

const recipeEdit = () => {

  const { recipeID } = useLocalSearchParams();

  // Stores the recipe info
  const [recipe, setRecipe] = useState(null);

  // Image picker (allows user to select an image from their library)
  async function pickImage(aspectX, aspectY, resX, resY) {
    // Picks the image from the user allowing them to edit the aspect ratio of the image
    const imageURI = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      aspect: [aspectX,aspectY]
    });

    // Resizes the image to better fit the use case and converts it to base64 for storage
    const resizedImage = await ImageManipulator.manipulateAsync(
      imageURI.assets[0].uri,
      [{
        resize: {
          width: resX,
          height: resY
        }
      }],
      {
        format: ImageManipulator.SaveFormat.PNG,
        base64:true
      }
    );

    return resizedImage;
  }

  // Functions to provide an easier method of getting the images using the function above
  async function getBannerImage() {
    const image = await pickImage(3, 1, 600, 200);
    setRecipe({...recipe, banner: image.base64});
  }
  async function getIconImage() {
    const image = await pickImage(1, 1, 200, 200);
    setRecipe({...recipe, icon: image.base64});
  }

  async function getRecipe() {
    const db = await SQLite.openDatabaseAsync("fork.db");
    const statement = await db.prepareAsync("SELECT * FROM forks WHERE id = $id");
    try {
        const queryResult = await statement.executeAsync({$id: recipeID});
        setRecipe(await queryResult.getFirstAsync());
    }
    finally {
        await statement.finalizeAsync()
        await db.closeAsync();
    }
  }

  // Updates recipe in the database (recipe must have a name)
  async function saveRecipeLocal() {
    if (recipe.name) {
      const db = await SQLite.openDatabaseAsync("fork.db");
      const statement = await db.prepareAsync(`UPDATE forks SET
        centralID = $centralID,
        parentID = $parentID,
        creator_name = $creator_name,
        name = $name,
        description = $description,
        method = $method,
        banner = $banner,
        icon = $icon,
        count = $count
        WHERE id = $id
      `);
      try {

        await statement.executeAsync({
          $centralID: recipe.centralID,
          $parentID: recipe.parentID,
          $creator_name: recipe.creator_name,
          $name: recipe.name,
          $description: recipe.description,
          $method: recipe.method,
          $banner: recipe.banner,
          $icon: recipe.icon,
          $count: recipe.count,
          $id: recipeID});
      }
      catch (error) {
        alert("Could not update recipe: "+error)
      }
      finally {
        await statement.finalizeAsync();
        await db.closeAsync();
        router.back();
      }
    }
  }
  
  useEffect(() => {
    getRecipe();
  }, [])
  
  if (!recipe) {
    return (<View><Text>Loading...</Text></View>);
  }
  return (
    <SafeAreaView>
      <View className="h-[50vh] w-full">
          <Input value={recipe.name} errorMessage='You need a recipe name!' rightIcon={<MaterialCommunityIcons name='silverware-fork' size={20} />} onChangeText={(e) => setRecipe({...recipe, name: e})} placeholder="Your Recipe Name"/>
          <Input value={recipe.description} onChangeText={(e) => setRecipe({...recipe, description: e})} placeholder="Description. 30 words max!"/>
          <Input value={recipe.method} onChangeText={(e) => setRecipe({...recipe, method: e})} placeholder="Method. Use commas to separate your steps, and be concise!"/>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getIconImage()}><Text className="text-center text-xl">Icon Image</Text></Button>
          <View className="h-[10vh] w-full justify-center items-center"> 
            <Image source={{uri: "data:image/png;base64,"+recipe.icon}} width={100} height={100}></Image>
            </View>
          <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => getBannerImage()}><Text className="text-center text-xl">Banner Image</Text></Button>
          <View className="h-[10vh] w-full justify-center items-center">
          <Image source={{uri: "data:image/png;base64,"+recipe.banner}} width={300} height={100}></Image>
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

export default recipeEdit