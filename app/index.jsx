import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme, ScrollView, Image } from "react-native"
import { router } from "expo-router"
import {useEffect } from "react"
import { Divider, Header } from "@rneui/base"
import { Button } from "@rneui/themed"
import * as SQLite from 'expo-sqlite'

// 
// Main page the user sees when opening the app.
// 

async function createDatabase() {
  const db = await SQLite.openDatabaseAsync('fork.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS forks(
    id INTEGER PRIMARY KEY NOT NULL,
    centralID INTEGER,
    creator_name TEXT,
    name TEXT NOT NULL,
    description TEXT,
    method TEXT,
    banner TEXT,
    icon TEXT,
    image TEXT,
    count INTEGER 
    );

    CREATE TABLE IF NOT EXISTS ingredients(
    id INTEGER  PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fork_ingredients(
    forkid INTEGER NOT NULL,
    ingredientid INTEGER NOT NULL,
    PRIMARY KEY(forkid, ingredientid),
    FOREIGN KEY(forkid) REFERENCES forks(id),
    FOREIGN KEY(ingredientid) REFERENCES ingredients(id)
    );
    `);
}

export default index = () => {
  let colorScheme = useColorScheme();
  useEffect(() => {
    createDatabase();
  }, [])
  
  return (
    <SafeAreaView className="bg-primary flex-1">
      {/* Top Bar */}
      <Header backgroundColor="green"/>
      <View className="flex-col items-center justify-center h-full w-full">
        <View className="h-[80vh] w-full items-center justify-center">
          <Image source={require("../assets/forkLogo.png")} className="w-full" resizeMethod="scale" resizeMode="contain"/>
        </View>
          
        {/* Bottom Bar */}
        <View className="h-[10vh]">
          <Divider width={3} color="black" className="align-bottom"></Divider>
          <View className="flex-row gap-8 justify-center items-center mb-4 mt-2">
            <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => { router.push("./login")}}><Text className="text-center text-xl">Log In</Text></Button>
            <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => router.push("./register")}><Text className="text-center text-xl">Register</Text></Button>
            <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => router.push("./viewLocal")}><Text className="text-center text-xl">Saved Recipes</Text></Button>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )

}
