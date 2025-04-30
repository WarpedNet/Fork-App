import { TouchableOpacity, View, Text } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import CustomInputField from '../../components/CustomInputField'
import { router, Link } from "expo-router"

// 
// Register page for creating a new account
// 

// register function
const register = () => {
  const [formField, setformField] = useState({
    username: "",
    email: "",
    password: "",
  })

  async function register() {
    try {
      const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
      const response = await fetch(`${api_address}/register`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formField),
      });
      if (response.status == 401) {
        alert("User already exists")
      }
      router.push("./login");
    }
    catch (error) {
      alert("Error creating user");
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      {/* setting the view to centre */}
      <View className="h-full justify-center items-center space-y-4">
        <Text className="text-4xl text-white font-bold my-6">Register</Text>

        {/* input fields for username, email and password */}
        <CustomInputField name="Username" placeholder="Username" changeText={(e) => setformField({...formField, username: e})} value={formField.username}/>
        <CustomInputField name="email" placeholder="Email Address" changeText={(e) => setformField({...formField, email: e})} value={formField.email}/>
        <CustomInputField name="Password" placeholder="Password" changeText={(e) => setformField({...formField, password: e})} value={formField.password}/>

        {/* setting the view to centre */}
        <View className="flex-col space-y-4 justify-center items-center">

          {/* text and button for redirecting user back to login page if they have an account */}
          <Text className="text-base text-white px-3 py-2">Already have an account? <Link href="./login" className="text-secondary-100">Login Here</Link></Text>

          {/* temporary alert response to show user input based on log in button press */}
          <TouchableOpacity className="bg-secondary rounded-full px-3 py-2" onPress={() => {register()} }>
            <Text className="text-white text-2xl">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default register