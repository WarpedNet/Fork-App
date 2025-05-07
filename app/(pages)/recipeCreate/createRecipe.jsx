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
    count: null
  });

  const [ingredients, setIngredients] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  // Saves the current recipe data locally to the device (recipe must have a name)
  // add ingredients to this func
  async function saveRecipeLocal() {
    if (recipe.name.length > 0) {
      const db = await SQLite.openDatabaseAsync("fork.db");
      const statement = await db.prepareAsync('INSERT INTO forks (centralID, parentID, creator_name, name, description, method, banner, icon, count) VALUES ($centralID, $parentID, $creator_name, $name, $description, $method, $banner, $icon, $count) RETURNING id;');
      const saveIngredients = await db.prepareAsync('INSERT INTO fork_ingredients (forkid, ingredientid) VALUES ($forkid, $ingredientid)');
      try {
        const forkid = await (await statement.executeAsync({
          $centralID: null,
          $parentID: null,
          $creator_name: recipe.creator_name,
          $name: recipe.name,
          $description: recipe.description,
          $method: recipe.method,
          $banner: recipe.banner,
          $icon: recipe.icon,
          $count: recipe.count
        })).getFirstAsync();
        var recipeIngredients = selectedIngredients.map((index) => {return(ingredients[index].id)})
        recipeIngredients.forEach(async (id) => {
          try {
            const insertIngredient = await saveIngredients.executeAsync({
              $forkid: forkid.id,
              $ingredientid: id
            });
            await insertIngredient.resetAsync();
          }
          catch (error) {
            alert("Could not save ingredients: "+error)
          }
        })
      }
      catch (error) {
        alert("Could not save recipe: "+error)
      }
      finally {
        await statement.finalizeAsync();
        await saveIngredients.finalizeAsync();
        await db.closeAsync();
        router.replace("../viewLocal");
      }
    }
    else {
      alert("Recipe Name is required!")
    }
  }
  async function getIngredients() {
    const db = await SQLite.openDatabaseAsync("fork.db");
    try {
      const data = await db.getAllAsync("SELECT * FROM ingredients")
      setIngredients(data)
    }
    catch (error) {
      alert("Could not fetch ingredients from database: "+error)
    }
    finally {
      await db.closeAsync();
    }
  }

  async function createNewIngredient() {
    const db = await SQLite.openDatabaseAsync("fork.db");
    const statement = await db.prepareAsync(`INSERT INTO ingredients (name) VALUES ($name)`);
    try {
      await statement.executeAsync({$name: newIngredient});
    }
    catch (error) {
      alert("Could not update recipe: "+error)
    }
    finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      await getIngredients();
    }
  }
  useEffect(() => {
    getIngredients()
  }, [])
  
  if (!ingredients) {
    return (<View><Text>Loading...</Text></View>);
  }
  return (
    <SafeAreaView>
      <View className="h-[50vh] w-full">
          <Input value={recipe.name} rightIcon={<MaterialCommunityIcons name='silverware-fork' size={20} />} onChangeText={(e) => setRecipe({...recipe, name: e})} placeholder="Your Recipe Name"/>
          <Input value={recipe.description} onChangeText={(e) => setRecipe({...recipe, description: e})} placeholder="Description. 30 words max!"/>
          <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => toggleIngredients()}><Text className="text-center text-xl">Add Ingredients</Text></Button>
        
        <Overlay isVisible={visible} fullscreen={true}
          onBackdropPress={toggleIngredients} 
          overlayStyle={{width:400, height:200}}
          backdropStyle={{opacity: 0.8}}>

          <Input value={newIngredient} onChangeText={(e) => {setNewIngredient(e)}} placeholder="Add new ingredient"/>
          <Button onPress={() => {createNewIngredient()}}><Text>Add</Text></Button>
          <Divider width={2}></Divider>
          <ButtonGroup buttons={(ingredients) ? ingredients.map((ingredient) => {return(ingredient.name)}) : null}
          onPress={setSelectedIngredients}
          selectMultiple
          selectedIndexes={selectedIngredients}
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
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" iconRight={<MaterialCommunityIcons name='silverware-fork' size={20} />} onPress={() => saveRecipeLocal()}><Text className="text-center text-xl">Create Recipe</Text></Button>
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => router.back()}><Text className="text-center text-xl">Cancel</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default createRecipe
