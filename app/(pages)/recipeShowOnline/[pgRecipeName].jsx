import { View, Image, ScrollView, TextInput } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Text, Button, Rating } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'


//should change it so that it pushes here from the home one
//this is the online version
//idk why it doesn't show the recipe data but do i look like i know what i'm doing?
const recipeShow = () => {
  const [recipe, setrecipe] = useState({
    creatorName: "",
    recipeName: "",
    recipeDesc: "",
    method: "",
    banner: "",
    icon: "",
    count: "",
  })

  const [ingredients, setIngredients] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { recipeID } = useLocalSearchParams()

  const BackToHome = async() => {
    router.replace("/home")
  }

    //dummy funcs for the buttons to submit ratings + comments
  const submitComment = async() => {
    if (comment.length == 0) {
      alert("Comment cannot be empty")
    }
    else {
      try {
        const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
        const userToken = await SecureStore.getItemAsync("FORK_USER_TOKEN")

        const response = await fetch(`${api_address}/comment`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: userToken, 
            forkID: recipeID,
            comment: comment,
            rating: rating
          }),
        });

        if (response.status == 200) {
          alert("Comment Submitted");
          router.back();
        }
        else if (response.status == 401) {
          alert("Invalid Token");
          router.push("../../(auth)/login")
        }
      }
      catch (error) {
        alert("Could not create comment: "+error)
      }
    }
  }
  const ratingCompleted = (rating) => {
    console.log(rating);
    setRating(rating);
  }

  useEffect(() => {
    async function getRecipe() {
      try {
        // Uses expo's .env file feature (All entries in the .env file must start with EXPO_PUBLIC for expo to recognise them)
        const api_address = process.env.EXPO_PUBLIC_API_ADDRESS
        const response = await fetch(`${api_address}/fork/${recipeID}`);
        const data = await response.json();
        setrecipe({
          creatorName: data.creatorName,
          recipeName: data.recipeName,
          recipeDesc: data.recipeDesc,
          method: data.method,
          banner: data.banner,
          icon: data.icon,
          count: data.count
        });
        setIngredients(data.ingredients)
      }
      catch (error) {
        alert(`Failed to connect to API`);
      }
    }
    getRecipe()
  }, [])

  async function saveRecipe() {
    
    const db = await SQLite.openDatabaseAsync("fork.db");
    const statement = await db.prepareAsync('INSERT INTO forks (centralID, parentID, creator_name, name, description, method, banner, icon, count) VALUES ($centralID, $parentID, $creator_name, $name, $description, $method, $banner, $icon, $count);');
    try {
      await statement.executeAsync({
        $centralID: null,
        $parentID: recipeID,
        $creator_name: recipe.creatorName,
        $name: recipe.recipeName,
        $description: recipe.recipeDesc,
        $method: recipe.method,
        $banner: recipe.banner,
        $icon: recipe.icon,
        $count: recipe.count
      })
      alert("Recipe Forked!")
    }
    catch (error){
      alert("Error forking recipe: "+error)
    }
    finally {
      await statement.finalizeAsync();
      await db.closeAsync();
      router.back()
    }
  }
  if (!recipe) {
    return (<View><Text>Loading...</Text></View>);
  }
  return (
    <View>
      <SafeAreaView>
        <ScrollView className="h-full w-full">
            <Image source={{uri: "data:image/png;base64,"+recipe.banner}} width={600} height={200}></Image>
            <Text className="text-xl font-bold md: text-base font-bold text-center">{recipe.recipeName}</Text>
            <Text>{recipe.recipeDesc}</Text>
            <Text>{recipe.method}</Text>
            {/* Bottom Bar */}
            <View className="h-3/4">
              <Divider width={3} color="black" className="align-bottom h-2/3"></Divider>
              <View className="flex-col gap-8 justify-center items-center mb-4 mt-2">
              <Rating 
              fractions={0}
              minValue={0}
              onFinishRating={() =>
                console.log("onFinishRating()")
              }
              showRating
              startingValue={0}
              />

              <TextInput maxLength={40} value={comment} onChangeText={(e) => {setComment(e)}} placeholder="Comment on this..."/>
              <Button className="dark:bg-secondary-300 w-[10vw] h-[10vw]" onPress={() => submitComment()}><Text className="text-center text-m">Submit Rating + Comment</Text></Button>
              <Button size="sm" color="green" onPress={() => {saveRecipe()}}>Fork it!</Button>
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default recipeShow
