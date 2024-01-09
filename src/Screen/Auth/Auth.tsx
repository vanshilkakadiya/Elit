import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import indexs from '../../../assets/Svg/index/indexs';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import strings from '../../Constants/data/Strings';
import colors from '../../Constants/data/Colors';
import {TextInput} from 'react-native-paper';
import auth, {firebase} from '@react-native-firebase/auth';
import EventTopac from '../../Components/EventTopac';
import { ImagePath } from '../../../assets';

const Auth = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(true);
  const [emailValidError, setEmailValidError] = useState('');
  const [passwordValidError, setPasswordValidError] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleValidEmail = (val: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('email address must be require');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  const handlePasswordLength = (val: any) => {
    if (val.length < 7) {
      setPasswordValidError(true);
    } else {
      setPasswordValidError(false);
    }
  };

  const userLogin = ({email, password}: any) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        navigation.replace('Dashboard');
        setPassword(''), setEmail(''), setConfirmPassword('');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const signUp = ({email, password}: any) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard'),
          setPassword(''),
          setEmail(''),
          setConfirmPassword('');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View>
        <indexs.SVGComponent />
        {login ? (
          <Text style={styles.ELIT_LoginTxt}>{strings.ELIT_Login}</Text>
        ) : (
          <Text style={styles.ELIT_LoginTxt}>{strings.ELIT_SignUp}</Text>
        )}

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
      {emailValidError && (
        <Text style={styles.warningMessage}>{emailValidError}</Text>
      )}
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
                ? ImagePath.hides
                : ImagePath.view
            }
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {!login && (
        <View>
          <TextInput
            style={styles.inputStyle}
            value={confirmPassword}
            label="Confirm Password"
            mode="flat"
            activeUnderlineColor="black"
            secureTextEntry={showConfirmPassword}
            textContentType="password"
            autoCorrect={false}
            onChangeText={password => {
              handlePasswordLength(password), setConfirmPassword(password);
            }}
            right={
              <TextInput.Icon
                icon={
                  showConfirmPassword
                    ? ImagePath.hides
                    : ImagePath.view
                }
                onPress={() => setConfirmShowPassword(!showConfirmPassword)}
              />
            }
          />
         <View style={styles.switchTextView}>
          <Text style={styles.switchText}>{strings.HaveanAccount} ?</Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(true), setEmail(''), setPassword('');
            }}>
            <Text style={styles.signupTxt}>{strings.SignIn}</Text>
          </TouchableOpacity>
        </View>
        </View>
      )}

      {passwordValidError && (
        <Text style={styles.warningMessage}>{strings.validPasswordLength}</Text>
      )}
      {login && (
        <View style={styles.switchTextView}>
          <Text style={styles.switchText}>{strings.Donthaveanaccount} ?</Text>
          <TouchableOpacity
            onPress={() => {
              setLogin(false), setEmail(''), setPassword('');
            }}>
            <Text style={styles.signupTxt}>{strings.SignUp}</Text>
          </TouchableOpacity>
        </View>
      )}
        </View>
      <EventTopac
        bottom={50}
        disable={
          email.length < 7 ||
          password.length < 7 ||
          (!login && password != confirmPassword)
            ? true
            : false
        }
        onPressEvent={() => {
          login ? userLogin({email, password}) : signUp({email, password});
        }}
        topacTxt={strings.NEXT}
        fontStyle={styles.nextText}
      />

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ELIT_LoginTxt: {
    fontSize: fontSize(50),
    fontWeight: '500',
    marginLeft: wp(25),
    marginTop: hp(50),
    color: colors.black,
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  warningMessage: {
    color: colors.red,
    marginLeft: wp(40),
    fontSize: fontSize(20),
  },
  nextText: {
    color: colors.white,
    fontSize: fontSize(20),
    fontWeight: '700',
  },
  inputStyle: {
    height: hp(55),
    marginTop: hp(20),
    marginHorizontal: hp(25),
    backgroundColor: 'white',
  },
  switchTextView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp(15),
  },
  switchText: {
    fontSize: fontSize(18),
    marginRight: wp(10),
  },
  signupTxt: {
    color: colors.orange,
    fontWeight: '700',
    fontSize: fontSize(18),
  },
});

export default Auth;