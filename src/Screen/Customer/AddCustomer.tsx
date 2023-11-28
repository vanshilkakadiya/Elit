import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../Constants/data/Colors';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, validateEmail, wp} from '../../Constants/helper/helper';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EventButton from '../../Components/EventButton';
import CustomCheckBox from '../../Components/CustomCheckBox';
import firestore, {firebase} from '@react-native-firebase/firestore';

const AddCustomer = ({navigation, route}: any) => {
  const {otherParam} = route?.params;

  const [name, setName] = useState(otherParam?.Name || '');
  const [phoneNo, setPhoneNo] = useState(otherParam?.PhoneNo || '');
  const [emailAddress, setEmailAddress] = useState(otherParam?.Email || '');
  const [panNo, setPanNo] = useState(otherParam?.Pan || '');
  const [gstNo, setGstNo] = useState(otherParam?.GstNo || '');
  const [gstState, setGstState] = useState(otherParam?.GstState || '');
  const [gstStateCode, setGstStateCode] = useState(
    otherParam?.GstStateCode || '',
  );
  const [address, setAddress] = useState(otherParam?.Address || '');
  const [townCity, setTownCity] = useState(otherParam?.City || '');
  const [state, setState] = useState(otherParam?.State || '');
  const [isValidEmail, setIsSetValidEmail] = useState(
    otherParam ? true : false,
  );
  const [isValidPan, setIsSetValidPan] = useState(otherParam ? true : false);
  const [isValidMono, setIsSetValidMono] = useState(otherParam ? true : false);
  const [isValidName, setIsValidName] = useState(otherParam ? true : false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    otherParam ? setIsChecked(true) : setIsChecked(false);
  }, []);

  console.log();

  const customerRegestraion = async () => {
    firebase
      .firestore()
      .collection('AllCustomers')
      .doc(Math.random().toString())
      .set({
        Name: name,
        PhoneNo: phoneNo,
        Email: emailAddress,
        Pan: panNo,
        GstNo: gstNo,
        GstState: gstState,
        GstStateCode: gstStateCode,
        Address: address,
        City: townCity,
        State: state,
        sameAddress: isChecked,
      });
  };

  const panCheck = (value: any) => {
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regpan.test(value)) {
      setIsSetValidPan(true);
    } else {
      setIsSetValidPan(false);
    }
  };

  const validNameInput = (value: any) => {
    if (value.trim().length === 0) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };
  const validMoNo = (value: any) => {
    if (value.length == 10) {
      setIsSetValidMono(true);
    } else {
      setIsSetValidMono(false);
    }
  };

  const checkValidEmail = (value: any) => {
    setIsSetValidEmail(validateEmail(value));
  };

  const isValidDataCheck = () => {
    console.log('gstNo', isValidEmail, isValidPan, isValidMono, isValidName);
    if (
      gstNo.length == 0 ||
      gstState.length == 0 ||
      gstStateCode.length == 0 ||
      address.length == 0 ||
      townCity.length == 0 ||
      state.length == 0 ||
      isChecked == false
    ) {
      return false;
    } else if (isValidEmail && isValidPan && isValidMono && isValidName) {
      console.log('------- called -----------');

      return true;
    } else {
      return false;
    }
    console.log('isValidEmail', isValidEmail);

    // if (
    //   name.length == 0 ||
    //   phoneNo.length == 0 ||
    //   emailAddress.length == 0 ||
    //   panNo.length == 0 ||
    //   gstNo.length == 0 ||
    //   gstState.length == 0 ||
    //   gstStateCode.length == 0 ||
    //   address.length == 0 ||
    //   townCity.length == 0 ||
    //   state.length == 0||isChecked==false
    // ) {
    //   // )
    //   return false;
    // } else {
    //   return true;
    // }
    // if (
    //   name.length < 1 ||
    //   phoneNo.length == 0 ||
    //   emailAddress.length == 0 ||
    //   panNo.length == 0 ||
    //   gstNo.length == 0 ||
    //   gstState.length == 0 ||
    //   gstStateCode.length == 0 ||
    //   address.length == 0 ||
    //   townCity.length == 0 ||
    //   state.length == 0
    // ) {
    //   // )
    //   return false;
    // } else {
    //   return true;
    // }
  };

  const updateData = () => {
    firestore()
      .collection('AllCustomers')
      .doc(otherParam.id)
      .update({
        Address: address,
        City: townCity,
        Email: emailAddress,
        GstNo: gstNo,
        GstState: gstState,
        GstStateCode: gstStateCode,
        Name: name,
        Pan: panNo,
        PhoneNo: phoneNo,
        State: phoneNo,
      })
      .then(() => {
        navigation.navigate('Customers');
      });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.allContentView}>
        <TouchableOpacity onPress={() => navigation.navigate('Customers')}>
          <Text style={styles.cancleText}>{strings.CANCLE}</Text>
        </TouchableOpacity>
        <Text style={styles.AddCustomerText}>{strings.AddCustomer}</Text>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.inputStyle}
            label={strings.CustomerName}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={name}
            onChangeText={value => {
              setName(value), validNameInput(value);
              isValidDataCheck();
            }}
          />

          <TextInput
            style={styles.inputStyle}
            label={strings.PhoneNo}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            keyboardType="numeric"
            value={phoneNo}
            onChangeText={value => {
              setPhoneNo(value);
              validMoNo(value);
              isValidDataCheck();
            }}
          />
          <TextInput
            style={styles.inputStyle}
            label={strings.Email_Address}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={value => {
              setEmailAddress(value), checkValidEmail(value);
              isValidDataCheck();
            }}
          />
          <TextInput
            style={styles.inputStyle}
            label={strings.PANNo}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={panNo}
            onChangeText={value => {
              value.toUpperCase();
              setPanNo(value);
              panCheck(value);
              isValidDataCheck();
            }}
          />
          <Text style={styles.infoSuggestText}>
            {strings.CustomerGSTDetail}
          </Text>
          <TextInput
            style={styles.inputStyle}
            label={strings.GSTNo}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={gstNo}
            onChangeText={value => {
              setGstNo(value);
            }}
          />
          <TextInput
            style={styles.inputStyle}
            label={strings.GSTState}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={gstState}
            onChangeText={value => setGstState(value)}
          />
          <TextInput
            style={[styles.inputStyles, styles.relative]}
            label={strings.GSTStateCode}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={gstStateCode}
            keyboardType="numeric"
            onChangeText={value => setGstStateCode(value)}
          />
          <Text style={styles.infoSuggestText}>{strings.BillingAddress}</Text>
          <TextInput
            style={styles.inputStyles}
            label={strings.Address}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={address}
            onChangeText={value => setAddress(value)}
          />
          <TextInput
            style={styles.inputStyles}
            label={strings.Town_City}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={townCity}
            onChangeText={value => setTownCity(value)}
          />
          <TextInput
            style={styles.inputStyles}
            label={strings.State}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={state}
            onChangeText={value => setState(value)}
          />
          <View style={styles.checkBoxView}>
            {/* <CustomCheckBox /> */}
            <TouchableOpacity
              style={styles.mainViewOfCheckBox}
              onPress={() => {
                setIsChecked(!isChecked);
              }}>
              {isChecked ? (
                <Image
                  source={require('../../../assets/Images/checkmark.png')}
                  style={styles.checkMarkImg}
                />
              ) : null}
            </TouchableOpacity>

            <Text style={styles.checkBoxText}>
              {strings.Shipping_address_is_same_as_billing_address}
            </Text>
          </View>
          <TextInput
            style={styles.inputStyles}
            label={strings.Address}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={isChecked ? address : undefined}
            editable={false}
          />
          <TextInput
            style={styles.inputStyles}
            label={strings.Town_City}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={isChecked ? townCity : undefined}
            editable={false}
          />
          <TextInput
            style={[styles.inputStyles, {marginBottom: hp(200)}]}
            label={strings.State}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={isChecked ? state : undefined}
            editable={false}
          />
        </KeyboardAwareScrollView>

        <EventButton
          buttonName={strings.SUBMIT}
          disabled={!isValidDataCheck()}
          fontSize={15}
          bottomSize={150}
          onPressEvent={() => {
            {
              otherParam != undefined ? updateData() : customerRegestraion();
            }
            navigation.navigate('Customers');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cancleText: {
    fontSize: fontSize(30),
    fontWeight: '500',
    color: colors.black,
  },
  allContentView: {
    marginLeft: wp(25),
  },
  AddCustomerText: {
    fontSize: fontSize(50),
    fontWeight: '500',
    marginTop: hp(50),
    color: colors.black,
  },
  inputStyle: {
    height: hp(55),
    marginTop: hp(30),
    marginHorizontal: hp(25),
    backgroundColor: 'white',
    fontSize: fontSize(20),
  },
  inputStyles: {
    height: hp(55),
    marginTop: hp(30),
    marginHorizontal: hp(25),
    backgroundColor: 'white',
    fontSize: fontSize(20),
    color: colors.black,
  },
  infoSuggestText: {
    color: colors.infoSuggestText,
    marginLeft: wp(25),
    marginTop: hp(20),
    fontSize: fontSize(18),
  },
  SUBMITTopac: {
    height: hp(100),
    width: wp(100),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    alignSelf: 'flex-end',
    marginRight: wp(30),
  },
  mainViewOfCheckBox: {
    height: hp(20),
    width: wp(20),
    borderWidth: 1,
    borderColor: colors.infoSuggestText,
    borderRadius: 5,
  },
  checkMarkImg: {
    height: hp(15),
    width: wp(18),
  },
  SUBMITText: {
    fontSize: fontSize(23),
    fontWeight: '600',
    color: colors.white,
  },
  checkBoxView: {
    flexDirection: 'row',
    marginTop: hp(20),
    marginLeft: wp(25),
  },
  checkBoxText: {
    marginLeft: wp(10),
    color: colors.infoSuggestText,
    fontSize: fontSize(17),
  },
  relative: {
    position: 'relative',
  },
  submitBtnView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});

export default AddCustomer;
