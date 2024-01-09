import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import strings from '../../Constants/data/Strings';
import Back from '../../Components/Back';
import colors from '../../Constants/data/Colors';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import {ImagePath} from '../../../assets';
import EventTopac from '../../Components/EventTopac';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const Invoices = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const [unpaid, setUnpaid] = useState(true);
  const [overDueData, setOverDue] = useState();
  const [viewedData, setViewed] = useState();
  const helpAlert = () => {
    Alert.alert(strings.HELP, strings.enterProductDetailHelp, [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);
  };

  const allInvoice = useSelector((state: any) => state.invoice.invoiceList);

  useEffect(() => {
    let overdue: any = [];
    let viewed: any = [];
    allInvoice?.filter((item: any) => {
      const startDate = moment(item.data.invoiceDate, 'D, MMMM, YYYY');
      const endDate = moment(item.data.paymentDate, 'D, MMMM, YYYY');
      const differenceInDays = endDate.diff(startDate, 'days');
      differenceInDays < 0 ? overdue.push(item) : viewed.push(item);
    });
    setOverDue(overdue);
    setViewed(viewed);
  }, [isFocused]);

  const InvoiceData = ({data}: any) => {
    const startDate = moment(data.data.paymentDate, 'D, MMMM, YYYY');
    const endDate = moment(data.data.invoiceDate, 'D, MMMM, YYYY');
    const differenceInDays: any = endDate.diff(startDate, 'days');
    return (
      <View style={styles.fletListMainView}>
        <View style={styles.firstCharView}>
          <Text style={styles.firstCharTxt}>
            {data.data.customer.data.Name.charAt(0)}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <View>
            <Text style={styles.userNameTxt}>
              {data?.data?.customer?.data?.Name}
            </Text>
            <Text style={styles.invoiceNumberTxt}>
              {strings.hashinvoice} {data?.data?.invoiceNumber}
            </Text>
          </View>
          <View>
            <Text style={styles.totalAmountTxt}>
              {'\u20B9'}
              {data?.data?.totalAmount}
            </Text>
            {
              <Text
                style={{
                  color:
                    differenceInDays == 0
                      ? colors.green
                      : differenceInDays > 0
                      ? colors.red
                      : colors.black,
                  fontSize: fontSize(20),
                }}>
                Due{' '}
                {differenceInDays == 1
                  ? strings.yesterday
                  : differenceInDays == 0
                  ? strings.today
                  : differenceInDays == -1
                  ? strings.tomorrow
                  : differenceInDays < 1
                  ? `${Math.abs(differenceInDays)} after`
                  : differenceInDays > -1
                  ? `${Math.abs(differenceInDays)} days ago`
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

        {unpaid && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.typeOfFlatListTxt}>{strings.OVERDUE}</Text>
              <FlatList
                data={overDueData}
                showsVerticalScrollIndicator={false}
                // @ts-ignore
                renderItem={({item}) => <InvoiceData data={item} />}
              />
            </View>

            <View>
              <Text style={styles.typeOfFlatListTxt}>{strings.VIEWED}</Text>
              <FlatList
                data={viewedData}
                showsVerticalScrollIndicator={false}
                style={{paddingBottom: hp(200)}}
                // @ts-ignore
                renderItem={({item}) => <InvoiceData data={item} />}
              />
            </View>
          </ScrollView>
        )}
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
  },
  verticleSpaceIncoicesTxt: {
    marginTop: hp(50),
    marginBottom: hp(30),
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
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  fletListMainView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: hp(10),
  },
  userNameTxt: {
    fontSize: fontSize(25),
    marginLeft: wp(15),
  },
  invoiceNumberTxt: {
    fontSize: fontSize(20),
    fontWeight: '300',
    marginLeft: wp(15),
  },
  totalAmountTxt: {
    fontSize: fontSize(25),
    marginLeft: wp(15),
    alignSelf: 'flex-end',
  },
  typeOfFlatListTxt: {
    marginVertical: hp(25),
    color: colors.infoSuggestText,
    fontSize: fontSize(20),
  },
});

export default Invoices;
