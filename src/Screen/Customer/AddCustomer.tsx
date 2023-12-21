import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState} from 'react';
import colors from '../../Constants/data/Colors';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, validateEmail, wp} from '../../Constants/helper/helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Back from '../../Components/Back';
import EventTopac from '../../Components/EventTopac';
import TextInputCom from '../../Components/TextInputCom';
import {useDispatch, useSelector} from 'react-redux';
import { addCustomerList} from '../../Redux/action/action';

const AddCustomer = ({navigation, route}: any) => {
  const {otherParam,id} = route?.params;
  
  const dispatch = useDispatch();

  const user:any=firebase.auth().currentUser

  const [name, setName] = useState(otherParam?.Name || '');
  const [panNo, setPanNo] = useState(otherParam?.Pan || '');
  const [gstNo, setGstNo] = useState(otherParam?.GstNo || '');
  const [state, setState] = useState(otherParam?.State || '');
  const [townCity, setTownCity] = useState(otherParam?.City || '');
  const [phoneNo, setPhoneNo] = useState(otherParam?.PhoneNo || '');
  const [isValidName, setIsValidName] = useState(otherParam ? true : false);
  const [isValidPan, setIsSetValidPan] = useState(otherParam ? true : false);
  const [isValidMono, setIsSetValidMono] = useState(otherParam ? true : false);
  const [isValidEmail, setIsSetValidEmail] = useState(otherParam ? true : false);
  const [gstState, setGstState] = useState(otherParam?.GstState || '');
  const [gstStateCode, setGstStateCode] = useState(
    otherParam?.GstStateCode || '',
  );
  const [emailAddress, setEmailAddress] = useState(otherParam?.Email || '');
  const [address, setAddress] = useState(otherParam?.Address || '');
  const [shippingAddress, setShippingAddress] = useState(
    otherParam?.ShippingAddress || '',
  );
  const [shippingTownCity, setShippingTownCity] = useState(
    otherParam?.ShippingCity || '',
  );
  const [shippingState, setShippingState] = useState(
    otherParam?.ShippingState || '',
  );
  const [isChecked, setIsChecked] = useState(
    otherParam ? otherParam.sameAddress : false,
  );

  const customerRegestraion = async () => {
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Customers')
      .doc()
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
        ShippingAddress: shippingAddress,
        ShippingCity: shippingTownCity,
        ShippingState: shippingState,
        sameAddress: isChecked,
        id: new Date().getTime().toString(),
      }).then(()=>{
        navigation.navigate('Customers')
      })

    const customerData = {
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
      ShippingAddress: shippingAddress,
      ShippingCity: shippingTownCity,
      ShippingState: shippingState,
      sameAddress: isChecked,
      id: new Date().getTime().toString(),
    };
    // dispatch(addCustomerList(customerData));
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
    if (
      isValidEmail &&
      isValidPan &&
      isValidMono &&
      isValidName == true &&
      gstNo &&
      gstState &&
      gstStateCode &&
      address &&
      townCity &&
      state &&
      shippingAddress &&
      shippingTownCity &&
      shippingState
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateData = () => {
    const userDetail = {
      Address: address,
      City: townCity,
      Email: emailAddress,
      GstNo: gstNo,
      GstState: gstState,
      GstStateCode: gstStateCode,
      Name: name,
      Pan: panNo,
      PhoneNo: phoneNo,
      State: state,
      ShippingAddress: shippingAddress,
      ShippingCity: shippingTownCity,
      ShippingState: shippingState,
      sameAddress: isChecked,
    };
    
    (firestore()
      .collection('AllData')
      .doc(user.uid)
      .collection('Customers')
      .doc(id)
      .update(userDetail))
      .then(() => {
        // dispatch(updateCustomerList({userDetail,id}))
        navigation.navigate('DetailCustomer',{otherParam:id});
        // navigation.navigate('Customers');
      });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <EventTopac
        topacTxt={strings.SUBMIT}
        bottom={50}
        fontStyle={styles.submitTxt}
        disable={!isValidDataCheck()}
        onPressEvent={() => {
          {
            otherParam != undefined ? updateData() : customerRegestraion();
          }
          // navigation.navigate('Customers');
        }}
      />

      <Back backwardString={strings.CANCLE} />
      <View style={styles.allContentView}>
        <Text style={styles.AddCustomerText}>{strings.AddCustomer}</Text>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={hp(350)}
          style={{marginBottom: 125}}
          enableOnAndroid={true}>
          <TextInputCom
            label={strings.CustomerName}
            value={name}
            onchangeText={(value: any) => {
              setName(value), validNameInput(value);
              isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.PhoneNo}
            value={phoneNo}
            keyboardType={'numeric'}
            onchangeText={(value: any) => {
              setPhoneNo(value);
              validMoNo(value);
              isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.Email_Address}
            value={emailAddress}
            keyboardType={'email-address'}
            onchangeText={(value: any) => {
              setEmailAddress(value), checkValidEmail(value);
              isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.PANNo}
            value={panNo}
            onchangeText={(value: any) => {
              value.toUpperCase();
              setPanNo(value);
              panCheck(value);
              isValidDataCheck();
            }}
          />
          <Text style={styles.infoSuggestText}>
            {strings.CustomerGSTDetail}
          </Text>
          <TextInputCom
            label={strings.GSTNo}
            value={gstNo}
            onchangeText={(value: any) => {
              setGstNo(value);
              isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.GSTState}
            value={gstState}
            onchangeText={(value: any) => {
              setGstState(value), isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.GSTStateCode}
            value={gstStateCode}
            keyboardType={'numeric'}
            onchangeText={(value: any) => {
              setGstStateCode(value), isValidDataCheck();
            }}
          />
          <Text style={styles.infoSuggestText}>{strings.BillingAddress}</Text>
          <TextInputCom
            label={strings.Address}
            value={address}
            onchangeText={(value: any) => {
              setAddress(value), isValidDataCheck();
              isChecked&&setShippingAddress(value)
            }}
          />
          <TextInputCom
            label={strings.Town_City}
            value={townCity}
            onchangeText={(value: any) => {
              setTownCity(value), isValidDataCheck();
              isChecked&&setShippingTownCity(value)
            }}
          />
          <TextInputCom
            label={strings.State}
            value={state}
            onchangeText={(value: any) => {
              setState(value), isValidDataCheck();
              isChecked&&setShippingState(value)
            }}
          />
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setIsChecked(!isChecked);
                !isChecked
                  ? (setShippingAddress(address),
                    setShippingTownCity(townCity),
                    setShippingState(state))
                  : (setShippingAddress(''),
                    setShippingTownCity(''),
                    setShippingState(''));
              }}
              style={{flexDirection: 'row'}}>
              <View style={styles.mainViewOfCheckBox}>
                {isChecked ? (
                  <Image
                    source={require('../../../assets/Images/checkmark.png')}
                    style={styles.checkMarkImg}
                  />
                ) : null}
              </View>
              <Text style={styles.checkBoxText}>
                {strings.Shipping_address_is_same_as_billing_address}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInputCom
            label={strings.Address}
            value={shippingAddress}
            editable={isChecked ? false : true}
            onchangeText={(value: any) => {
              setShippingAddress(value), isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.Town_City}
            value={shippingTownCity}
            editable={isChecked ? false : true}
            onchangeText={(value: any) => {
              setShippingTownCity(value), isValidDataCheck();
            }}
          />
          <TextInputCom
            label={strings.State}
            value={shippingState}
            editable={isChecked ? false : true}
            onchangeText={(value: any) => {
              setShippingState(value), isValidDataCheck();
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
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
  infoSuggestText: {
    color: colors.infoSuggestText,
    marginTop: hp(20),
    fontSize: fontSize(18),
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
  checkBoxView: {
    flexDirection: 'row',
    marginTop: hp(20),
  },
  checkBoxText: {
    marginLeft: wp(10),
    color: colors.infoSuggestText,
    fontSize: fontSize(17),
  },
  relative: {
    position: 'relative',
  },
  submitTxt: {
    fontSize: fontSize(15),
    color: colors.white,
    fontWeight: '600',
  },
});

export default AddCustomer;
