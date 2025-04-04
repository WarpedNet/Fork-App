import { Stack } from 'expo-router';
const tabLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="viewLocal" options={{headerShown: false}}/>
            <Stack.Screen name="recipeEdit" options={{headerShown: false}}/>
            <Stack.Screen name="recipeShow" options={{headerShown: false}}/>
            <Stack.Screen name="recipeCreate" options={{headerShown: false}}/>
            <Stack.Screen name="home" options={{headerShown: false}}/>
        </Stack>
        
    );

}
export default tabLayout
