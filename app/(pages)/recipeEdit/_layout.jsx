import { Stack } from 'expo-router'

const recipeEditLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[recipeID]" options={{headerShown: false}}/>
    </Stack>
  )
}

export default recipeEditLayout