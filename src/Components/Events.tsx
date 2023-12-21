import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../Constants/data/Colors';
import {fontSize, hp, wp} from '../Constants/helper/helper';

const Events = ({eventText, logoPath, onPressEvent}: any) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.topac} onPress={onPressEvent}>
        {logoPath ? <Image source={logoPath} style={styles.logo} /> : null}
        <Text style={styles.eventName}>{eventText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex:1,
    backgroundColor: colors.white,
  },
  topac: {
    backgroundColor: colors.black,
    height: hp(85),
    width: wp(175),
    borderRadius: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    height: hp(30),
    width: wp(30),
    tintColor: colors.white,
    marginLeft: wp(5),
    resizeMode: 'contain',
  },
  eventName: {
    fontSize: fontSize(23),
    color: colors.white,
    fontWeight: '600',
    marginLeft: wp(10),
  },
});

export default Events;
