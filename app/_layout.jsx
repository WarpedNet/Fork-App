import { Stack } from "expo-router"
import "../globals.css"
// 
// Stack layout for the default pages.
// 

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )

}
export default RootLayout;