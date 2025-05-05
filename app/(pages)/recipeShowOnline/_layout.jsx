import { Stack } from 'expo-router'

const recipeShowLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[pgRecipeName]" options={{headerShown: false}}/>
    </Stack>
  )
}

export default recipeShowOnlineLayout
