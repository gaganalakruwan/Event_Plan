import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {CommonActions} from '../../redux/action/ApiAction';
import Header from 'components/Header';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from 'components/CustomIcon';
import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import Modal from 'react-native-modal';
import PostData from 'components/Post';
import {comments, postData} from 'type';
import CommentBox from 'components/CommentBox';
import style from './style';

const Post = () => {
  const [post, setAllPost] = useState<Array<postData>>([]);
  const [comments, setComments] = useState<Array<comments>>([]);
  const [filterComments, setFilterComments] = useState<Array<comments>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getAllPosts();
    getAllComments();
  }, []);

  /**
   * Get all post from api
   */

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

  /**
   * Get all comments from api
   */

  const getAllComments = () => {
    dispatch(startLoading());
    dispatch(setMessage('Loading Posts'));
    dispatch(
      CommonActions.getComments({
        success: (res: any) => {
          // console.log('..........>>>>users', res);
          setComments(res);
          dispatch(endLoading());
        },
        failed: (error: any) => {
          dispatch(endLoading());
          console.log('.......', error);
        },
      }),
    );
  };

  /**
   * Here we filter comments according to select post and set to filterComment variable
   * @param postId 
   */

  const filterCommsnts = (postId: number) => {
    let filterData = comments.filter((a: comments) => a.postId == postId);
    if (filterData.length > 0) {
      setFilterComments(filterData);
    } else {
      setFilterComments([]);
    }
  };

  const bottomSheet = () => {
    return (
      <Modal
        style={style.modal}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationInTiming={500}
        animationOutTiming={500}>
        <View style={style.container}>
          <View style={style.closeContainer}>
            <Text style={style.commentText}>Comments</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CustomIcon
                icon={'close'}
                type={'AntDesign'}
                color="black"
                size={30}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filterComments}
            renderItem={({item, index}) => {
              return <CommentBox email={item.email} body={item.body} />;
            }}
          />
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      {modalVisible && bottomSheet()}
      <Header
        title={'Post'}
        isImage={false}
        onPress={() => navigation.goBack()}
      />
      <View style={style.listContainer}>
        <FlatList
          data={post}
          renderItem={({item, index}) => {
            return (
              <PostData
                header={item.title}
                description={item.body}
                onPress={() => {
                  filterCommsnts(item.id);
                  setModalVisible(true);
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Post;
