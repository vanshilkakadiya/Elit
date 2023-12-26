import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import strings from '../../Constants/data/Strings';
import Back from '../../Components/Back';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import {ImagePath} from '../../../assets';
import {Switch} from 'react-native-switch';
import {ButtonGroup} from '@rneui/themed';
import EventTopac from '../../Components/EventTopac';

const Invoices = ({navigation}: any) => {
  //     buttonName,
  //   fontSize,
  //   navScreenName,
  //   bottomSize,
  //   onPressEvent,
  //   disabled,
  //   isLogo,
  //   logoPath,
  //   logoStyle

  const helpAlert = () => {
    Alert.alert(strings.HELP, strings.enterProductDetailHelp, [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);
  };

  const [unpaid, setUnpaid] = useState(false);

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.headerView}>
        <Back backwardString={strings.MENU} />
        <Back
          backwardString={strings.HELP}
          onPressFunction={() => {
            helpAlert();
          }}
        />
      </View>
      <View style={styles.contain}>
        <View
          style={[styles.flexDirectionRow, styles.verticleSpaceIncoicesTxt]}>
          <Text style={styles.invoiceTxt}>{strings.Invoices}</Text>
          <TouchableOpacity>
            <Image
              source={ImagePath.magnifying}
              style={styles.magnifyingGlass}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.statusView}>
          <TouchableOpacity
            style={[
              styles.statusBackground,
              {
                backgroundColor: unpaid
                  ? colors.white
                  : colors.invoiceBackground,
              },
            ]}
            onPress={() => setUnpaid(true)}>
            <Text>{strings.Unpaid}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusBackground,
              {
                backgroundColor: !unpaid
                  ? colors.white
                  : colors.invoiceBackground,
              },
            ]}
            onPress={() => setUnpaid(false)}>
            <Text>{strings.Paid}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EventTopac
        bottom={25}
        isImage={true}
        imgeSource={ImagePath.plusLogo}
        onPressEvent={() => {
          navigation.navigate('CreateInvoice');
        }}
        imageStyle={styles.imageStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  invoiceTxt: {
    fontSize: fontSize(50),
    fontWeight: '500',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contain: {
    marginHorizontal: wp(20),
    // position:'relative',
  },
  verticleSpaceIncoicesTxt: {
    marginTop: hp(50),
    marginBottom: hp(30),
  },
  submitTxt: {
    color: colors.white,
    fontSize: fontSize(100),
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  magnifyingGlass: {
    height: hp(35),
    width: wp(35),
    resizeMode: 'contain',
  },
  statusView: {
    backgroundColor: colors.invoiceBackground,
    padding: hp(10),
    borderRadius: hp(15),
    flexDirection: 'row',
  },
  statusBackground: {
    flex: 1,
    // backgroundColor: unpaid ? colors.white : colors.invoiceBackground,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(50),
    borderRadius: hp(15),
  },
  topacView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  plusLogo: {
    height: hp(50),
    width: wp(50),
    tintColor: colors.white,
    resizeMode: 'contain',
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
  },
  topac: {
    height: hp(100),
    width: hp(100),
    borderRadius: 100,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },
  imageStyle: {
    tintColor: 'white',
    height: hp(50),
    width: wp(50),
  },
});

export default Invoices;
