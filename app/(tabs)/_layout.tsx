import { Image } from 'expo-image';
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#454547',
            tabBarStyle: {
                backgroundColor: '#121212',
                borderTopWidth: 0,
                borderTopColor: '#E5E5EA',
                height:  45+insets.bottom,
                paddingBottom: insets.bottom,
                paddingTop: 10,
            },
        }}
        >
            <Tabs.Screen 
            name="index"
            options={{
                tabBarLabel: "홈",
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                        ? require("@/assets/images/main_page_white.png")
                        : require("@/assets/images/main_page_tp.png")
                    } style={{width: 24, height: 24}} 
                    />
                )  
            }}
            />
            <Tabs.Screen 
            name="order" 
            options={{ 
                tabBarLabel: "주문", 
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                        ? require("@/assets/images/savings_white.png")
                        : require("@/assets/images/savings_tp.png")    
                    } style={{width: 24, height: 24}}
                    />
                )    
            }} 
            />
            <Tabs.Screen 
            name="search" 
            options={{ 
                tabBarLabel: "탐색", 
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                        ? require("@/assets/images/explore_white.png")
                        : require("@/assets/images/explore_tp.png")
                    } 
                    style={{width: 24, height: 24}}
                    />
                )    
            }} 
            />
            <Tabs.Screen 
            name="game" 
            options={{ 
                tabBarLabel: "게임",
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                        ? require("@/assets/images/sports_esports_white.png")
                        : require("@/assets/images/sports_esports_tp.png")
                    } 
                    style={{width: 24, height: 24}}/>
                )    
            }} 
            />
            <Tabs.Screen 
            name="tier" 
            options={{ 
                tabBarLabel: "랭킹",
                tabBarIcon: ({ focused }) => (
                    <Image source={
                        focused
                        ? require("@/assets/images/award_star_white.png")
                        : require("@/assets/images/award_star_tp.png")
                    } style={{width: 24, height: 24}}/>
                )    
            }} 
            />
            <Tabs.Screen 
            name="mypage" 
            options={{ 
                tabBarLabel: "마이", 
                tabBarIcon: ({ focused }) => (
                    <Image source={require("@/assets/images/account_circle.png")} style={{width: 24, height: 24}}/>
                )
            }} 
            />
        </Tabs>
    );
}