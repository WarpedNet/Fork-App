import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const RecipeIconDisplay = ({recipeName, iconImg}) => {
  console.log(recipeName)
  return (
    <View className="mx-5 my-2 justify-center items-center">
      <Link href={{pathname: "./recipeShow/[recipeName]", params: {recipeName: recipeName}}}><Image source={{uri: "data:image/png;base64,"+iconImg}} width={100} height={100} className="bg-secondary-200"></Image></Link>
      <Text>{recipeName}</Text>
    </View>
  )
}

export default RecipeIconDisplay