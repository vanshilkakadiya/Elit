import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../Constants/helper/helper';
import colors from '../Constants/data/Colors';

const OperationButton = ({eventName, iconPath,onPressEvent}: any) => {
  return (
    <View>
      <TouchableOpacity style={styles.functionTopac} onPress={onPressEvent}>
        <Image source={iconPath} style={styles.eventImage} />
        <Text style={styles.eventText}>{eventName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  functionTopac: {
    backgroundColor: colors.black,
    height: hp(85),
    width: wp(175),
    borderRadius: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  eventImage: {
    height: hp(30),
    width: wp(30),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  eventText: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: 'white',
    marginLeft: wp(10),
  },
});

export default OperationButton;
