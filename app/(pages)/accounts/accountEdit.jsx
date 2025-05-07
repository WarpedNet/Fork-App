import { View, Text, Image, ActivityIndicator } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Divider, Header, Overlay } from '@rneui/base'
import { Button, Input } from "@rneui/themed"
import * as SecureStore from 'expo-secure-store'
import { router } from "expo-router"

export default function accountEdit(){

  const [userNamevisible, setuserNameVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const toggleUserOverlay = () => {
    setuserNameVisible(!userNamevisible)
  }
  const togglePassOverlay = () => {
    setPassVisible(!passVisible)
  }
  
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  async function updateDetails() {
    try {
      const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
      const userToken = await SecureStore.getItemAsync("FORK_USER_TOKEN")
      
      const response = await fetch(`${api_address}/user`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userToken, 
          username: username,
          email: email
        }),
      });

      if (response.status == 200) {
        alert("Details Updated")
        router.push("../../(auth)/login")
      }
      else if (response.status == 401) {
        alert("Invalid Credentials");
        router.push("../../(auth)/login")
      }
    }
    catch (error) {
      alert("Error changing details: "+error);
    }
  }

  async function updatePassword() {
    if (newPassword == confirmNewPassword) {
      try {
        const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
        const userToken = await SecureStore.getItemAsync("FORK_USER_TOKEN")

        const response = await fetch(`${api_address}/user`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: userToken, 
            password: newPassword
          }),
        });

        if (response.status == 200) {
          alert("Password Updated")
        }
        else if (response.status == 401) {
          alert("Invalid Credentials");
        }
        router.push("../../(auth)/login")
      }
      catch (error) {
        alert("Could not update password: "+error)
      }
    }
    else {
      alert("Passwords must match")
    }
  }

  async function getUser() {
    const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
    const getUser = await fetch(`${api_address}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: await SecureStore.getItemAsync("FORK_USER_TOKEN")}),
    });
    
    if (getUser.status == 401) {
      alert("Invalid Token")
      router.push("../../(auth)/login")
    }
    else if (getUser.status == 200) {
      const userData = await getUser.json();
      console.log(userData);
      setUsername(userData.username);
      setEmail(userData.email);
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (username == null || email == null) {
    return (<ActivityIndicator/>)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Edit Account', style:{fontSize: 20, fontWeight: "bold"}}} />

        <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => {toggleUserOverlay()}}><Text className="text-center text-xl">Change Details</Text></Button>
        <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => {togglePassOverlay()}}><Text className="text-center text-xl">Change Password</Text></Button>
        <Overlay isVisible={userNamevisible} fullscreen={true} 
          onBackdropPress={toggleUserOverlay} 
          overlayStyle={{width:400, height:200}}
          backdropStyle={{opacity: 0.8}}>

          <View className="flex flex-col">
            <Input value={username} label="New Details" onChangeText={(e) => {setUsername(e)}}/>
            <Input value={email} onChangeText={(e) => {setEmail(e)}} placeholder="Email Address"/>
            <Button onPress={() => {updateDetails()}}>Save Changes</Button>
          </View>
        </Overlay>

        <Overlay isVisible={passVisible} fullscreen={true}
        onBackdropPress={togglePassOverlay}
        overlayStyle={{width: 400, height: 200}}
        backdropStyle={{opacity: 0.8}}
        >

          <View className="flex flex-col">
            <Input value={newPassword} onChangeText={(e) => {setNewPassword(e)}} placeholder="New Password"/>
            <Input value={confirmNewPassword} onChangeText={(e) => {setConfirmNewPassword(e)}} placeholder="Confirm Password"/>
            <Button onPress={() => {updatePassword()}}>Save Changes</Button>
          </View>
        </Overlay>
        <Divider width={150}/>
        
        <View className="flex flex-row">
          <Button className="dark:bg-secondary-300 w-[15vw] h-[15vw]"><Text className="text-center text-xl">Back to Forks</Text></Button>
          <Button className="dark:bg-secondary-300 w-[15vw] h-[15vw]"><Text className="text-center text-xl">Logout</Text></Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
