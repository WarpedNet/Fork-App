import { Stack } from 'expo-router'

const recipeShowLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[recipeID]" options={{headerShown: false}}/>
    </Stack>
  )
}

export default recipeShowLayout