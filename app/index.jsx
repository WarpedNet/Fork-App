import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import { ScrollView } from "react-native"

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
      <View className="flex-row gap-x-5 itmes-center justify-center h-20 mb-20">
          {/* Left buttons */}
          <View className="w-[20vw] h-full">
              <TouchableOpacity className="bg-tertiary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button1</Text></TouchableOpacity>
              <TouchableOpacity className="bg-secondary-100 w-full h-full items-center justify-center"><Text className="text-center text-xl">Button2</Text></TouchableOpacity>
          </View>
          {/* Center Text */}
          <View className="w-[45vw] h-full items-center justify-center">
            <Text className="text-3xl text-white text-center">
              Recipe Title
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
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Text>
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
