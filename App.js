import { StatusBar } from 'expo-status-bar'
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Header from './src/components/Header'
import Timer from './src/components/Timer'
import Constants from 'expo-constants/src/Constants'
import * as Haptics from 'expo-haptics'
import { Audio } from 'expo-av'

export default function App () {

  const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    if (time === 0) {
      playEndPomodoroSound()
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300 : 1500)


    }
    return () => clearInterval(interval)

  }, [isActive, time])

  function handleStartStop () {
    playSound()
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
    setIsActive(!isActive)
  }

  async function playSound () {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/bell.wav')
    )
    await sound.playAsync()
  }

  async function playEndPomodoroSound () {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/timer-finished-alarm.wav')
    )
    await sound.playAsync()
  }


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <Text style={styles.title}>Pomodoro</Text>
      <Header currentTime={currentTime} setTime={setTime} setCurrentTime={setCurrentTime}/>
      <Timer time={time}/>
      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <Text style={{ fontSize: 20, color: 'white' }}>{
          isActive ? 'Stop' : 'Start'
        }</Text>
      </TouchableOpacity>
      <StatusBar style="auto"/>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' && Constants.statusBarHeight,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,

  }
})
