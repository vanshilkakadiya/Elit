import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import React from 'react';
import colors from '../Constants/data/Colors';
import {hp, wp} from '../Constants/helper/helper';

const EventButton = ({
  buttonName,
  fontSize,
  navScreenName,
  bottomSize,
  onPressEvent,
  disabled,
  isLogo,
  logoPath,
  logoStyle
}: any) => {

  return (
    <View style={styles.viewBottom}>
      <TouchableOpacity
        style={[styles.topacView, {bottom: bottomSize}]}
        onPress={onPressEvent}
        disabled={disabled}
        >
          {
            isLogo?<Image source={logoPath} style={logoStyle}  />:
            <Text style={[styles.btnName, {fontSize: fontSize}]}>{buttonName}</Text>
          }
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  viewBottom: {
    marginRight: wp(25),
    flex: 1,
  },
  topacView: {
    backgroundColor: colors.black,
    position: 'absolute',
    alignSelf: 'flex-end',
    height: hp(90),
    flex: 1,
    width: wp(90),
    justifyContent: 'center',
    borderRadius: wp(100),
    zIndex:1
  },
  btnName: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default EventButton;
