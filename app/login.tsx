import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
// TypeScript 타입 정의 추가
interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
    const route = useRouter();
  const [textInput1, onChangeTextInput1] = useState('');
  const [textInput2, onChangeTextInput2] = useState('');
  const [textInput3, onChangeTextInput3] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/rgbcw9v3_expires_30_days.png" }} 
            resizeMode="stretch"
            style={styles.image}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.text}>로그인</Text>
        </View>

        <View style={styles.view3}>
          <TextInput
            placeholder="이메일 혹은 전화번호"
            placeholderTextColor="#8B8B91"
            value={textInput1}
            onChangeText={onChangeTextInput1}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.view4}>
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#8B8B91"
            value={textInput2}
            onChangeText={onChangeTextInput2}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.view5}>
          <TouchableOpacity>
            <Text style={styles.text2}>비밀번호를 잊어버리셨나요?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view6}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => console.log('로그인 버튼 클릭!')}
          >
            <Text style={styles.text3}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view7}>
          <TouchableOpacity style={styles.row}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/ysly0qmd_expires_30_days.png" }} 
              resizeMode="stretch"
              style={styles.image2}
            />
            <Text style={styles.googleText}>구글로 로그인하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
                onPress={() => route.push("./(tabs)")}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#007BFF",
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: "#FFFFFF" }}>Edit Profile</Text>
            </TouchableOpacity>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
  },
  button: {
    backgroundColor: "#6B1821",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 195,
    height: 194,
  },
  image2: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 14,
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 17,
    width: '80%',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '80%',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#121214",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  text2: {
    color: "#6B1821",
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: 'underline',
  },
  text3: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleText: {
    color: "#121214",
    fontSize: 14,
    fontWeight: "bold",
  },
  view: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  view2: {
    alignItems: "center",
    marginBottom: 30,
  },
  view3: {
    alignItems: "center",
    marginBottom: 16,
  },
  view4: {
    alignItems: "center",
    marginBottom: 12,
  },
  view5: {
    alignItems: "flex-end",
    marginBottom: 30,
    paddingHorizontal: '10%',
  },
  view6: {
    alignItems: "center",
    marginBottom: 30,
  },
  view7: {
    alignItems: "center",
    marginBottom: 50,
  },
});

export default Login;