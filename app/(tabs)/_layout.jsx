import {Tabs} from 'expo-router';
const tabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{title: 'Home'}} />
            <Tabs.Screen name="Forks" options={{title: 'Forks'}} />
        </Tabs>
        
    );

}
export default tabLayout
