import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    selectedAnswerType: false,
    isFinished: false,
    displayResult: ''
  }

  nextCard = () => {
    const { index } = this.state
    const { cards } = this.props

    if (index < (cards.length - 1)) {
      this.setState({ displayResult: '', selectedAnswerType: false })
      this.setState((state) => {
        return { index: index + 1 }
      })
    } else {
      this.setState({ isFinished: true })
    }
  }

  submitAnswer = (userAnswer) => {
    const { index } = this.state
    const { cards } = this.props
    if (cards[index].answerType === userAnswer) {
      this.setState((prev) => {
        return { score: prev.score + 1 }
      })
      this.setState({ displayResult: 'Correct Answer!', selectedAnswerType: true })
    } else {
      this.setState({ displayResult: 'Wrong answer!', selectedAnswerType: false })
    }
  }

  restartQuiz = () => {
    this.setState({
      index: 0,
      score: 0,
      isFinished: false,
      selectedAnswerType: false,
      displayResult: ''
    })
    clearLocalNotifications()
      .then(setLocalNotification)
  }

  toDeck = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back({
      key: 'Quiz'
    }))
    clearLocalNotifications()
      .then(setLocalNotification)
  }

  render() {
    const { cards, title } = this.props
    const { index, isFinished, displayResult, score, selectedAnswerType } = this.state

    let currentCard = cards[index]

    if (!isFinished) {
      return (
        <View style={{flex: 0.5, justifyContent: 'space-between'}}>
          <View>
            <Text style={{textAlign: 'center', fontSize: 25, marginTop: 20}}>{(index + 1) + " / " + cards.length + " cards"}</Text>
            <Text style={{textAlign: 'center', fontSize: 25, marginTop: 20}}>{"Deck: " + title}</Text>
            <FlipCard
              style={{height: 250, opacity: 0.8}}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={true}
              flip={false}
              clickable={true}
              onFlipEnd={(isFlipEnd)=>{isFlipEnd}} >
              {/* Front Side */}
              <View style={{marginTop: 30, backgroundColor: 'rgb(15, 9, 7)', alignItems: 'center', justifyContent: 'center', height: 150}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 25}}>
                  {currentCard.question}
                </Text>
              </View>
              {/* Back Side */}
              <View style={{marginTop: 30, backgroundColor: 'rgb(8, 41, 26)', alignItems: 'center', justifyContent: 'center', height: 150}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 25}}>
                  {currentCard.answer}
                </Text>
              </View>
            </FlipCard>
          </View>

          <View>
            {displayResult.length === 0 && (
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  backgroundColor='green'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20, height: 60, width: 150}}
                  title='Correct'
                  onPress={() => this.submitAnswer(true)} />
                <Button
                  backgroundColor='red'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20, height: 60, width: 150}}
                  title='Incorrect'
                  onPress={() => this.submitAnswer(false)} />
              </View>
            )}

            {displayResult.length > 0 && (
              <View style={{flex:1, justifyContent: 'space-between'}}>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 22,
                      color: selectedAnswerType ? 'rgb(3, 136, 12)' : 'rgb(233, 48, 7)'}}>{displayResult}</Text>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 18,
                      color: 'rgb(24, 4, 92)'}}>{'Info: ' + currentCard.comments}</Text>
                <Button
                  backgroundColor='#444444'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20, height: 60}}
                  title='NEXT'
                  onPress={this.nextCard} />
              </View>
            )}
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <Card
            title="Quiz Results">
            <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 22}}>
              {'Your score: ' + ((score / cards.length) * 100).toFixed(2) + "%\n"}
              {score + " / " + cards.length + " answered correctly"}
            </Text>
            <Button
              icon={{name: 'replay'}}
              backgroundColor='rgb(24, 4, 92)'
              buttonStyle={{borderRadius: 5, marginBottom: 20}}
              title='Restart Quiz'
              onPress={this.restartQuiz} />
            <Button
              icon={{name: 'arrow-back'}}
              backgroundColor='rgb(74, 74, 74)'
              onPress={this.toDeck}
              buttonStyle={{borderRadius: 5}}
              title='Back to Deck' />
          </Card>
        </View>
      )
    }
  }
}

function mapStateToProps (decks, { navigation }) {
  const { title } = navigation.state.params

  return {
    cards: decks[title].cards,
    title
  }
}

export default connect(mapStateToProps)(Quiz)
