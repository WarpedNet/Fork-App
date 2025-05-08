import React from "react";
import {useState, useEffect} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"; 
import {Text, TextInput, Image, View, Button, TouchableOpacity, VirtualizedList, ActivityIndicator} from "react-native";
import {Header} from "@rneui/base";
import {Avatar, Icon} from "@rneui/themed";
import { Link, router } from "expo-router"
import * as SecureStore from 'expo-secure-store'

export default function Account(){
  const [user, setUser] = useState(null)

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
      router.push("../(auth)/login")
    }
    else if (getUser.status == 200) {
      setUser(await getUser.json());
    }
  }

  async function logout() {
    await SecureStore.setItemAsync("FORK_USER_TOKEN", "");
    router.replace("../..")
  }

  useEffect(() => {
    getUser()
  }, [])
  
  if (!user) {
    return (<ActivityIndicator/>)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="green" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Account', style:{fontSize: 20, fontWeight: "bold"}}} />
        <View className="size-16 mb-5 w-full items-center justify-center">
          <Text className="text-xl font-bold align">Username: {user.username}</Text>
          <Text className="text-xl font-bold">Email: {user.email}</Text>
        </View>

        <View className="h-10 border-2 border-solid items-center">
          <TouchableOpacity onPress={() => {router.push("./accountEdit")}}>
            <Text>Edit Account</Text>
          </TouchableOpacity>
        </View>

        <View className="h-10 border-2 border-solid items-center">
          <TouchableOpacity onPress={() => {logout()}}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    </SafeAreaProvider>
  )

}
