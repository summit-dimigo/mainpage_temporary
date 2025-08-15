import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function Order() {
  const [textInput1, onChangeTextInput1] = useState('');
	return (
		<SafeAreaView style={styles.container}>
            
			<ScrollView  style={styles.scrollView}>
                <View style={styles.search}>
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
				<View style={styles.column}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/psax75km_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/2in03hpn_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
                            
				</View>
				<Text style={styles.text}>
					{"(주)삼성전자"}
				</Text>
				<View style={styles.row2}>
					<Text style={styles.text2}>
						{"156,900"}
					</Text>
					<Text style={styles.text3}>
						{"1,900"}
					</Text>
					<Text style={styles.text4}>
						{"+(1.27%)"}
					</Text>
				</View>
				<View style={styles.column2}>
					<Text style={styles.text5}>
						{"4주"}
					</Text>
					<View style={styles.row3}>
						<View style={styles.view}>
							<View >
								<Text style={styles.text6}>
									{"627,600"}
								</Text>
								<Text style={styles.text7}>
									{"+13,900(2.27%)"}
								</Text>
							</View>
						</View>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/s7gxx6kx_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image5}
						/>
					</View>
				</View>
				<View style={styles.column3}>
					<Text style={styles.text8}>
						{"주식 추이"}
					</Text>
					<View style={styles.column4}>
						<View style={styles.view2}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/uhot56wc_expires_30_days.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
						</View>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/q7mlquv2_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image7}
						/>
					</View>
					<View style={styles.row4}>
						<View style={styles.column5}>
							<View style={styles.view3}>
								<Text style={styles.text9}>
									{"1일"}
								</Text>
							</View>
							<View style={styles.absoluteBox}>
							</View>
						</View>
						<Text style={styles.text10}>
							{"1주"}
						</Text>
						<Text style={styles.text11}>
							{"3달"}
						</Text>
						<Text style={styles.text12}>
							{"1년"}
						</Text>
						<Text style={styles.text10}>
							{"5년"}
						</Text>
						<Text style={styles.text13}>
							{"전체"}
						</Text>
					</View>
				</View>
				<View style={styles.row5}>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text6}>
							{"구매하기"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text6}>
							{"판매하기"}
						</Text>
					</TouchableOpacity>
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
	absoluteBox: {
		position: "absolute",
		top: 0,
		left: -17,
		width: 313,
		height: 23,
		backgroundColor: "#121214",
		borderRadius: 7,
	},
	box: {
		flex: 1,
	},
	button: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#C30E23",
		borderRadius: 16,
		paddingVertical: 13,
		marginRight: 7,
	},
	button2: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#656569",
		borderRadius: 16,
		paddingVertical: 13,
	},
	column: {
		alignItems: "center",
		backgroundColor: "#212124",
		borderRadius: 36,
		paddingVertical: 11,
		paddingLeft: 314,
		marginBottom: 24,
		marginHorizontal: 25,
	},
	column2: {
		backgroundColor: "#212124",
		borderRadius: 24,
		paddingVertical: 15,
		marginBottom: 17,
		marginHorizontal: 20,
	},
	column3: {
		backgroundColor: "#212124",
		borderRadius: 24,
		paddingVertical: 18,
		marginBottom: 28,
		marginHorizontal: 20,
	},
	column4: {
		marginBottom: 16,
		marginHorizontal: 31,
	},
	column5: {
		alignItems: "center",
		marginRight: 23,
	},
	column6: {
		alignItems: "center",
	},
	image: {
		width: 63,
		height: 63,
		marginRight: 263,
	},
	image2: {
		width: 32,
		height: 32,
	},
	image3: {
		width: 12,
		height: 12,
	},
	image4: {
		width: 4,
		height: 5,
	},
	image5: {
		width: 1,
		height: 1,
		marginTop: 5,
	},
	image6: {
		width: 8,
		height: 8,
	},
	image7: {
		height: 172,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 49,
		marginBottom: 12,
		marginLeft: 10,
	},
	row2: {
		flexDirection: "row",
		marginBottom: 14,
		marginLeft: 31,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 22,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 39,
	},
	row5: {
		flexDirection: "row",
		marginBottom: 19,
		marginHorizontal: 30,
	},
	row6: {
		flexDirection: "row",
		backgroundColor: "#121214",
		borderRadius: 16,
		paddingTop: 13,
		paddingBottom: 25,
		paddingHorizontal: 24,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#18181B",
	},
	text: {
		color: "#F3F3F3",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 14,
		marginLeft: 31,
	},
	text2: {
		color: "#D21F34",
		fontSize: 32,
		fontWeight: "bold",
		marginRight: 12,
	},
	text3: {
		color: "#D21F34",
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 3,
		marginLeft: 15,
		marginRight: 9,
	},
	text4: {
		color: "#D21F34",
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 3,
	},
	text5: {
		color: "#656569",
		marginBottom: 5,
		marginLeft: 20,
	},
	text6: {
		color: "#F3F3F3",
		fontSize: 16,
		fontWeight: "bold",
	},
	text7: {
		color: "#D21F34",
		fontSize: 12,
		fontWeight: "bold",
	},
	text8: {
		color: "#F3F3F3",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 27,
		marginLeft: 22,
	},
	text9: {
		color: "#18181B",
		fontSize: 10,
		fontWeight: "bold",
	},
	text10: {
		color: "#656569",
		fontSize: 10,
		fontWeight: "bold",
		marginRight: 36,
	},
	text11: {
		color: "#656569",
		fontSize: 10,
		fontWeight: "bold",
		marginRight: 35,
	},
	text12: {
		color: "#656569",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
		flex: 1,
	},
	text13: {
		color: "#656569",
		fontSize: 10,
		fontWeight: "bold",
	},
	text14: {
		color: "#444446",
		fontSize: 10,
		fontWeight: "bold",
	},
	text15: {
		color: "#F3F3F3",
		fontSize: 10,
		fontWeight: "bold",
	},
	view: {
		alignItems: "center",
	},
	view2: {
		alignItems: "flex-end",
	},
	view3: {
		backgroundColor: "#8B8B91",
		borderRadius: 5,
		paddingBottom: 1,
		paddingHorizontal: 6,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
		    width: 0,
		    height: 3
		},
		shadowRadius: 5,
		elevation: 5,
	},
    
	view4: {
		alignItems: "center",
		marginRight: 30,
	},
	view5: {
		alignItems: "center",
		marginRight: 31,
	},
	view6: {
		alignItems: "center",
		marginRight: 29,
	},
    search: {
    alignItems: "center",
    marginBottom: 16,
  },
});