import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity, ScrollView } from "react-native";
import { getToken } from "../../assets/AsyncStorage";

const Message = ({ message, isUser }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {!isUser && <Text style={styles.senderName}>{message.sender}</Text>}
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const CommunityScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessageData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(async () => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await getToken();
    const response = await fetch("http://10.0.2.2:8080/api/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setCurrentUserName(json.firstName);
  };
  const fetchMessageData = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://10.0.2.2:8080/api/v1/message", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setMessages([]);
      json.map((item, index) => {
        const newMessage = { sender: item.username, text: item.message };
        addMessage(newMessage);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() !== "") {
      const newMessage = { sender: currentUserName, text: inputText };
      setMessages([...messages, newMessage]);
      setInputText("");

      const token = await getToken();
      fetch("http://10.0.2.2:8080/api/v1/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: inputText,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftItem}>
          <Text style={styles.backTxt}>back</Text>
        </View>
        <View>
          <Text style={styles.titleTxt}>Community</Text>
        </View>
        <View style={styles.leftItem}>
          <Text style={{ color: "#1C1C1E" }}>blank</Text>
        </View>
      </View>
      <ScrollView style={styles.messageList}>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            isUser={message.sender === currentUserName}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },

  // Header styles
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#1C1C1E",
    height: "10%",
  },
  leftItem: {
    marginRight: "auto",
  },
  titleTxt: {
    paddingTop: 20,
    color: "white",
    fontSize: 30,
  },
  backTxt: {
    paddingTop: 20,
    color: "white",
    fontSize: 16,
  },

  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CommunityScreen;
