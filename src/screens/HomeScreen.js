import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, ActivityIndicator,SafeAreaView} from "react-native";
import {Card,Button,Text,Avatar,Input,Header} from "react-native-elements";
import { AntDesign,FontAwesome, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostComponent from "../components/PostComponent"
import { getDataJSON, storeDataJSON, addDataJSON, } from '../functions/AsyncStorageFunctions';
import { useNetInfo } from "@react-native-community/netinfo";
import moment from 'moment';
import {LogBox} from 'react-native';

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');


  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON('Posts');
    setPosts(allpost);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    //LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  return (

    <AuthContext.Consumer>
      {(auth) => (


        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setisLoggedIn(false);
                auth.setCurrentuser({});
              },
            }}
          />

<SafeAreaView>


            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<FontAwesome name="pencil-square-o" size={24} color="black" />}
                onChangeText={function (currentInput) {
                  setPost(currentInput);
                }}
              />
              <Button
                title="Post"
                type="outline"
                onPress={function () {
                  let newpost = {
                    user: auth.Currentuser,
                    time: moment().format('YYYY-MM-DD hh:mm a'),
                    postid:
                      auth.Currentuser.email +
                      moment().format('YYYY-MM-DD hh:mm:ss a'),
                    body: post,
                  };
                  if (posts == undefined) {
                    setPosts([newpost]);
                    storeDataJSON('Posts', [newpost]);
                  } else {
                    setPosts([...posts, newpost]);
                    addDataJSON('Posts', newpost);
                  }
                  //this.Input.clear()
                  setPost('');
                }}
                
              />
              <ActivityIndicator
              size={'large'}
              color={'blue'}
              animating={loading}
            />

            </Card>


            <FlatList
            
              data={posts}
              inverted={true}
              keyExtractor={(item) => item.postid}
              renderItem={({ item }) => {
                return (
                  <PostComponent
                    author={item.user.name}
                    title={item.time}
                    body={item.body}
                    navigation={props.navigation}
                    post={item}
                  />
                );
              }}
            />

</SafeAreaView>

        </View>

      )}
    </AuthContext.Consumer>
  );

};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    backgroundColor:"#DCDDDF",
  },
}
);

export default HomeScreen;