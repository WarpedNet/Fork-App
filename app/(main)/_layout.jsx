import { Stack } from "expo-router";

const mainLayout = () => {
    return (
        <Stack>
        <Stack.Screen name ="Home" options={{title: "Home"}} />
        <Stack.Screen name = "Library" options={{title:"Library"}} />
        </Stack>
    )
}
export default mainLayout