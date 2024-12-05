import { View, Text, TextInput } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSQLiteContext } from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button } from "@rneui/themed"
import { router } from 'expo-router'

const recipeEdit = () => {

  const [recipe, setRecipe] = useState({
    name: "N/A",
    desc: "N/A",
    method: "N/A"
  });

  const saveRecipeLocal = async() => {
    const db = useSQLiteContext();
    await db.execAsync("CREATE TABLE IF NOT EXISTS forks (ForkID INTEGER PRIMARY KEY NOT NULL, recipe_name TEXT, recipe_desc TEXT, recipe_method TEXT)")
    await db.runAsync("INSERT INTO forks (recipe_name, recipe_desc, recipe_method) VALUES (?,?,?)", recipe.name, recipe.desc, recipe.method)
  }
  return (
    <SafeAreaView>
      <View className="h-full w-full">
          <TextInput value={recipe.name} onChangeText={(e) => setRecipe({...recipe, name: e})} title="RecipeName"/>
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <Divider width={3} color="black" className="align-bottom"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]"><Text className="text-center text-xl">Save Local</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default recipeEdit