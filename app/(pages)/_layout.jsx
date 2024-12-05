import { Stack } from 'expo-router';
const tabLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="viewLocal" options={{headerShown: false}}/>
            <Stack.Screen name="recipeEdit/[recipeID]" options={{headerShown: false}}/>
            <Stack.Screen name="recipeShow/[recipeName]" options={{headerShown: false}}/>
            <Stack.Screen name="home" options={{headerShown: false}}/>
        </Stack>
        
    );

}
export default tabLayout
