import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../Constants/data/Colors';
import {fontSize, hp} from '../Constants/helper/helper';
import {useNavigation} from '@react-navigation/native';

const DashBoardLinks = ({linkName, navigationScreenName}: any) => {
  const {navigate}: any = useNavigation();
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.linkText}>{linkName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linkText: {
    fontSize: fontSize(25),
    alignSelf: 'center',
    color: colors.linkText,
    marginVertical: hp(5),
  },
});

export default DashBoardLinks;
