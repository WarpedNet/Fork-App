import React from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"; 
import {Text, View, Button} from "react-native";
import { Avatar, Header } from "@rneui/base";
import ForkComponent from "../../components/ForkComponent";
import { router } from "expo-router";
export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* big title for the thing */}
        <Header backgroundColor="#00FF00" centerComponent={{text: "Welcome Back!"}} />
        <Text className="font-bold text-center">Home</Text>
        <Text className="text-center">Browse the forks, or:</Text>
        <Button title="create your own">Create your own!</Button>
        
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

 
