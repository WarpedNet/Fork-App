import { TouchableOpacity, View, Text } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import CustomInputField from '../../components/CustomInputField'

const login = () => {
  const [formField, setformField] = useState({username: "", password: ""})
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="h-full justify-center items-center space-y-4">
        <Text className="text-4xl text-white font-bold my-6">Log In</Text>
        <CustomInputField name="Username" placeholder="Username" changeText={(e) => setformField({...formField, username: e})} value={formField.username}/>
        <CustomInputField name="Password" placeholder="Password" changeText={(e) => setformField({...formField, password: e})} value={formField.password}/>
        <TouchableOpacity className="bg-secondary rounded-full px-3 py-2" onPress={() => {alert("Username: "+formField.username+"\nPassword: "+formField.password)} }>
          <Text className="text-white text-2xl">Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default login