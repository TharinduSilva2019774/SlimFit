import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ProfileSection = ({ title, content }) => (
  <View style={styles.profileSection}>
    <Text style={styles.profileSectionTitle}>{title}</Text>
    <Text style={styles.profileSectionContent}>{content}</Text>
  </View>
);

const SignOutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.signOutButton}>
    <Text style={styles.signOutButtonText}>Sign Out</Text>
  </TouchableOpacity>
);

const ImageComponent = () => {
  return (
    <Image
      style={styles.profilePic}
      source={{
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5477f69dd575c8582d22a483b473d1515a595d31d7af187441e49eeb8b24fcf4?apiKey=748f91a40ab04acf923d77b5c15f23f6&",
      }}
      resizeMode="cover"
    />
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <View style={styles.profileImageWrapper}>
            <ImageComponent />
          </View>
          <Text style={styles.userName}>Sarah Wegan</Text>
        </View>
        <View style={styles.divider} />
        <ProfileSection title="Joined" content="2 months ago" />
      </View>

      <View style={{ paddingTop: "20%", paddingBottom: "20%" }}>
        <View style={styles.divider} />
        <View style={styles.editAndSettings}>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity> */}
        </View>
        <View style={styles.divider} />
      </View>

      <SignOutButton onPress={() => console.log("Sign Out Pressed")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: "#1C1C1E",
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#1C1C1E",
    height: "10%",
    marginTop: 40,
    marginBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#2D3748",
    marginVertical: 12,
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
  },
  profileSection: {
    justifyContent: "space-between",
    marginVertical: 8,
  },
  profileSectionTitle: {
    color: "#A0AEC0",
    fontSize: 16,
  },
  profileSectionContent: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 16,
  },
  editAndSettings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editProfileButton: {
    // Style for Edit Profile button
  },
  editProfileText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  settingsButton: {
    // Styles for Settings button
  },
  settingsText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: "#E53E3E",
    padding: 10,
    borderRadius: 5,
    marginTop: 24,
  },
  signOutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SettingsScreen;
