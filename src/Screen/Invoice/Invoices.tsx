import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import strings from '../../Constants/data/Strings';
import Back from '../../Components/Back';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import {ImagePath} from '../../../assets';
import {Switch} from 'react-native-switch';
import {ButtonGroup} from '@rneui/themed';
import EventTopac from '../../Components/EventTopac';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Invoices = ({navigation}: any) => {
  const helpAlert = () => {
    Alert.alert(strings.HELP, strings.enterProductDetailHelp, [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);
  };

  const [unpaid, setUnpaid] = useState(true);

  const allInvoice = useSelector((state: any) => state.invoice.invoiceList);
  useEffect(()=>{
    // console.log(allInvoice,"allInvoice in the useEffect");
    allInvoice.filter((item:any)=>{
      let overdue=[] 
      let viewed=[] 
      var paymentDate = moment(item.data.paymentDate);
      let dueDays = paymentDate.diff(item.data.invoiceDate, 'days');
      console.log(dueDays,"dueDays inside the filter");

      
    })
  },[])

  const InvoiceData = ({data}: any) => {
    var paymentDate = moment(data.data.paymentDate);
    let dueDays = paymentDate.diff(data.data.invoiceDate, 'days');
    return (
      <View style={{flex: 1, flexDirection: 'row', marginVertical: hp(10)}}>
        <View style={styles.firstCharView}>
          <Text style={styles.firstCharTxt}>
            {data.data.customer.data.Name.charAt(0)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <Text style={{fontSize: fontSize(25), marginLeft: wp(15)}}>
              {data?.data?.customer?.data?.Name}
            </Text>
            <Text style={{fontSize: fontSize(20),fontWeight:'300', marginLeft: wp(15)}}>
              {strings.hashinvoice} {data?.data?.invoiceNumber}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: fontSize(25), marginLeft: wp(15),alignSelf:'flex-end'}}>
              {'\u20B9'}
              {data?.data?.totalAmount}
            </Text>
            {
              <Text style={{color:dueDays<1?colors.red:colors.black,fontSize:fontSize(20)}}>
                Due{' '}
                {dueDays == 1
                  ? strings.tomorrow
                  : dueDays == 0
                  ? strings.today
                  : dueDays == -1
                  ? strings.yesterday
                  : dueDays > 1
                  ? `${dueDays}after`
                  : dueDays < -1
                  ? `${dueDays} ago`
                  : null}
              </Text>
            }
          </View>
        </View>
      </View>
    );
  };

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
        {/* <Text
          style={{
            marginVertical: hp(25),
            color: colors.infoSuggestText,
            fontSize: fontSize(20),
          }}>
          {strings.OVERDUE}
        </Text> */}

        {unpaid&&
          <FlatList
          data={allInvoice}
          showsVerticalScrollIndicator={false}
          // @ts-ignore
          renderItem={({item}) => <InvoiceData data={item} />}
        />}
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
  firstCharView: {
    backgroundColor: colors.invoiceBackground,
    height: hp(60),
    width: wp(60),
    borderRadius: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstCharTxt: {
    fontSize: fontSize(30),
    fontWeight: '500',
  },
  statusView: {
    backgroundColor: colors.invoiceBackground,
    padding: hp(10),
    borderRadius: hp(15),
    flexDirection: 'row',
  },
  statusBackground: {
    flex: 1,
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
