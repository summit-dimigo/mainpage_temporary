import { Image } from 'expo-image';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#454547',
            tabBarStyle: {
                backgroundColor: '#121212',
                borderTopWidth: 1,
                borderTopColor: '#E5E5EA',
                height: 60,
                paddingBottom: 10,
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
                        ? require("@/assets/main_page_tp.png")
                        : require("@/assets/main_page_white.png")
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
                        ? require("@/assets/savings_tp.png")
                        : require("@/assets/savings_white.png")    
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
                        ? require("@/assets/explore_tp.png")
                        : require("@/assets/explore_white.png")
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
                        ? require("@/assets/images/sports_esports_tp.png")
                        : require("@/assets/images/sports_esports_white.png")
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
                        ? require("@/assets/images/award_star_tp.png")
                        : require("@/assets/images/award_star_white.png")
                    } style={{width: 24, height: 24}}/>
                )    
            }} 
            />
            <Tabs.Screen 
            name="profile" 
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