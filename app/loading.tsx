import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
export default (props) => {
	const [textInput1, onChangeTextInput1] = useState('');
	const [textInput2, onChangeTextInput2] = useState('');
	const [textInput3, onChangeTextInput3] = useState('');
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.view}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/sx0yq9ay_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<View style={styles.view2}>
					<Text style={styles.text}>
						{"로그인"}
					</Text>
				</View>
				<View style={styles.view3}>
					<TextInput
						placeholder={"rawrkkzzzdaa@gmail.com"}
						value={textInput1}
						onChangeText={onChangeTextInput1}
						style={styles.input}
					/>
				</View>
				<View style={styles.view4}>
					<TextInput
						placeholder={"*************"}
						value={textInput2}
						onChangeText={onChangeTextInput2}
						style={styles.input2}
					/>
				</View>
				<View style={styles.view5}>
					<Text style={styles.text2}>
						{"비밀번호를 잊어버리셨나요?"}
					</Text>
				</View>
				<View style={styles.view6}>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text3}>
							{"로그인"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.view7}>
					<View style={styles.row}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/rmaltmip_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<TextInput
							placeholder={"구글로 로그인하기"}
							value={textInput3}
							onChangeText={onChangeTextInput3}
							style={styles.input3}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	button: {
		backgroundColor: "#C30E23",
		borderRadius: 16,
		paddingVertical: 7,
		paddingHorizontal: 121,
	},
	image: {
		width: 195,
		height: 194,
	},
	image2: {
		width: 18,
		height: 18,
		marginRight: 67,
	},
	input: {
		color: "#F3F3F3",
		fontSize: 12,
		backgroundColor: "#18181B",
		borderRadius: 16,
		paddingVertical: 7,
		paddingHorizontal: 17,
	},
	input2: {
		color: "#F3F3F3",
		fontSize: 12,
		fontWeight: "bold",
		backgroundColor: "#18181B",
		borderRadius: 16,
		paddingVertical: 10,
		paddingHorizontal: 17,
	},
	input3: {
		color: "#121214",
		fontSize: 12,
		fontWeight: "bold",
		width: 87,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFFB0",
		borderRadius: 16,
		paddingVertical: 7,
		paddingHorizontal: 13,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#121214",
	},
	text: {
		color: "#8B8B91",
		fontSize: 16,
		fontWeight: "bold",
	},
	text2: {
		color: "#6B1821",
		fontSize: 10,
		fontWeight: "bold",
		marginRight: 57,
	},
	text3: {
		color: "#121214",
		fontSize: 16,
		fontWeight: "bold",
	},
	view: {
		alignItems: "center",
		marginTop: 113,
		marginBottom: 62,
	},
	view2: {
		alignItems: "center",
		marginBottom: 26,
	},
	view3: {
		alignItems: "center",
		marginBottom: 12,
	},
	view4: {
		alignItems: "center",
		marginBottom: 5,
	},
	view5: {
		alignItems: "flex-end",
		marginBottom: 38,
	},
	view6: {
		alignItems: "center",
		marginBottom: 45,
	},
	view7: {
		alignItems: "center",
		marginBottom: 169,
	},
});