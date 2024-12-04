import { Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { Card } from '@rneui/base'

//elements of the card itself: Name, Image, Description
//maybe we can do an image idk
const sendToRecipe = () => {
  console.log("Sending to recipe page...");
  
}



const ForkComponent = ({}) => {
  return (
    <Card>
      <Text className="text-center"> Title of Fork </Text>
      <TouchableOpacity onPress={sendToRecipe}>
        <Image  className= "size-24" source={require('../assets/forkLogo.png')}/>
        </TouchableOpacity>
    </Card>
  )
}

export default ForkComponent
