import { View, TextInput, Text } from 'react-native'
import React from 'react'

const CustomInputField = ({name, otherStyles, changeText, value, placeholder}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-white font-bold text-xl h-8 ">{name}</Text>
        <View className="bg-secondary flex-row text-base w-2/3 rounded-xl items-center py-2 px-3">
            <TextInput
            onChangeText={changeText}
            placeholder={placeholder}
            placeholderTextColor="#69609Eff"
            value={value}
            className="text-base flex-1 text-white"
            secureTextEntry={name === "Password" ? true : false} />
        </View>
    </View>
  )
}

export default CustomInputField