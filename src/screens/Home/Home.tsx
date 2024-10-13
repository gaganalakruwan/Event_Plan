import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {CommonActions} from '../../redux/action/ApiAction';
import colors from 'constant/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fontFamily} from 'constant/fonts';
import ImageDescription from 'components/ImageDescription';
import {ImageDesc} from 'type';
import CustomIcon from 'components/CustomIcon';
import Users from 'components/Users';
import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import style from './style';
import ImageSlider from '@coder-shubh/react-native-image-slider';
import { getMessaging,subscribeToTopic } from '@react-native-firebase/messaging';

const Home = () => {
  const dispatch = useDispatch();

  const [allImages, setAllImages] = useState<Array<ImageDesc>>();
  const [sliderData, setSliderData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [post, setAllPost] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getAllImages();
    getAllUsers();
    getAllPosts();
    getFCMToken();
    subscribeToTopicToUsers();
  }, []);
  const getFCMToken=async()=> {
    const token = await getMessaging().getToken();
    console.log('FCM Token:', token);
    return token;
  }
  async function subscribeToTopicToUsers() {
    try {
      await subscribeToTopic(`There's an event happen in the city`,`Special Event`);
      console.log('Subscribed to topic!');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  }
  const getAllImages = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading Images'));
    dispatch(
      CommonActions.getImages({
        success: (res: any) => {
          // console.log('..........>>>>images', res);
          setAllImages(res);
          res?.slice(0, 10).forEach((item: ImageDesc) => {
            console.log(item.url);
            sliderData.push(item.thumbnailUrl);
          });
          dispatch(endLoading());
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('.......', error);
        },
      }),
    );
  };
  const getAllUsers = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading Users'));
    dispatch(
      CommonActions.getUsers({
        success: (res: any) => {
          // console.log('..........>>>>users', res);
          setAllUsers(res);
          dispatch(endLoading());
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('.......', error);
        },
      }),
    );
  };
  const getAllPosts = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading Posts'));
    dispatch(
      CommonActions.getPosts({
        success: (res: any) => {
          // console.log('..........>>>>users', res);
          setAllPost(res);
          dispatch(endLoading());
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('.......', error);
        },
      }),
    );
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const images = new Array(6).fill('https://via.placeholder.com/150/92c952');

  return (
    <SafeAreaView style={style.container}>
      <Header
        title={'Home'}
        isImage={false}
        onPress={() => openDrawer()}
        isMenu={true}
      />
      <ScrollView style={style.scrollContainer}>
        {/* {sliderData.length > 0 && (
          <ImageSlider
            images={sliderData}
            imageHeight={250}
            showNavigationButtons={false}
            showIndicatorDots={false}
            imageLabel={false}
            label="Example Label"
            extrapolate="clamp"
            autoSlideInterval={5000}
            containerStyle={{marginBottom: 20}}
            radius={5}
          />
        )} */}
        <View style={style.innerContainer}>
          <Text style={style.eventText}>Gagana's Wedding</Text>
          <Text style={style.addressText}>
            56 O'Mally Road, ST LEONARDS, 2065, NSW
          </Text>
          <Text style={style.organizeText}>Organizers</Text>
          <FlatList
            data={allUsers?.slice(0, 3)}
            renderItem={({item, index}) => (
              <Users
                uri={'https://via.placeholder.com/600/771796'}
                title={item.name}
                description={item.email}
              />
            )}
          />
          <View style={style.imageHeaderContainer}>
            <Text style={style.image}>Photos</Text>
            <View style={style.iconView}>
              <Text style={style.allPhotoText}>All Photos</Text>
              <CustomIcon
                type={'Feather'}
                icon={'arrow-right'}
                color={colors.buttonRed}
                size={20}
              />
            </View>
          </View>
          <FlatList
            data={allImages?.slice(0, 10)}
            horizontal
            renderItem={({item, index}) => (
              <ImageDescription
                imageUri={item.url}
                title={`Event ${index}`}
                description={item.title}
              />
            )}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Post' as never)}
          style={style.postContainer}>
          <Text style={style.postCount}>{post?.length}</Text>
          <Text style={style.postText}>Posts</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
