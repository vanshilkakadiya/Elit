import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../Constants/data/Colors';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EventButton from '../../Components/EventButton';
import CustomCheckBox from '../../Components/CustomCheckBox';

const AddCustomer = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [gstState, setGstState] = useState('');
  const [gstStateCode, setGstStateCode] = useState('');
  const [address, setAddress] = useState('');
  const [townCity, setTownCity] = useState('');
  const [state, setState] = useState('');

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
            onChangeText={value => setName(value)}
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
            onChangeText={value => setPhoneNo(value)}
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
            onChangeText={value => setEmailAddress(value)}
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
            onChangeText={value => setPanNo(value)}
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
            onChangeText={value => setGstNo(value)}
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
            <CustomCheckBox />
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
            value={address}
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
            value={townCity}
            editable={false}
          />
          <TextInput
            style={[styles.inputStyles, {marginBottom: hp(150)}]}
            label={strings.State}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
            value={state}
            editable={false}
          />
        </KeyboardAwareScrollView>
        <EventButton
          buttonName={strings.SUBMIT}
          fontSize={15}
          navScreenName={'AddCustomer'}
          bottomSize={150}
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
  },
  allContentView: {
    marginLeft: wp(25),
  },
  AddCustomerText: {
    fontSize: fontSize(50),
    fontWeight: '500',
    marginTop: hp(50),
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
