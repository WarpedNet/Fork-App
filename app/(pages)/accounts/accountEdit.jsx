import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import { Divider } from '@rneui/base'
import { Button, Input } from "@rneui/themed"

export default function accountEdit(){
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Edit Account', style:{fontSize: 20, fontWeight: "bold"}}} />

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

