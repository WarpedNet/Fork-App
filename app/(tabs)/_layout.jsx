import {Tabs} from 'expo-router';
const tabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{title: 'Home'}} />
            <Tabs.Screen name="forks" options={{title: 'Forks'}} />
        </Tabs>
        
    );

}
export default tabLayout
