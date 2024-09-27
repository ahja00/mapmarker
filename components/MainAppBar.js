import React from 'react'; 
import { Appbar } from 'react-native-paper';

export default function MainAppBar(props) {
    return (
        <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
            <Appbar.Content title={props.title} />
        </Appbar.Header>
    );
}