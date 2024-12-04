import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import { ScrollView } from "react-native"
import { Header } from "@rneui/base"

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
      <Header backgroundColor="green" centerComponent={{text: "Home"}} />
      <View className="items-center justify-center my-2">
      </View>
      <ScrollView className="mx-6 my-2 mb-4">
      </ScrollView>
      {/* Bottom Bar */}
      <View className="flex-row gap-8 justify-center items-center mb-4">
        <TouchableOpacity className="bg-tertiary-100 w-[15vw] h-[15vw]" onPress={() => { router.push("./login")}}><Text className="text-center text-xl">Log In</Text></TouchableOpacity>
        <TouchableOpacity className="bg-secondary-100 w-[15vw] h-[15vw]"><Text className="text-center text-base">Button6</Text></TouchableOpacity>
        <TouchableOpacity className="bg-tertiary-100 w-[15vw] h-[15vw]"><Text className="text-center text-base">Button7</Text></TouchableOpacity>
        <TouchableOpacity className="bg-secondary-100 w-[15vw] h-[15vw]"><Text className="text-center text-base">Button8</Text></TouchableOpacity>
      </View>

    </SafeAreaView>
  )

}
