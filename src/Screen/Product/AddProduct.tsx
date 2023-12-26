import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../Components/Back';
import strings from '../../Constants/data/Strings';
import {fontSize, hp, wp} from '../../Constants/helper/helper';
import colors from '../../Constants/data/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeModal from 'react-native-modal';
import EventTopac from '../../Components/EventTopac';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import TextInputCom from '../../Components/TextInputCom';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  addProductList,
} from '../../Redux/action/productAction';
import {ImagePath} from '../../../assets';

const AddProduct = ({navigation, route}: any) => {
  const {detail} = route?.params;

  console.log(
    detail?.id,
    'detaildetaildetaildetaildetaildetaildetaildetaildetail',
  );

  const [imagePath, setImagePath] = useState(detail?.data?.imageUrl || '');
  const [updatedImagePath, setUpdatedImagePath] = useState('');
  const [chooseImageSource, setChooseImageSource] = useState(false);
  const [productName, setProductName] = useState(
    detail?.data?.productName || '',
  );
  const [description, setDescription] = useState(
    detail?.data?.description || '',
  );
  const [stock, setStock] = useState(detail?.data?.stock || '');
  const [price, setPrice] = useState(detail?.data?.price || '');
  const [igst, setIgst] = useState(detail?.data?.igst || '');
  const [hsnCode, setHsnCode] = useState(detail?.data?.hsnCode || '');
  const [imageUrl, setImageUrl] = useState(detail?.data?.imageUrl || '');

  const dispatch = useDispatch();

  const user = firebase.auth().currentUser;

  const chooseFromGallary = () => {
    ImagePicker?.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then(image => {
      console.log(image.path, 'image from gallary');

      setImagePath(image.path);
      setChooseImageSource(false);
    });
  };

  const updatechooseFromGallary = () => {
    ImagePicker?.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then(image => {
      setUpdatedImagePath(image.path);
      setChooseImageSource(false);
    });
  };

  const openCamera = () => {
    ImagePicker?.openCamera({
      width: 600,
      height: 600,
      cropping: true,
    }).then(image => {
      setImagePath(image.path);
      setChooseImageSource(false);
    });
  };

  const uploadImage = async () => {
    const temp = imagePath.split('/');
    const imageName = temp[temp.length - 1];
    const imageRef = storage().ref(`userData/${imageName}`);
    await imageRef
      .putFile(imagePath, {contentType: 'image/jpg'})
      .catch(error => {
        console.log('error', error);
      });
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error;
    });
    return url;
  };

  const UpdateUploadImage = async () => {
    const temp = imagePath.split('/');
    const imageName = temp[temp.length - 1];
    const imageRef = storage().ref(`userData/${imageName}`);
    await imageRef
      .putFile(updatedImagePath, {contentType: 'image/jpg'})
      .catch(error => {
        console.log('error', error);
      });
    const url = await imageRef?.getDownloadURL().catch(error => {
    });
    return url;
  };

  const checkSubmitEnable = () => {
    if (
      productName &&
      imagePath &&
      description &&
      stock &&
      price &&
      igst &&
      hsnCode
    ) {
      return false;
    } else {
      return true;
    }
  };

  const addProduct = async () => {
    let imageUrl = await uploadImage();
    const userDetail = {
      imagePath: imagePath,
      productName: productName,
      description: description,
      stock: stock,
      price: price,
      igst: igst,
      hsnCode: hsnCode,
      imageUrl: imageUrl,
      id: Math.random(),
      newStock: 0,
    };
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Products')
      .doc('')
      .set(userDetail)
      .then(
        // @ts-ignore
        dispatch(addProductList(userDetail)),
        navigation.navigate('Products', {addStocks: false}),
      );
  };

  const updateProduct = async () => {
    console.log('update funtion is called');

    let uploadImageUrl = await UpdateUploadImage();
    console.log(uploadImageUrl, '--------- updateProduct --------');
    firebase
      .firestore()
      .collection('AllData')
      .doc(user?.uid)
      .collection('Products')
      .doc(`${detail?.id}`)
      .update({
        productName: productName,
        description: description,
        stock: stock,
        price: price,
        igst: igst,
        hsnCode: hsnCode,
        imageUrl: uploadImageUrl ? uploadImageUrl : imageUrl,
      })
      .then(() => {
        // dispatch(updateProductList({userDetail,detail}))
        navigation.navigate('ProductDetails', {otherParam: detail.id});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const data = useSelector((state: any) => state.products.productList);
  console.log('data inside the add product screen', data);

  return (
    <SafeAreaView style={styles.mainView}>
      <EventTopac
        bottom={50}
        topacTxt={strings.SUBMIT}
        fontStyle={styles.submitTxt}
        disable={checkSubmitEnable()}
        onPressEvent={() => {
          typeof detail == 'object' ? updateProduct() : addProduct();
        }}
      />
      <Back backwardString={strings.Back} />
      <Text style={styles.AddProduct}>{strings.Add_Product}</Text>
      <View style={styles.allDataView}>
        <Text style={styles.ProductDetail}>{strings.Product_Detail}</Text>
        <View style={styles.chooseFileView}>
          <Text style={styles.ChooseFile}>{strings.Choose_File}</Text>
          <TouchableOpacity
            style={imagePath ? null : styles.uploadImgTopac}
            onPress={() => setChooseImageSource(true)}>
            {updatedImagePath || imagePath || imageUrl ? (
              updatedImagePath ? (
                <Image
                  source={{uri: updatedImagePath}}
                  style={
                    imagePath ? styles.uploadedImage : styles.uploadImgLogo
                  }
                />
              ) : (
                <Image
                  source={{uri: detail?._data?.imageUrl ? imageUrl : imagePath}}
                  style={
                    imagePath ? styles.uploadedImage : styles.uploadImgLogo
                  }
                />
              )
            ) : (
              <Image source={ImagePath.upload} style={styles.uploadImgLogo} />
            )}
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={hp(350)}
          contentContainerStyle={styles.scrollView}
          enableOnAndroid={true}>
          <TextInputCom
            label={strings.Product_name}
            value={productName}
            onchangeText={(value: any) => {
              setProductName(value), checkSubmitEnable();
            }}
          />
          <TextInputCom
            label={strings.Description}
            value={description}
            onchangeText={(value: any) => {
              setDescription(value), checkSubmitEnable();
            }}
          />
          <TextInputCom
            label={strings.Stock}
            keyboardType={'number-pad'}
            value={stock}
            onchangeText={(value: any) => {
              setStock(value), checkSubmitEnable();
            }}
          />
          <TextInputCom
            label={strings.Price}
            keyboardType={'number-pad'}
            value={price}
            onchangeText={(value: any) => {
              setPrice(value), checkSubmitEnable();
            }}
          />
          <TextInputCom
            label={strings.IGST}
            value={igst}
            onchangeText={(value: any) => {
              setIgst(value), checkSubmitEnable();
            }}
          />
          <TextInputCom
            label={strings.HSN_Code}
            keyboardType={'number-pad'}
            value={hsnCode}
            onchangeText={(value: any) => {
              setHsnCode(value), checkSubmitEnable();
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <ReactNativeModal
        isVisible={chooseImageSource}
        onBackdropPress={() => {
          setChooseImageSource(false);
        }}
        style={styles.modalMain}>
        <View style={styles.modalMainView}>
          <View style={styles.modalVerticalMargin}>
            <TouchableOpacity
              onPress={() => {
                openCamera();
              }}>
              <Image source={ImagePath.camera} style={styles.modalImg} />
            </TouchableOpacity>
            <Text style={styles.modalTxt}>{strings.Camera}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                detail ? updatechooseFromGallary() : chooseFromGallary();
              }}>
              <Image source={ImagePath.gallary} style={styles.modalImg} />
            </TouchableOpacity>
            <Text style={styles.modalTxt}>{strings.Choose_From_Gallery}</Text>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  AddProduct: {
    fontSize: fontSize(50),
    marginTop: hp(50),
    marginLeft: wp(25),
    marginBottom: hp(25),
    fontWeight: '500',
    color: colors.black,
  },
  ProductDetail: {
    fontSize: fontSize(20),
    color: colors.black,
  },
  ChooseFile: {
    fontSize: fontSize(20),
    alignSelf: 'center',
    color: colors.black,
  },
  allDataView: {
    marginLeft: wp(30),
  },
  scrollView: {
    paddingBottom: hp(350),
  },
  submitTxt: {
    color: colors.white,
    fontWeight: '700',
    fontSize: fontSize(15),
  },
  chooseFileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(10),
  },
  uploadImgTopac: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: hp(90),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: wp(30),
  },
  uploadedImage: {
    resizeMode: 'contain',
    height: hp(90),
    width: wp(90),
    borderRadius: 10,
    marginRight: wp(30),
  },
  uploadImgLogo: {
    height: hp(40),
    width: wp(40),
    resizeMode: 'contain',
  },
  modalMain: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalMainView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  modalImg: {
    height: hp(50),
    width: wp(50),
    alignSelf: 'center',
    marginBottom: hp(10),
  },
  modalVerticalMargin: {
    marginVertical: hp(35),
  },
  modalTxt: {
    fontSize: fontSize(15),
    fontWeight: '500',
  },
  infoSuggestText: {
    color: colors.infoSuggestText,
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
  relative: {
    position: 'relative',
  },
  submitTopac: {
    height: hp(100),
    width: wp(100),
    borderRadius: 100,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProduct;
