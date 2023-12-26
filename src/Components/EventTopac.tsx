import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {fontSize, hp, wp} from '../Constants/helper/helper';
import colors from '../Constants/data/Colors';
import { ImagePath } from '../../assets';

const EventTopac = ({
  fontStyle,
  bottom,
  topacTxt,
  onPressEvent,
  disable,
  isImage,
  imgeSource,
  imageStyle,
}: any) => {
  return (
    <View style={[styles.topacView, {bottom: bottom}]}>
      <TouchableOpacity
        style={styles.topac}
        onPress={onPressEvent}
        disabled={disable}>
        {isImage ? <Image source={imgeSource} style={imageStyle} /> :<Text style={fontStyle}>{topacTxt}</Text> }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topacView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  topac: {
    height: wp(100),
    width: wp(100),
    borderRadius: wp(100),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },
});

export default EventTopac;
