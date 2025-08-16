import { useAuth } from "@/contexts/authContext";
import React, { useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Pf() {
    const { user, logout, isLoading, refreshUserData } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView} refreshControl={
                  <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refreshUserData}
                        tintColor="#FFFFFF" // iOS에서 새로고침 인디케이터 색상
                        colors={["#FFFFFF"]} // Android에서 새로고침 인디케이터 색상
                    />
                }>
				<View style={styles.row}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/wrjtel2q_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
					<View >
						<Text style={styles.text}>
							{user?.name ? user.name : "이름 없음"}
						</Text>
						<Text style={styles.text2}>
							{user?.profile ? "Lv. "+user.profile.level : "정보 없음"}
						</Text>
					</View>
					<View style={styles.box}>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/58t9wa6n_expires_30_days.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
				</View>
				<View style={styles.column}>
					<Text style={styles.text3}>
						{"내 자산"}
					</Text>
					<Text style={styles.text4}>
						{user?.profile ? user.profile.totalAssets.toLocaleString() : "정보 없음"}
					</Text>
                    <Text
                        style={[
                            styles.text5,
                            user?.profile?.winRate !== undefined && user.profile.winRate > 0
                                ? { color: "#D22034" }
                                : user?.profile?.winRate !== undefined && user.profile.winRate < 0
                                ? { color: "#333AEC" }
                                : { color: "#8B8B91" }
                        ]}
                    >
						{user?.profile ? user.profile.winRate.toLocaleString() + "%" : "정보 없음"}
					</Text>
				</View>
				<View style={styles.column2}>
					<View style={styles.row2}>
						<View style={styles.column3}>
							<Text style={styles.text6}>
								{"Lv.4"}
							</Text>
							<Text style={styles.text7}>
								{"고등어"}
							</Text>
						</View>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/nwljtit8_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<View style={styles.view}>
							<View style={styles.column4}>
								<Image
									source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/idg305e7_expires_30_days.png"}} 
									resizeMode = {"stretch"}
									style={styles.image4}
								/>
								<Image
									source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/4y4gxloq_expires_30_days.png"}} 
									resizeMode = {"stretch"}
									style={styles.image5}
								/>
							</View>
						</View>
					</View>
					<View style={styles.row3}>
						<Text style={styles.text8}>
							{"옷 사기"}
						</Text>
						<Text style={styles.text8}>
							{"밥 주기"}
						</Text>
						<Text style={styles.text8}>
							{"물 주기"}
						</Text>
					</View>
				</View>
				<View style={styles.column5}>
					<Text style={styles.text9}>
						{"MY"}
					</Text>
					<View style={styles.row4}>
						<Text style={styles.text10}>
							{"포트폴리오"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/2gc5mwuz_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
					</View>
					<View style={styles.row4}>
						<Text style={styles.text10}>
							{"캘린더"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/rhv50m1o_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
					</View>
					<View style={styles.row4}>
						<Text style={styles.text10}>
							{"알림 설정"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/hfsjezvt_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
					</View>
					<View style={styles.row4}>
						<Text style={styles.text10}>
							{"친구 초대"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/462mfw3r_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"언어"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Y9AZXDZn3/oei4abfw_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
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
	box: {
		flex: 1,
		alignSelf: "stretch",
	},
	column: {
		backgroundColor: "#212124",
		borderRadius: 20,
		paddingVertical: 23,
		marginBottom: 12,
		marginHorizontal: 20,
	},
	column2: {
		backgroundColor: "#212124",
		borderRadius: 20,
		paddingVertical: 18,
		marginBottom: 12,
		marginHorizontal: 20,
	},
	column3: {
		marginRight: 20,
	},
	column4: {
		alignItems: "center",
	},
	column5: {
		backgroundColor: "#212124",
		borderRadius: 20,
		paddingVertical: 24,
		marginBottom: 25,
		marginHorizontal: 20,
	},
	column6: {
		flex: 1,
		alignItems: "center",
		marginRight: 12,
	},
	column7: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		width: 48,
		height: 48,
		marginRight: 18,
	},
	image2: {
		width: 1,
		height: 1,
	},
	image3: {
		width: 1,
		height: 1,
		marginTop: 37,
		marginRight: 132,
	},
	image4: {
		width: 72,
		height: 65,
	},
	image5: {
		width: 67,
		height: 7,
	},
	image6: {
		height: 32,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 85,
		marginBottom: 24,
		marginHorizontal: 27,
	},
	row2: {
		flexDirection: "row",
		marginBottom: 13,
		marginLeft: 23,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 46,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		marginHorizontal: 23,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 23,
	},
	row6: {
		flexDirection: "row",
		backgroundColor: "#121214",
		borderRadius: 16,
		paddingTop: 13,
		paddingBottom: 26,
		paddingHorizontal: 25,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#18181B",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
	},
	text2: {
		color: "#8B8B91",
	},
	text3: {
		color: "#F3F3F3",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 14,
		marginLeft: 23,
	},
	text4: {
		color: "#F3F3F3",
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 7,
		marginLeft: 23,
	},
	text5: {
		color: "#D21F34",
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 30,
	},
	text6: {
		color: "#8B8B91",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
		marginLeft: 1,
	},
	text7: {
		color: "#8B8B91",
		fontSize: 24,
		fontWeight: "bold",
	},
	text8: {
		color: "#F3F3F3",
		fontSize: 14,
		fontWeight: "bold",
	},
	text9: {
		color: "#F3F3F3",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 21,
		marginLeft: 23,
	},
	text10: {
		color: "#F3F3F3",
		fontSize: 16,
		flex: 1,
	},
	text11: {
		color: "#444446",
		fontSize: 10,
	},
	text12: {
		color: "#FFFFFF",
		fontSize: 10,
	},
	view: {
		alignItems: "center",
		marginVertical: 5,
	},
});