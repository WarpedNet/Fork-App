'use client'
import { Header } from '@rneui/themed';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function forkExample () {
    return (
        <SafeAreaProvider>
        <Header backgroundColor='#00FF00' centerComponent={{text: "Pie"}} />
        </SafeAreaProvider>
    )
}