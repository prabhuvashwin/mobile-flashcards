import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Card, ListItem, Button, CheckBox, FormLabel, FormInput } from 'react-native-elements'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    answerType: false,
    comments: ''
  }

  submit = () => {
    const { deck, dispatch } = this.props
    const { question, answer, answerType, comments } = this.state
    console.log(deck)
    if (deck.cards.filter(card => card.question === question).length > 0) {
      alert('This question already present in the deck')
    } else {
      let card = {
        question,
        answer,
        answerType,
        comments
      }
      dispatch(addCard(deck.title, card))

      addCardToDeck(deck.title, card)

      this.setState(() => ({ question: '', answer: '', answerType: false, comments: '' }))
    }
  }

  render() {
    const { question, answer, answerType, comments } = this.state
    return (
      <KeyboardAvoidingView style={{flex: 1, marginTop: 100}} behavior='padding'>
        <Card title="New Card">
          <FormInput
            placeholder="Enter question: "
            value={question}
            onChangeText={(text) => {
              this.setState({ question: text })
            }} />

          <FormInput
            placeholder="Enter answer: "
            value={answer}
            onChangeText={(text) => {
              this.setState({ answer: text })
            }} />

          <FormInput
            placeholder="Enter comment: "
            value={comments}
            onChangeText={(text) => {
              this.setState({ comments: text })
            }} />

          <CheckBox
            center
            title='Check this box if the answer is correct'
            checked={answerType}
            containerStyle={{borderRadius: 30}}
            onPress={() => {
              this.setState({ answerType: !(answerType) })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            disabled={question.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='Create Card' />
        </Card>
      </KeyboardAvoidingView>
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
