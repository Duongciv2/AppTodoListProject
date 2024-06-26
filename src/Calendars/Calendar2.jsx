import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Utils/Colors';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ModalPortal } from 'react-native-modals';
import { BottomModal } from 'react-native-modals';
import { ModalTitle, ModalContent } from 'react-native-modals';
import { SlideAnimation } from 'react-native-modals';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL, DEFAULT_USER_ID } from '../Services/config';

const index = ({ selectedDate }) => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('All');
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const today = moment().format('MMM Do');

  const formattedDate = selectedDate.format('YYYY-MM-DD');

  const suggestions = [
    { id: '0', todo: 'Water' },
    { id: '1', todo: 'Go Exercising' },
    { id: '2', todo: 'Go to bed' },
    { id: '3', todo: 'Take medicine' },
    { id: '4', todo: 'Go Shopping' },
    { id: '5', todo: formattedDate },
  ];

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
        dueDate: selectedDate.format('YYYY-MM-DD'),
      };

      axios
        .post(`${API_BASE_URL}/todos/${DEFAULT_USER_ID}/${formattedDate}`, todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log('error', error);
        });

      await getUserTodos();
      setModalVisible(false);
      setTodo('');
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisible, formattedDate]);

  const getUserTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${DEFAULT_USER_ID}/todos/${formattedDate}`);
      console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter((todo) => todo.status !== 'completed');
      const completed = fetchedTodos.filter((todo) => todo.status === 'completed');

      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log('error', error);
    }
  };

  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`${API_BASE_URL}/todos/${todoId}/complete/${formattedDate}`);
      console.log(response.data);

      await getUserTodos();
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('completed', completedTodos);
  console.log('pending', pendingTodos);

  const yourPicture = require('./../../assets/start.png');

  return (
    
    <>
{/* Test*/}


{/* // */}
      <View style={styles.pressableList}>
        <Pressable style={styles.pressable}>
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={{ color: "white", textAlign: "center" }}>Person</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 15,
          maxHeight: "60%",
        }}
      >
        <ScrollView>
          <View style={{ padding: 10 }}>
            {todos?.length > 0 ? (
              //Test
              <View>
                {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}

                {pendingTodos?.map((item, index) => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("HomeScreen", {
                        id: item._id,
                        title: item?.title,
                        category: item?.category,
                        createdAt: item?.createdAt,
                        dueDate: item?.dueDate,
                      });
                    }}
                    style={{
                      backgroundColor: "#E0E0E0",
                      padding: 10,
                      borderRadius: 7,
                      marginVertical: 10,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Entypo
                        onPress={() => markTodoAsCompleted(item?._id)}
                        name="circle"
                        size={18}
                        color="black"
                      />
                      <Text style={{ flex: 1 }}>{item?.title}</Text>
                      <Feather name="flag" size={20} color="black" />
                    </View>
                  </Pressable>
                ))}
                {/* Completed Task */}
                {completedTodos?.length > 0 && (
                  <View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                      }}
                    >
                      {/* <Image
                      style={{ width: 100, height: 100, backgroundColor: 'white' }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png"
                      }}
                    /> */}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginVertical: 10,
                      }}
                    >
                      <Text>Completed Tasks</Text>
                      <MaterialIcons
                        name="arrow-drop-down"
                        size={24}
                        color="black"
                      />
                    </View>

                    {completedTodos?.map((item, index) => (
                      <Pressable
                        style={{
                          backgroundColor: "#E0E0E0",
                          padding: 10,
                          borderRadius: 7,
                          marginVertical: 10,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <FontAwesome name="circle" size={18} color="gray" />
                          <Text
                            style={{
                              flex: 1,
                              textDecorationLine: "line-through",
                              color: "gray",
                            }}
                          >
                            {item?.title}
                          </Text>
                          <Feather name="flag" size={20} color="gray" />
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              //Test

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 200, height: 200, resizeMode: "contain" }}
                  source={yourPicture}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    fontWeight: 900,
                    textAlign: "center",
                  }}
                >
                  Chả có gì
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Chỉnh sửa */}

        {/* Chỉnh sửa */}
      </View>

      <View style={styles.footer}>
          <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
            <View style={styles.btn}>
              <Ionicons name="add" size={30} color={Colors.WHITE} />
            </View>
          </TouchableOpacity>
        </View>
      {/* </ScrollView> */}

      <ModalPortal />
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={300}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              style={styles.placeholder}
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              placeholderTextColor="gray"
            />
            <AntDesign
              onPress={addTodo}
              name="checksquare"
              size={24}
              color={Colors.PRIMARY}
            />
          </View>
          <Text>Choose</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={styles.pressAddTodo}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setCategory("Person")}
              }
              style={styles.pressAddTodo}
            >
              <Text>Person</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WishList")}
              style={styles.pressAddTodo}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>

          <Text>Some Suggest</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={styles.pressAddTodo}
              >
                <Text>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};
export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "auto",
    flexDirection: "column",
    borderRadius: 30,

    backgroundColor: "white",
  },
  pressableList: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pressable: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "screen",
    maxHeight:50,
    flex: 1,
    marginBottom: 10,
    
    alignItems: "center",
    justifyContent: "flex-end",
  },
  /** Button */
  btn: {
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,

    backgroundColor: Colors.PRIMARY,
  },
  placeholder: {
    padding: 10,
    textAlignVertical: "center",
    backgroundColor: Colors.LIGHTPRIMARY,

    borderRadius: 5,
    flex: 1,
  },
  pressAddTodo: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
  },
});
