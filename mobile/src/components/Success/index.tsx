import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import successImg from '../../assets/success.png'

import { Copyright } from '../Copyright'

import { styles } from './styles'

interface Props {
  onFeedbackRestartRequest: () => void
}

export function Success({ onFeedbackRestartRequest }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onFeedbackRestartRequest}
      >
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}
