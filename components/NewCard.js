import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Card, ListItem, Button, CheckBox, FormLabel, FormInput } from 'react-native-elements'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { deck, dispatch } = this.props
    const { question, answer } = this.state
    if (deck.cards.filter(card => card.question === question).length > 0) {
      alert('This question already present in the deck')
    } else {
      let card = {
        question,
        answer
      }
      dispatch(addCard(deck.title, card))

      addCardToDeck(deck.title, card)

      this.setState(() => ({ question: '', answer: '' }))
    }
  }

  render() {
    const { question, answer } = this.state
    return (
      <View>
        <Card title="New Card">
          <FormInput
            placeholder="Enter question: "
            value={question}
            onChangeText={(text) => {
              this.setState({ question: text })
            }}/>

          <FormInput
            placeholder="Enter answer: "
            value={answer}
            onChangeText={(text) => {
              this.setState({ answer: text })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            disabled={question.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='Create' />
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

export default connect(mapStateToProps)(NewCard)
