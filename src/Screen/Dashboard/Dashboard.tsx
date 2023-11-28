import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import strings from '../../Constants/data/Strings';
import auth from '@react-native-firebase/auth';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import colors from '../../Constants/data/Colors';
import DashBoardLinks from '../../Components/DashBoardLinks';
import allData from '../../Constants/data';

const Dashboard = ({navigation}: any) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!'), navigation.navigate('Auth');
      });
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <Text style={styles.LogoutText}>{strings.Logout}</Text>
      </TouchableOpacity>
      <Text style={styles.DashBoardText}>{strings.DashBoard}</Text>
      <FlatList
        data={allData.DATA}
        numColumns={2}
        renderItem={({item, index}: {item: any; index: number}) => {
          console.log('index', index);
          return (
            <View style={styles.flatListMainView}>
              <TouchableOpacity
                style={[
                  styles.boxView,
                  styles.shadowOffset,
                  {
                    backgroundColor:
                      index % 4 === 0
                        ? colors.cyan
                        : index % 4 === 1
                        ? colors.orange
                        : index % 4 === 2
                        ? colors.purpule
                        : colors.pink,
                  },
                ]}
                onPress={() => {
                  navigation.navigate(item?.nameOfPackage);
                }}>
                <Text style={styles.numberDataText}>{item.numOfData}</Text>
                <Text style={styles.packageNameText}>{item.nameOfPackage}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.linkView}>
        <DashBoardLinks linkName={strings.click} />
        <DashBoardLinks linkName={strings.GraphQLScreen} />
        <DashBoardLinks linkName={strings.sigbatureScreen} />
        <DashBoardLinks linkName={strings.FirebaseDemo} />
        <DashBoardLinks linkName={strings.Notification} />
        <DashBoardLinks linkName={strings.Mutation} />
        <DashBoardLinks linkName={strings.Apicalling} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  LogoutText: {
    alignSelf: 'flex-end',
    fontSize: fontSize(30),
    fontWeight: '500',
    marginRight: wp(15),
    color: colors.black,
  },
  DashBoardText: {
    fontSize: fontSize(40),
    fontWeight: '500',
    marginLeft: wp(15),
    marginTop: hp(75),
    marginBottom: hp(50),
    color: colors.black,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatListMainView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: hp(10),
    flex: 1,
  },
  boxView: {
    height: hp(110),
    width: wp(175),
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  shadowOffset: {
    shadowColor: colors.black,
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  numberDataText: {
    fontSize: fontSize(30),
    marginLeft: wp(15),
    color: colors.white,
    fontWeight: '700',
  },
  packageNameText: {
    fontSize: fontSize(30),
    marginLeft: wp(15),
    color: colors.white,
    fontWeight: '500',
  },
  linkView: {
    marginBottom: hp(25),
  },
});

export default Dashboard;
