import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { FormLabel, FormInput, Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const { decks, dispatch, navigation } = this.props
    const { title } = this.state
    if (decks.filter(deck => deck.title === title).length > 0) {
      alert('This deck name already exists.')
    } else {
      dispatch(addDeck(title))

      saveDeckTitle(title)

      navigation.navigate('Deck', { title })

      this.setState(() => ({ title: '' }))
    }
  }

  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <Card
          title="What's the title of your new deck?"
          containerStyle={{justifyContent: 'space-between'}}>
          <FormInput
            placeholder='Enter deck title: '
            value={title}
            onChangeText={(text) => {
              this.setState({ title: text })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            disabled={title.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='Create' />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(NewDeck)
