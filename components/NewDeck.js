import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
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
      <View style={{flex: 1, marginTop: 200}}>
        <Card
          title="What's the title of your new deck?"
          containerStyle={{justifyContent: 'space-between'}}>
          <TextInput
            placeholder='Enter deck title: '
            style={{height: 40, marginLeft: 20, fontSize: 20}}
            value={title}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ title: text })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor='#0e0787'
            disabled={title.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='Create' />
        </Card>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(NewDeck)
