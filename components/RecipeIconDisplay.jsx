import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

// Recipe Name in here for future maybe?
const RecipeIconDisplay = ({ID, recipeName, icon}) => {
  return (
    <View className="mx-5 my-2 justify-center items-center">
      <Link href={{pathname: "/recipeShow/[recipeID]", params: {recipeID: ID}}}><Image source={{uri: "data:image/png;base64,"+icon}} width={100} height={100} className="bg-secondary-200"></Image></Link>
      <Text>{recipeName}</Text>
    </View>
  )
}

export default RecipeIconDisplay