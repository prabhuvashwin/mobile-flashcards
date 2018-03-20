import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import Flipcard from './Flipcard'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { styles } from '../utils/styles'
import { colors } from '../utils/colors'

class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    selectedAnswerType: false,
    displayResult: false,
    resultDescription: ''
  }

  resetState = () => {
    this.setState({
      index: 0,
      score: 0,
      selectedAnswerType: false,
      displayResult: false,
      resultDescription: ''
    })
  }

  submit = (userAnswer) => {
    const { index } = this.state
    const { cards } = this.props
    if (cards[index].answerType === userAnswer) {
      this.setState((prev) => {
        return { score: prev.score + 1 }
      })
      this.setState({ displayResult: true, resultDescription: 'Correct Answer!', selectedAnswerType: true })
    } else {
      this.setState({ displayResult: true, resultDescription: 'Wrong answer!', selectedAnswerType: false })
    }
  }

  nextCard = () => {
    const { index, score } = this.state
    const { cards, title, navigation } = this.props

    if (index < (cards.length - 1)) {
      this.setState({ displayResult: false, resultDescription: '', selectedAnswerType: false })
      this.setState((state) => {
        return { index: index + 1 }
      })
    } else {
      navigation.navigate('QuizResults', {
        numOfCards: cards.length,
        score,
        title
      })

      this.resetState()
    }
  }

  render() {
    const { cards, title } = this.props
    const { index, displayResult, score, resultDescription, selectedAnswerType } = this.state

    let currentCard = cards[index]

    return (
      <View style={{flex: 0.5, justifyContent: 'space-between'}}>
        <View>
          <Text style={[styles.text, {fontSize: 25, marginTop: 20}]}>{(index + 1) + " / " + cards.length + " cards"}</Text>
          <Text style={[styles.text, {fontSize: 25, marginTop: 20}]}>{"Deck: " + title}</Text>

          <Flipcard question={currentCard.question} answer={currentCard.answer} displayResult={displayResult} />

        </View>

        <View>
          {!displayResult && (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                backgroundColor={colors.BRIGHT_GREEN}
                buttonStyle={[styles.btn, {height: 60, width: 150}]}
                title='Correct'
                onPress={() => this.submit(true)} />
              <Button
                backgroundColor={colors.RED}
                buttonStyle={[styles.btn, {height: 60, width: 150}]}
                title='Incorrect'
                onPress={() => this.submit(false)} />
            </View>
          )}

          {displayResult && (
            <View style={{flex:1, justifyContent: 'space-between'}}>
              <Text style={[styles.text, {marginBottom: 20, fontSize: 22,
                    color: selectedAnswerType ? colors.BRIGHT_GREEN : colors.RED}]}>{resultDescription}</Text>
              <Text style={[styles.text, {marginBottom: 20, fontSize: 18,
                    color: colors.DARK_BLUE}]}>{'Info: ' + currentCard.comments}</Text>
              <Button
                backgroundColor={colors.GREY}
                buttonStyle={[styles.btn, {height: 60}]}
                title='Next'
                onPress={this.nextCard} />
            </View>
          )}
        </View>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { title, restart } = navigation.state.params
  return {
    cards: decks[title].cards,
    title
  }
}

export default connect(mapStateToProps)(Quiz)
