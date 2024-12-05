import { View, Text, Image } from 'react-native'
import React from 'react'

const RecipeIconDisplay = ({recipeName, iconImg}) => {
  return (
    <View>
        <Image source={iconImg}/>
        <Text>{recipeName}</Text>
    </View>
  )
}

export default RecipeIconDisplay