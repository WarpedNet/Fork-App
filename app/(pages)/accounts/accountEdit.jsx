import { View, Text, Image } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@rneui/base'
import { Button, Input } from "@rneui/themed"

export default function accountEdit() {



const accountEdit = () => {

  const [userNamevisible, setuserNameVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const toggleuserOverlay = () => {
    setuserNameVisible(!userNamevisible)
}
  const togglePassOverlay = () => {
    setPassVisible(!passVisible)
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-primary h-full w-full">
        {/* header (obviously) */}
        <Header backgroundColor="#00FF00" containerStyle={{alignItems:'center', marginBottom:20, width: '100%', paddingVertical: 5}} centerComponent={{text: 'Edit Account', style:{fontSize: 20, fontWeight: "bold"}}} />

        <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => toggleuserOverlay()}><Text className="text-center text-xl">Change Details</Text></Button>
        <Button className="dark: bg-secondary-300 w-20 h-20" onPress={() => togglePassOverlay()}><Text className="text-center text-xl">Change Password</Text></Button>
        <Overlay isVisible={userNamevisible} fullscreen={true} 
          onBackdropPress={toggleUserOverlay} 
          overlayStyle={{width:400, height:200}}
          backdropStyle={{opacity: 0.8}}>

        <View className="flex flex-col">
        <Input /*value=username*/ label="New Details" /*onchangeText=setusernamefunc*/ placeholder="New Username"  /*make this into the account username*/ />
        <Input /*value=email*/ placeholder="Email Address"/>
        <Input /*value=password*/ placeholder="Password"/>
        <Input /*value=password*/ placeholder="Confirm Password"/>
        <Button onPress={() => router.push("../account")}>Save Changes</Button>
        </View>
        </Overlay>

      <Overlay isVisible={passVisible} fullscreen={true}
        onBackdropPress={togglePassOverlay}
        overlayStyle={{width: 400, height: 200}}
        backdropStyle={{opacity: 0.8}}
        >
        <View className="flex flex-col">
        <Input /*value=oldpassword*/ placeholder="Current Password"/>
        <Input /*value=newpassword*/ placeholder="New Password"/>
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
}
