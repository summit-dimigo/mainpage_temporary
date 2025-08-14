import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const route = useRouter();

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text>edit app/(tabs)/profile.tsx</Text>
            <TouchableOpacity
                onPress={() => route.push("../login")}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#007BFF",
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: "#FFFFFF" }}>Go to Login Page</Text>
            </TouchableOpacity>
        </View>
    )
}