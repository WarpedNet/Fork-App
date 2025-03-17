import { Stack } from 'expo-router'

const recipeCreateLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="createRecipe" options={{headerShown: false}}/>
    </Stack>
  )
}

export default recipeCreateLayout