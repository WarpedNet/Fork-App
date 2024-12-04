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
        <ForkComponent />
        <ForkComponent />
        <ForkComponent />
        <ForkComponent />
        <ForkComponent />
    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>

    
  )
}
 
