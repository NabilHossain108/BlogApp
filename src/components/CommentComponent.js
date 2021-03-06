import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
} from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";



const CommentComponent = (props) => {

    return (


        <Card>
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Avatar
                    containerStyle={{ backgroundColor: "#00ced1" }}
                    rounded
                    icon={{ name: "user", type: "font-awesome", color: "black" }}
                    activeOpacity={1}
                />

                <Text h4Style={{ paddingHorizontal: 10 }} h4>
                    {props.name}
                </Text>
                <Text style={{ fontStyle: 'italic', fontSize: 10, textAlign: 'right' }}>
                    {props.time}
                </Text>
                </View>
                

                <Text style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Text>{props.comment}</Text>
                </Text>
        </Card>


    )


}

export default CommentComponent;