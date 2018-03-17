import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 5,
    marginBottom: 25
  },
  chkBox: {
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center'
  },
  txtInput: {
    height: 40,
    borderColor: colors.GREY,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 14,
  },
  flipCard: {
    height: 250,
    opacity: 0.8
  },
  flipCardViews: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  text: {
    textAlign: 'center'
  },
})
