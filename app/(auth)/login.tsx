import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
    const { login } = useAuth();
    const route = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
      if (!email || !password) {
        Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await login(email, password);
        if (response?.success) {
          Alert.alert("성공", "로그인되었습니다!", [
            { text: "확인", onPress: () => route.back() }
          ]);
        } else {
          Alert.alert("오류", response?.msg || "로그인에 실패했습니다.");
          route.push("./register");
        }
      } catch (error) {
        Alert.alert("오류", "로그인 중 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

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
            placeholder="이메일"
            placeholderTextColor="#8B8B91"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.view4}>
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#8B8B91"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.view5}>
          <TouchableOpacity onPress={() => route.push("../(tabs)")}>
            <Text style={styles.text2}>계정이 없으신가요? 회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view6}>
          <TouchableOpacity 
            style={[styles.button, { opacity: isLoading ? 0.6 : 1 }]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.text3}>{isLoading ? "로그인 중..." : "로그인"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view7}>
          <TouchableOpacity style={styles.row} disabled={isLoading}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/ysly0qmd_expires_30_days.png" }} 
              resizeMode="stretch"
              style={styles.image2}
            />
            <Text style={styles.googleText}>구글로 로그인하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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