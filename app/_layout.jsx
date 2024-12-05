import { Stack } from "expo-router"
import "../globals.css"
import { StyleSheet } from "nativewind"
// 
// Stack layout for the default pages.
// 

//styling for the recipe form

const recipeForm = StyleSheet.create({
    input: {
        height: 30,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
});




const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(pages)" options={{headerShown: false}}/>
            <Stack.Screen name="forks" options={{headerShown: false}}/>
        </Stack>
    )

}
export default RootLayout;