import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@rneui/base'
import { Button, Input } from "@rneui/themed"


const accountEdit = () => {

  const [userNamevisible, setuserNameVisible] = useState(false);

  const toggleuserOverlay = () => {
    setuserNameVisible(!userNamevisible)
}
}

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Edit Account', style:{fontSize: 20, fontWeight: "bold"}}} />

        <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => toggleuserOverlay()}><Text className="text-center text-xl">Change Username</Text></Button>
        <Overlay isVisible={visible} fullscreen={true} 
          onBackdropPress={toggleIngredients} 
          overlayStyle={{width:400, height:200}}
          backdropStyle={{opacity: 0.8}}>

        <View className="flex flex-col">
        <Input /*value=username*/ /*onchangeText=setusernamefunc*/ placeholder="New Username"  /*make this into the account username*/ />
        <Input /*value=password*/ placeholder="Password"/>
        <Input /*value=password*/ placeholder="Confirm Password"/>
        </View>
        </Overlay>

        <Divider width={150}/>
        
        <View className="flex flex-row">
        <Button className="dark:bg-secondary-300 w-[15vw] h-[15vw]"><Text className="text-center text-xl">Save</Text></Button>
        <Button className="dark:bg-secondary-300 w-[15vw] h-[15vw]"><Text className="text-center text-xl">Cancel</Text></Button>
        </View>
      </SafeAreaView>

    </SafeAreaProvider>
  )


