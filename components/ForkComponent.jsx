import { Text, View, Image, Pressable } from 'react-native'
import { Card } from '@rneui/base'

//elements of the card itself: Name, Image, Tags
//maybe we can do an image idk
const ForkComponent = ({title,description}) => {
  return (
    <Card
    title='title goe here'>
      <Pressable onPress={console.log("Send to the page for the recipe")
      }>
      <Image
      style={{
        width: 300,
        height: 300,
      }}
      source={
        require(/* link to image idk how we gonna do that*/)
      }

      />
      </Pressable>
    </Card>
  )
}

export default ForkComponent
