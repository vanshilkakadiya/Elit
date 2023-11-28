import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../Constants/data/Colors';
import {hp, wp} from '../Constants/helper/helper';
import {useNavigation} from '@react-navigation/native';

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
  const {navigate}: any = useNavigation();

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
    height: hp(100),
    flex: 1,
    width: wp(100),
    justifyContent: 'center',
    borderRadius: wp(50),
  },
  btnName: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default EventButton;
