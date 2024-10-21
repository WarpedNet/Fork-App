import { Stack } from 'expo-router'

// 
// Stack layout for authorisation pages.
// 

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name="register" options={{headerShown: false}}/>
    </Stack>
  )
}

export default AuthLayout