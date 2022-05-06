import React, { useState } from 'react'
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'
import { ArrowLeft } from 'phosphor-react-native'

import { FeedbackType } from '../Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { ScreenshotButton } from '../ScreenshotButton'
import { Button } from '../Button'

import { api } from '../../libs/api'

import { styles } from './styles'
import { theme } from '../../theme'

interface Props {
  feedbackType: FeedbackType
  onFeedbackCancel: () => void
  onFeedbackSent: () => void
}

export function Form({
  feedbackType,
  onFeedbackCancel,
  onFeedbackSent
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [comment, setComment] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleScreenshot() {
    const uri = await captureScreen({
      format: 'jpg',
      quality: 0.8
    })

    setScreenshot(uri)
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return

    setIsSendingFeedback(true)

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }))

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64,${screenshotBase64}`
      })

      onFeedbackSent()
    } catch {
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancel}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        textAlignVertical="top"
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  )
}
