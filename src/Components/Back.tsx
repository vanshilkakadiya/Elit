import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSize, wp} from '../Constants/helper/helper';
import colors from '../Constants/data/Colors';
import {useNavigation} from '@react-navigation/native';

const Back = ({backwardString}: any) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{backwardString}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontSize: fontSize(30),
    marginLeft: wp(25),
    fontWeight: '500',
    color: colors.black,
  },
});

export default Back;
