import React from 'react';
import {Appbar} from 'react-native-paper';



export default function MainAppBar(props){
    return(
    <Appbar.Header style={{backgroundColor:props.backgroundColor}}>
    <Appbar.BackAction onPress={()=>{}}/>
        <Appbar.Content title={props.title}/>
    <Appbar.Action icon="calendar"onPress={()=>{}}/>
    <Appbar.Action icon={props.icon}onPress={props.getUserPosition}/>
    </Appbar.Header>
    );
    }
    
    
    