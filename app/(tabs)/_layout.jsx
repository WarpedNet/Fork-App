import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { color } from '@rneui/base';
import {Tabs} from 'expo-router';
const tabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" 
             options={{
                title: 'Home',
                tabBarIcon: ({color }) => <FontAwesome size={28} name="home" color={color} />,
                }} />
            <Tabs.Screen name="forks" 
            options={{
                title: 'Forks',
                tabBarIcon: ({color}) => <MaterialCommunityIcons size={28} name="silverware-fork" color={color} />,
                }} />
        </Tabs>
        
    );

}
export default tabLayout
