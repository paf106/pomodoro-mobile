import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Header ({ currentTime, setTime, setCurrentTime }) {

  function handlePress (index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setTime(newTime * 60)
    setCurrentTime(index)
  }

  const options = ['Pomodoro', 'Short Break', 'Long Break']
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity key={index}
                          style={[styles.optionItem, currentTime !== index && { borderColor: 'transparent' }]}
                          onPress={() => handlePress(index)}>
          <Text style={{ fontWeight: 'bold' }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  optionItem: {
    padding: 10,
    alignItems: 'center',
    borderColor: 'white',
    flex: 1,
    borderRadius: 10,
    borderWidth: 3,

  }
})