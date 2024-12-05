import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import { ScrollView, Image } from "react-native"
import { Divider, Header } from "@rneui/base"
import { Button } from "@rneui/themed"
import { SQLiteProvider } from "expo-sqlite"

// 
// Main page the user sees when opening the app.
// 

export default index = () => {
  let colorScheme = useColorScheme();
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
    <SQLiteProvider databaseName="fork.db">
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
    </SQLiteProvider>
  )

}
