// Reference: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
// https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.android.js


import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { styles } from '../utils/styles'
import { colors } from '../utils/colors'

export default class Flipcard extends Component {
  state = {
    isFlipped: false
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.isFlipped) {
      this.flipCard()
      this.state.isFlipped = false
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    if (this.value >= 90) {
      this.state.isFlipped = false
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
    } else {
      this.state.isFlipped = true
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }

  }

  render() {
    const { question, answer } = this.props

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.flipCardContainer}>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, {backgroundColor: colors.BLACK, opacity: this.frontOpacity}]}>
            <Text style={[styles.text, {color: colors.WHITE, fontSize: 25}]}>
              {question}
            </Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {backgroundColor: colors.DARK_GREEN, opacity: this.backOpacity}]}>
            <Text style={[styles.text, {color: colors.WHITE, fontSize: 25}]}>
              {answer}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}
