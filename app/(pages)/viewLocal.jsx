import { View, Text, FlatList } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, Header } from "@rneui/themed"
import { router } from 'expo-router'
import RecipeIconDisplay from '../../components/RecipeIconDisplay'



const viewLocal = () => {
  const [recipes, setrecipes] = useState(null)

  // async function getData {
  //   const db = await SQLite.openDatabaseAsync("fork");
  
  //   await db.execAsync("CREATE TABLE IF NOT EXISTS Forks (ForkID INTEGER PRIMARY KEY NOT NULL, recipe_name TEXT, recipe_desc TEXT, recipe_method TEXT)")
  //   // await db.runAsync(`INSERT INTO forks (recipe_name, recipe_desc, recipe_method) VALUES ('test','test','test')`)
  
  //   const result = await db.getAllAsync("SELECT * FROM Forks")
  //   console.log(result)
  //   setrecipes(result)
  // }

  useEffect(() => {
    async function getData() {
      const db = await SQLite.openDatabaseAsync("fork.db");
    
      const result = await db.getAllAsync("SELECT * FROM Forks")
      setrecipes(result)
    }
    getData()
  }, [])
  
  const deleteDB = async() => {
    const db = await SQLite.openDatabaseAsync("fork.db");
    await db.execAsync("DROP TABLE IF EXISTS Forks")
  }

  return (
    <SafeAreaView>
      <View className="h-full w-full">
        <Header backgroundColor="#00ff00" leftComponent={{icon:'home', style: { color: 'black' }}}centerComponent={{text: "Saved Forks", style: {font: 'bold', fontSize: 20}}} />
        <FlatList numColumns={3} data={recipes} renderItem={(recipe) => <RecipeIconDisplay recipeName={recipe.item.recipe_name} iconImg={recipe.item.icon}/>}/>

          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => { router.push(`/recipeEdit/${null}`)}}><Text className="text-center text-xl">Create Recipe</Text></Button>
              <Button className=" dark:bg-secondary w-[15vw] h-[15vw]" onPress={() => {deleteDB()}}><Text className="text-center text-xl">Delete All</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default viewLocal
