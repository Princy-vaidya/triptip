import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Loader({loading}) {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
    />
  );
}


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
})