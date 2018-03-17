import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { styles } from '../utils/styles'
import { colors } from '../utils/colors'

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
          title="Title of the new deck"
          containerStyle={{justifyContent: 'space-between'}}>
          <TextInput
            placeholder='Enter deck title: '
            style={styles.txtInput}
            value={title}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ title: text })
            }} />

          <Button
            icon={{name: 'add'}}
            backgroundColor={colors.DARK_BLUE}
            disabled={title.length === 0}
            onPress={this.submit}
            buttonStyle={styles.btn}
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
