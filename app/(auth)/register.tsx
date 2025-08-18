import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
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

interface RegisterProps {}

const Register: React.FC<RegisterProps> = (props) => {
  const { register } = useAuth();
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const nameRef = useRef("")
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("오류", "비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    
    // 30초 타임아웃 설정
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      Alert.alert("오류", "요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.");
    }, 30000);

    try {
      console.log('Attempting to register with:', { name, email });
      const response = await register(email, password, name);
      clearTimeout(timeoutId); // 성공 시 타임아웃 클리어
      
      if (response?.success) {
        Alert.alert("성공", "회원가입이 완료되었습니다!", [
          { text: "확인", onPress: () => route.push("./login") }
        ]);
      } else {
        Alert.alert("오류", response?.msg || "회원가입에 실패했습니다.");
      }
    } catch (error: any) {
      clearTimeout(timeoutId); // 에러 시 타임아웃 클리어
      console.error('Registration catch error:', error);
      Alert.alert("오류", "회원가입 중 문제가 발생했습니다.");
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
          <Text style={styles.text}>회원가입</Text>
        </View>

        <View style={styles.view3}>
          <TextInput
            placeholder="이름"
            placeholderTextColor="#8B8B91"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="none"
          />
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
            placeholder="비밀번호 (최소 6자리)"
            placeholderTextColor="#8B8B91"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.view5}>
          <TouchableOpacity onPress={() => route.push("./login")}>
            <Text style={styles.text2}>이미 계정이 있으신가요? 로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view6}>
          <TouchableOpacity 
            style={[styles.button, { opacity: isLoading ? 0.6 : 1 }]} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.text3}>{isLoading ? "가입 중..." : "회원가입"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view7}>
          <TouchableOpacity style={styles.row} disabled={isLoading}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/ysly0qmd_expires_30_days.png" }} 
              resizeMode="stretch"
              style={styles.image2}
            />
            <Text style={styles.googleText}>구글로 가입하기</Text>
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

export default Register;