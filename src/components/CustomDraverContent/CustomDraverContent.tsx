import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Avatar, Drawer, Title} from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import deviceInfoModule from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {ReduxState} from 'type';
import firestore from '@react-native-firebase/firestore';
import {auth} from 'utils/firebase';
import colors from 'constant/colors';
import CustomIcon from 'components/CustomIcon';
import style from './style';

const CustomDraverContent = (props: any) => {
  const navigation = useNavigation();
  const [profileUrl, setProfileUrl] = useState('');
  const [profileName, setProfileName] = useState('');
  const [email, setEmail] = useState('');
  const {authData} = useSelector((state: ReduxState) => state.auth);

  useEffect(() => {
    getProfileData();
  }, [navigation]);

  const getProfileData = async () => {
    const userProfile = await firestore()
      .collection('users')
      .doc(authData.userId)
      .get();

    if (userProfile.exists) {
      const data = userProfile.data();
      if (data) {
        setProfileUrl(data.profileImageUrl);
        setProfileName(data.firstName + ' ' + data.lastName);
        setEmail(data?.email);
      }
      console.log('User profile data:', data);
      return data; // Return the user profile data for further use
    } else {
      console.log('User profile not found');
    }
  };

  const logoutFunc = async () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          await auth().signOut();
          navigation.navigate('LOGIN' as never);
        },
      },
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}} accessible={false}>
      <DrawerContentScrollView
        {...props}
        accessible={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{padding: 0, margin: 0}} accessible={false}>
          <TouchableOpacity
            style={style.assetContainer}
            onPress={() => navigation.navigate('Profile' as never)}>
            {profileUrl ? (
              <Avatar.Image
                source={{uri: profileUrl}}
                style={{backgroundColor: 'white'}}
                size={70}
              />
            ) : (
              <View style={style.imageContainer}>
                <CustomIcon
                  icon={'face-man-profile'}
                  type={'MaterialCommunityIcons'}
                  color={colors.buttonRed}
                  size={35}
                />
              </View>
            )}
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Title style={style.title} numberOfLines={2}>
                {profileName}
              </Title>
              <Text>{email}</Text>
            </View>
          </TouchableOpacity>

          <Drawer.Section style={{marginTop: 10}} showDivider={false}>
            <DrawerItem
              style={{height: 50, paddingLeft: 0}}
              icon={({color, size}) => (
                <CustomIcon
                  icon={'logout'}
                  type={'MaterialIcons'}
                  color={colors.black}
                  size={35}
                />
              )}
              label="Logout"
              labelStyle={{
                color: 'black',
                fontSize: 14,
                // fontFamily: comStyle.FONT_FAMILY.MEDIUM,
              }}
              onPress={() => logoutFunc()}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View style={style.versionView}>
        <Text style={style.versionText}>
          Version: {deviceInfoModule.getVersion()}
        </Text>
      </View>
    </View>
  );
};

export default CustomDraverContent;
