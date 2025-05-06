import React from "react";
import {useState, useEffect} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"; 
import {Text, TextInput, Image, View, Button, TouchableOpacity, VirtualizedList,ActivityIndicator} from "react-native";
import {Header} from "@rneui/base";
import {Avatar, Icon} from "@rneui/themed";
import { Link, router } from "expo-router"


export default function Account(){
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="green" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Account', style:{fontSize: 20, fontWeight: "bold"}}} />
        <View className="size-16 items-center">
          <Avatar size={64}
          rounded
          icon={{name: 'adb', type: 'material'}}
          containerStyle={{ backgroundColor: 'green'}}
          />
          <Text>Account Name</Text>
        </View>

        <View className="h-30 w-full items-center">
            <TextInput className="h-40 w-full"
            multiline={true}
            numberOfLines={10}
            placeholder="account description goes here type shit, set value to account desciption"
            placeholderTextColor="grey"
            editable={false}
            />
        </View>


        <View className="h-10 border-2 border-solid items-center">
        <TouchableOpacity onPress={console.log("pressed edit settings")}>
        <Text>Edit Account</Text>
        </TouchableOpacity>
        </View>
        <View className="h-10 border-2 border-solid items-center">
        <TouchableOpacity onPress={console.log("pressed edit account")}>
        <Text>Logout</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>

    </SafeAreaProvider>
  )

}
