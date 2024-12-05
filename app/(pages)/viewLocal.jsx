import { View, Text } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSQLiteContext } from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button } from "@rneui/themed"
import { router } from 'expo-router'

async function getLocal() {
  const db = await useSQLiteContext();
  const result = await db.getAllAsync("SELECT * FROM Forks")
  return result;
}

const viewLocal = () => {
  const [recipes, setrecipes] = useState(null)

  useEffect(() => {
    setrecipes(getLocal());
  }, [])

  return (
    <SafeAreaView>
      <View className="h-full w-full">
          {/* Bottom Bar */}
          <View className="h-[10vh]">
            <Divider width={3} color="black" className="align-bottom"></Divider>
            <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
              <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => { router.push("./recipeEdit")}}><Text className="text-center text-xl">Create Recipe</Text></Button>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default viewLocal