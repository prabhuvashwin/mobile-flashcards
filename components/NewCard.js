import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button, CheckBox } from 'react-native-elements'
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
      <View style={{flex: 1, marginTop: 35}} behavior='padding'>
        <Card title="New Card">
          <TextInput
            placeholder="Enter question: "
            style={{height: 40, marginLeft: 20, fontSize: 20}}
            value={question}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ question: text })
            }} />

          <TextInput
            placeholder="Enter answer: "
            style={{height: 40, marginLeft: 20, fontSize: 20}}
            value={answer}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ answer: text })
            }} />

          <TextInput
            placeholder="Enter comment: "
            style={{height: 40, marginLeft: 20, fontSize: 20}}
            value={comments}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ comments: text })
            }} />

          <CheckBox
            center
            title='Check this box if the entered answer is correct'
            checked={answerType}
            containerStyle={{borderRadius: 30, marginBottom: 10}}
            onPress={() => {
              this.setState({ answerType: !(answerType) })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor='#0e0787'
            disabled={!(question.length !== 0 && answer.length !== 0)}
            onPress={this.submit}
            buttonStyle={{borderRadius: 5}}
            title='Create Card' />
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
