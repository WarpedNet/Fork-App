import React from "react";
import {SafeAreaView} from "react-native-safe-area-context"; 
import {Text} from "react-native";
import { Avatar, Header } from "@rneui/base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForkComponent from "../../components/ForkComponent";
export default function Home() {
  return (
    <SafeAreaView>
      {/* big title for the thing */}
      <Header
      centerComponent={{text:'Home'}}
      />
<Avatar
size="small"
title="PH"
onPress={/* route to account.jsx*/ console.log("Should Route to acc.jsx (will do soon)")}
/>
{/* add a link to the fork page with the fork component */}

    </SafeAreaView>
  )
}
 
