import { View, Text, Image } from 'react-native'
import React from 'react'

const RecipeIconDisplay = ({recipeName, iconImg, recipeID}) => {
  return (
    <View className="mx-5 my-2 justify-center items-center">
        <Image source={{uri: "data:image/png;base64,"+iconImg}} width={100} height={100} className="bg-secondary-200"></Image>
        <Text>{recipeName}</Text>
    </View>
  )
}

export default RecipeIconDisplay