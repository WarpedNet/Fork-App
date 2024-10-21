import { Stack } from "expo-router"

// 
// Stack layout for the default pages.
// 

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        </Stack>
    )

}
export default RootLayout;