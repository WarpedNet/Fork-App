import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { ButtonGroup, Divider } from '@rneui/base'
import { Button, Input, Overlay, CheckBox } from "@rneui/themed"
import { MaterialCommunityIcons } from '@expo/vector-icons'  
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from "expo-image-manipulator"




const createRecipe = () => {

  // Stores the recipe info
  const [recipe, setRecipe] = useState({
    creator_name: null,
    name: "",
    description: "",
    method: "",
    banner: "",
    icon: "",
    ingredients: "",
    image: "",
    count: null
  });


  const [visible, setVisible] = useState(false);

const toggleIngredients = () => {
  setVisible(!visible)
}


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


  //function to allow the user to select ingredients (or pick new ones if they do not exist in the db)
  //since this is a local db we can just save them locally
  /*async function retrieveIngredients() {
    const db = await.SQLite.openDatabaseAsync("fork.db");
    const statement = await.db.prepareAsync('SELECT FROM forks (ingredients) VALUES ($ingredients)');
    try {
      await statement.executeAsync({
        $ingredients = recipe.ingredients,
      })
    }
    finally {
      await statement.finalizeAsync();
    }
  }
  */


  // Saves the current recipe data locally to the device (recipe must have a name)
  // add ingredients to this func
  async function saveRecipeLocal() {
    if (recipe.name.length > 0) {
      const db = await SQLite.openDatabaseAsync("fork.db");
      const statement = await db.prepareAsync('INSERT INTO forks (centralID, creator_name, name, description, method, banner, icon, image, count) VALUES ($centralID ,$creator_name, $name, $description, $method, $banner, $icon, $image, $count);');
      try {
        await statement.executeAsync({
          $centralID: null,
          $creator_name: recipe.creator_name,
          $name: recipe.name,
          $description: recipe.description,
          $method: recipe.method,
          $banner: recipe.banner,
          $icon: recipe.icon,
          $image: recipe.image,
          $count: recipe.count
          //$ingredients: recipe.ingredients or whatever we call it in db
        })
      }
      finally {
        await statement.finalizeAsync();
        router.push("../viewLocal");
      }
    }
  }

  return (
    <SafeAreaView>
      <View className="h-[50vh] w-full">
          <Input value={recipe.name} errorMessage='You need a recipe name!' rightIcon={<MaterialCommunityIcons name='silverware-fork' size={20} />} onChangeText={(e) => setRecipe({...recipe, name: e})} placeholder="Your Recipe Name"/>
          <Input value={recipe.description} onChangeText={(e) => setRecipe({...recipe, description: e})} placeholder="Description. 30 words max!"/>
          <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => toggleIngredients()}><Text className="text-center text-xl">Add Ingredients</Text></Button>
        <Overlay isVisible={visible} fullscreen={true}  onBackdropPress={toggleIngredients}>
          <Input onChangeText={console.log("changed ingredient")/*(e) => setRecipe{... recipe, ingredients: e*/} placeholder="Add new ingredient"/>
            <ButtonGroup buttons={['REPLACE', 'WITH', 'recipe.ingredients']}
            onPress={(value) => {
            //replace with a getRecipe call
             console.log(value);

            }}
         />
        </Overlay>


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

export default createRecipe
