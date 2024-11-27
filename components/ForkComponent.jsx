import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class ForkComponent extends Component {
  render() {
    return (
      <View>
        <Text style={{height: 40, borderWidth: 2, borderColor: 'black'}}>Recipe Name Goes Here</Text>
      </View>
    )
  }
}

export default ForkComponent
