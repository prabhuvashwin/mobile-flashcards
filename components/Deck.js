import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { addCard } from '../actions'

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props

    return (
      <View>
        <Card title={deck.title}>
          <Text style={{marginBottom: 20, textAlign: 'center'}}>
            {deck.cards.length} card(s) are present in this deck
          </Text>
          <Button
            title='Add Card'
            icon={{name: 'add'}}
            backgroundColor='#074a87'
            buttonStyle={{borderRadius: 5, marginBottom: 20}}
            onPress={() => navigation.navigate(
              'NewCard',
              { title: deck.title }
            )} />
          <Button
            title='Start Quiz'
            icon={{name: 'arrow-forward'}}
            backgroundColor='#047527'
            disabled={deck.cards.length === 0}
            buttonStyle={{borderRadius: 5, marginBottom: 20}}
            onPress={() => navigation.navigate(
              'Quiz',
              { title: deck.title }
            )} />
        </Card>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(Deck)
