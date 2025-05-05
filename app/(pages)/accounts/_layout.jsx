import { Stack } from "expo-router"
import "../globals.css"

// 
// Stack layout for account and account settings pages.
// 




const AccountLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="account" options={{headerShown: false}}/>
            <Stack.Screen name="accountEdit" options={{headerShown: false}}/>
        </Stack>
    )

}
export default AccountLayout;
