import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import indexs from '../../../assets/Svg/index/indexs';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Auth = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [passwordValidError, setPasswordValidError] = useState(false);

  const handleValidEmail = (val: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('email address must be conte');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  const handlePasswordLength = (val: any) => {
    if (password.length < 6) {
      setPasswordValidError(true);
    } else {
      setPasswordValidError(false);
    }
  };

  const logInWithEmail = ({email, password}: any) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.appLogoView}>
        <indexs.SVGComponent />
        <Text style={styles.ELIT_LoginTxt}>{strings.ELIT_Login}</Text>
      </View>
      <TextInput
        style={styles.inputStyle}
        label="Email"
        mode="flat"
        autoCorrect={false}
        autoCapitalize="none"
        activeUnderlineColor="black"
        keyboardType="email-address"
        onChangeText={email => {
          setEmail(email), handleValidEmail(email);
        }}
        value={email}
      />
      {emailValidError ? (
        <Text style={styles.warningMessage}>{emailValidError}</Text>
      ) : null}

      <TextInput
        style={styles.inputStyle}
        value={password}
        label="Password"
        mode="flat"
        activeUnderlineColor="black"
        secureTextEntry={showPassword}
        textContentType="password"
        autoCorrect={false}
        onChangeText={password => {
          handlePasswordLength(password), setPassword(password);
        }}
        right={
          <TextInput.Icon
            icon={
              showPassword
                ? require('../../../assets/Icon/hides.png')
                : require('../../../assets/Icon/view.png')
            }
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {passwordValidError ? (
        <Text style={styles.warningMessage}>{strings.validPasswordLength}</Text>
      ) : null}
      <View style={styles.mainConatinerStyle}>
        <TouchableOpacity
          disabled={email.length < 7 || password.length < 7 ? true : false}
          style={styles.nextBtn}
          onPress={() => {
            logInWithEmail({email, password}), setPassword(''), setEmail('');
          }}>
          <Text style={styles.nextText}>{strings.NEXT}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appLogoView: {
    marginVertical: hp(50),
  },
  ELIT_LoginTxt: {
    fontSize: fontSize(50),
    fontWeight: '500',
    marginLeft: wp(25),
  },
  mainConatinerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInput: {
    marginHorizontal: wp(25),
    backgroundColor: colors.white,
    marginVertical: hp(15),
  },
  warningMessage: {
    color: colors.red,
    marginLeft: wp(25),
    fontSize: fontSize(20),
  },
  eyeIcon: {
    height: hp(25),
    width: wp(25),
  },
  nextBtn: {
    height: hp(100),
    width: wp(100),
    backgroundColor: colors.black,
    borderRadius: hp(150),
    marginRight: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: hp(50),
  },
  nextText: {
    color: colors.white,
    fontSize: fontSize(25),
  },
  inputStyle: {
    height: hp(55),
    marginTop: hp(20),
    marginHorizontal: hp(25),
    backgroundColor: 'white',
  },
});

export default Auth;
