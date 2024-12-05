//imports, i may need stylesheet but idk
import React from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context" 
import {Text, FlatList, StyleSheet, ScrollView} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForkComponent from "../../components/ForkComponent";
export default function Forks() {
  return (
    <SafeAreaProvider>
    <SafeAreaView>
      <ScrollView>
      <ForkComponent title={<Text>Pie</Text>} description={<Text>This is a pie recipe, very nice</Text>}/>
      <ForkComponent  title={<Text>Pie, but different</Text>} description={<Text>This is a pie, but different. I stuffed 3 appls inside it. It's really good, I swear.</Text>}/>
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>

    
  )
}
 
