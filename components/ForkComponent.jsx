import { Text, View, Image, Pressable } from 'react-native'
import { Card } from '@rneui/base'

//elements of the card itself: Name, Image, Description
//maybe we can do an image idk
const ForkComponent = ({}) => {
  return (
    <Card>
      <Text className="text-center"> Title of Fork </Text>
      <Pressable onPress={console.log("Send to the page for the recipe")}>

        </Pressable>
    </Card>
  )
}

export default ForkComponent
