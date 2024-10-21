import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, Appearance, useColorScheme } from "react-native"
import { router } from "expo-router"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"

// 
// Main page the user sees when opening the app.
// 

export default index = () => {
  let colorScheme = useColorScheme();
  return (
    <SafeAreaView className="bg-primary">
      <View className="w-full h-full items-center justify-center">
        <TouchableOpacity
          onPress={() => { router.push("./login") }}
          className="bg-secondary-100 rounded-xl min-h-[50px] min-w-[190px] justify-center"
        >
          <Text className="text-3xl font-bold text-white text-center">Go to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )

}
