import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import { ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite"
// 
// Main page the user sees when opening the app.
// 

export default index = () => {

  async function initDB(db) {
    try {
      await db.execAsync("CREATE TABLE IF NOT EXISTS fork (ForkID INTEGER PRIMARY KEY NOT NULL, creator_id INTEGER NOT NULL, recipe_name VARCHAR(255) NOT NULL, recipe_desc VARCHAR(255), recipe_method VARCHAR(255), banner_img BLOB, img BLOB, icon BLOB, fork_count INTEGER)");
    }
    catch (error) {
      console.log("Database failed to initilise" + error);
    }
  }

  const Content = () => {
    const db = useSQLiteContext();
    const [method, setmethod] = useState("No Method");
    const [title, settitle] = useState("No Title");
    const [recipe, setrecipe] = useState(
      {
        creator_id: 1,
        recipe_name: "No Recipe",
        recipe_desc: "yes",
        recipe_method: "no",
        banner_img: null,
        img: null,
        icon: null,
        fork_count: 1
      }
    )

    const addRecipe = async (recipe) => {
      try {
        const statement = await db.prepareAsync(
          "INSERT INTO fork (creator_id, recipe_name, recipe_desc, recipe_method, banner_img, img, icon, fork_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        );
        await statement.executeAsync([recipe.creator_id, recipe.recipe_name, recipe.recipe_desc, recipe.recipe_method, recipe.banner_img, recipe.img, recipe.icon, recipe.fork_count]);
        getRecipe();
      }
      catch (error) {
        console.log("Error while adding recipe:", error);
      }
    }
  
    const getRecipe = async (recipeName) => {
      try {
        const row = await db.getFirstAsync("SELECT * FROM fork WHERE recipe_name = ?", recipeName);
        setrecipe(row);
        console.log(recipe.recipe_method);
      }
      catch (error) {
        console.log("Error while getting recipes");
      }
    }
  
    let colorScheme = useColorScheme();
    return (
      <View>
        {/* Top Bar */}
        <View className="flex-row gap-x-5 itmes-center justify-center h-20 mb-20">
            {/* Left buttons */}
            <View className="w-[20vw] h-full">
                <TouchableOpacity className="bg-tertiary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button1</Text></TouchableOpacity>
                <TouchableOpacity className="bg-secondary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button2</Text></TouchableOpacity>
            </View>
            {/* Center Text */}
            <View className="w-[45vw] h-full items-center justify-center">
              <Text className="text-3xl text-white text-center">
                {recipe.recipe_name}
              </Text>
            </View>
            {/* Right buttons */}
            <View className="w-[20vw] h-full">
                <TouchableOpacity className="bg-tertiary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button3</Text></TouchableOpacity>
                <TouchableOpacity className="bg-secondary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button4</Text></TouchableOpacity>
            </View>
        </View>
        {/* Main body */}
        <View className="items-center justify-center my-2">
          <Text className="text-2xl text-white">Method</Text>
        </View>
        <ScrollView className="mx-6 my-2 mb-4">
          <Text className="text-lg text-white h-fit">
            {recipe.recipe_method}
          </Text>
        </ScrollView>
        {/* Bottom Bar */}
        <View className="flex-row gap-8 justify-center items-center mb-4">
          <TouchableOpacity className="bg-tertiary-100 w-[15vw] h-[15vw]" onPress={() => { router.push("./login")}}><Text className="text-center text-xl">Log In</Text></TouchableOpacity>
          <TouchableOpacity className="bg-secondary-100 w-[15vw] h-[15vw]">
            <Text className="text-center text-base" onPress={() => { 
              addRecipe({
                creator_id: 1, recipe_name: "yes", recipe_desc: "no", recipe_method: "yesnt", banner_img: null, img: null, icon: null, fork_count: 1
              }) 
              }}>DBWrite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-tertiary-100 w-[15vw] h-[15vw]"><Text className="text-center text-base" onPress={() => { getRecipe("yes") }}>DBRead</Text></TouchableOpacity>
          <TouchableOpacity className="bg-secondary-100 w-[15vw] h-[15vw]"><Text className="text-center text-base">Button8</Text></TouchableOpacity>
        </View>
      </View>
    );
  }


  return (
    // <SafeAreaView className="bg-primary">
    //   <View className="w-full h-full items-center justify-center">
    //     <TouchableOpacity
    //       onPress={() => { router.push("./login") }}
    //       className="bg-secondary-100 rounded-xl min-h-[50px] min-w-[190px] justify-center"
    //     >
    //       <Text className="text-3xl font-bold text-white text-center">Go to Login</Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <SQLiteProvider databaseName='forkDB.db' onInit={initDB}>
      <SafeAreaView className="bg-primary h-full">
        <View>
          <Content/>
        </View>
      </SafeAreaView>
    </SQLiteProvider>
  )

}
