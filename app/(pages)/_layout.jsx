import { Stack } from 'expo-router';
const tabLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="accounts" options={{headerShown: false}}/>
            <Stack.Screen name="viewLocal" options={{headerShown: false}}/>
            <Stack.Screen name="recipeEdit" options={{headerShown: false}}/>
            <Stack.Screen name="recipeShow" options={{headerShown: false}}/>
            <Stack.Screen name="recipeShowOnline" options={{headerShown: false}}/>
            <Stack.Screen name="recipeCreate" options={{headerShown: false}}/>
            <Stack.Screen name="viewOnline" options={{headerShown: false}}/>
            <Stack.Screen name="homePage" options={{headerShown: false}} />
        </Stack>
        
    );

}
export default tabLayout
