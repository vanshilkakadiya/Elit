import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import colors from '../../Constants/data/Colors';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const AddCustomer = ({navigation}: any) => {
  return (
    <KeyboardAwareScrollView style={styles.mainView} scrollEnabled={false}>
    <SafeAreaView>
      <View style={styles.allContentView}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.cancleText}>{strings.CANCLE}</Text>
        </TouchableOpacity>
        <Text style={styles.AddCustomerText}>{strings.AddCustomer}</Text>
        <TextInput
          style={styles.inputStyle}
          label={strings.CustomerName}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
        />
        <TextInput
          style={styles.inputStyle}
          label={strings.PhoneNo}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
          keyboardType='numeric'
        />
        <TextInput
          style={styles.inputStyle}
          label={strings.Email_Address}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
          keyboardType='email-address'
        />
        <TextInput
          style={styles.inputStyle}
          label={strings.PANNo}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
        />
        <Text style={styles.infoSuggestText}>{strings.CustomerGSTDetail}</Text>
        <TextInput
          style={styles.inputStyle}
          label={strings.GSTNo}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
        />
        <TextInput
          style={styles.inputStyle}
          label={strings.GSTState}
          mode="flat"
          autoCorrect={false}
          autoCapitalize="none"
          activeUnderlineColor="black"
          underlineColor="black"
        />
        <View style={styles.relative}>
          <TextInput
            style={styles.inputStyles}
            label={strings.GSTStateCode}
            mode="flat"
            autoCorrect={false}
            autoCapitalize="none"
            activeUnderlineColor="black"
            underlineColor="black"
          />
          <Text style={styles.infoSuggestText}>{strings.BillingAddress}</Text>
        </View>
        <View style={styles.submitBtnView}>
          <TouchableOpacity style={styles.SUBMITTopac}>
            <Text style={styles.SUBMITText}>{strings.SUBMIT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </KeyboardAwareScrollView>

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
    fontSize: fontSize(40),
    fontWeight: '500',
    marginTop: hp(40),
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
    marginLeft: wp(40),
    marginTop: hp(15),
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



// import React from 'react';
// import {
//   View,
//   KeyboardAvoidingView,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   Button,
//   Keyboard,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// const AddCustomer = () => {
//   return (
//     <KeyboardAwareScrollView>
//       <View style={styles.inner}>
//         <Text style={styles.header}>Header</Text>
//         <TextInput placeholder="Username" style={styles.textInput} />
//         <View style={styles.btnContainer}>
//           <TextInput placeholder="Username 1" style={styles.textInput} />
//           <TextInput placeholder="Username 2" style={styles.textInput} />
//           <TextInput placeholder="Username 3" style={styles.textInput} />
//           <TextInput placeholder="Username 4" style={styles.textInput} />
//           <TextInput placeholder="Username 5" style={styles.textInput} />
//           <TextInput placeholder="Username 6" style={styles.textInput} />
//           <TextInput placeholder="Username 7" style={styles.textInput} />
//           <TextInput placeholder="Username 8" style={styles.textInput} />
//           <TextInput placeholder="Username 9" style={styles.textInput} />
//           <TextInput placeholder="Username 10" style={styles.textInput} />
//           <TextInput placeholder="Username 11" style={styles.textInput} />
//           <TextInput placeholder="Username 12" style={styles.textInput} />
//           <TextInput placeholder="Username 13" style={styles.textInput} />
//           <Button title="Submit" onPress={() => null} />
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#000000',
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: 'white',
//     marginTop: 12,
//   },
// });
// export default AddCustomer;