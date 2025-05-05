import { Stack } from 'expo-router'

const recipeShowOnlineLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[pgRecipeName]" options={{headerShown: false}}/>
    </Stack>
  )
}

export default recipeShowOnlineLayout
