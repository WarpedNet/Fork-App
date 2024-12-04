import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import { ScrollView, Image } from "react-native"
import { Header } from "@rneui/base"
import { Button } from "@rneui/themed"

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

    <SafeAreaView className="bg-primary h-full">
      {/* Top Bar */}
      <Header backgroundColor="green"/>
      <View className="items-center justify-center my-2">
      </View>
      <ScrollView className="mx-6 my-2 mb-4">
        <Image source={require('../assets/forkLogo.png')} />
      </ScrollView>
      {/* Bottom Bar */}
      <View className="flex-row gap-8 justify-center items-center mb-4">
        <Button className=" dark:bg-secondary-300 w-[15vw] h-[15vw]" onPress={() => { router.push("./login")}}><Text className="text-center text-xl">Log In</Text></Button>
      </View>

    </SafeAreaView>
  )

}
