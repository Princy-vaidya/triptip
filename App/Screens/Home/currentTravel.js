import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CurrentTravel() {
  return (
    <View style={styles.container}>
      <Text>Current Travel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})