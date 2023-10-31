import { Dimensions, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const dimensions = Dimensions.get("screen");

const width = Dimensions.get("screen")?.width;

const height = Dimensions.get("screen").height;

const fontSize = (val: number) => RFValue(val, height);

const wp = (val: number) => widthPercentageToDP((val * 100) / (width));

const hp = (val: number) => heightPercentageToDP((val * 100) / height);

export const isIos = Platform.OS === 'ios' ? true : false;

export { dimensions, width, height, fontSize, wp, hp };

export const validateEmail = (email: string) => {
  var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const isEmailValid = validEmailRegex.test(email)
  return isEmailValid;
}
