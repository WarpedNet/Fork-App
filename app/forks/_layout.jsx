import { Stack } from 'expo-router'

const forksLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="forkExample" options={{headerShown: false}}/>
    </Stack>
  )
}

export default forksLayout