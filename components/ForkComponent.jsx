import { Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { Card } from '@rneui/base'
import { router } from 'expo-router';


//elements of the card itself: Name, Image, Description
//maybe we can do an image idk
const sendToRecipe = () => {
  console.log("Sending to recipe page...");
  router.push("../app/forks");

  
}




const ForkComponent = ({title}) => {
  return (
    <Card>
      <Text className="text-center">{title}</Text>
      <TouchableOpacity onPress={sendToRecipe}>
        <Image  className= "size-24" source={require('../app/(tabs)/imeg/images.jpg')}/>
        </TouchableOpacity>
    </Card>
  )
}

export default ForkComponent
