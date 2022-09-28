import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import {AntDesign,FontAwesome5} from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {
    const handlePlay = async()=>{
        let curFile = props.musicas[props.audioIndex].file;
        let newMusics = props.musicas.filter((val,k)=>{
            if(props.audioIndex == k){
                props.musicas[k].playing = true;
               
                curFile = props.musicas[k].file;
                
            }
            else{
                props.musicas[k].playing = false;
            }

            return props.musicas[k];
      })


      try{

        if(props.audio != null){
                props.setPlaying(true);
                props.setarMusicas(newMusics);
                await props.audio.playAsync();
        }else{
                let curAudio = new Audio.Sound();
                try{
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                }catch(error){}

                props.setarAudio(curAudio);
                props.setarMusicas(newMusics);
                props.setPlaying(true);
        }


      }catch(error){}


    }
    const handlePause=async()=>{
        if (props.audio!=null){
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    } 
    const handleBackward=async()=>{
        let newIndex=props.audioIndex-1;
        if(newIndex<0){
            newIndex=props.musicas.length-1;
        }
        props.setarAudioIndex(newIndex);
        let curFile = props.musicas[newIndex].file;
        let newMusics = props.musicas.filter((val,k)=>{
            if (newIndex == k){
              props.musicas[k].playing = true;
              curFile = props.musicas[k].file;
              
            }else{
              props.musicas[k].playing = false;
            }
            return props.musicas[k];
          })
          if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
           await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);


    } 
    const handleForward=async()=>{
        let newIndex=props.audioIndex+1;
        if(newIndex>=props.musicas.length){
            newIndex=0;
        }
        props.setarAudioIndex(newIndex);
        let curFile = props.musicas[newIndex].file;
        let newMusics = props.musicas.filter((val,k)=>{
            if (newIndex == k){
              props.musicas[k].playing = true;
              curFile = props.musicas[k].file;
              
            }else{
              props.musicas[k].playing = false;
            }
            return props.musicas[k];
          })
          if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
           await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
       
    } 



    const handleStop=async()=>{
        if (props.audio!=null){
            props.audio.stopAsync();
            props.setPlaying(false);
            props.setarAudio(null);
            props.setarAudioIndex(0);
        }
        props.setPlaying(false);

    }

return(
    <View style={styles.player}>
     <TouchableOpacity onPress={(()=>handleBackward())} style={{marginRight:20,marginLeft:20}}>
        <AntDesign name="banckward" size={25} color='white'/>
     </TouchableOpacity>
     <TouchableOpacity onPress={(()=>handleStop())} style={{marginRight:20,marginLeft:20}}>
        <FontAwesome5 name="stop-circle" size={25} color='white'/>
     </TouchableOpacity>
     {
        (!props.playing)?
     <TouchableOpacity onPress={(()=>handlePlay())} style={{marginRight:20,marginLeft:20}}>
        <AntDesign name="playcircleo" size={25} color='white'/>
     </TouchableOpacity>
     :
     <TouchableOpacity onPress={(()=>handlePause())} style={{marginRight:20,marginLeft:20}}>
     <AntDesign name="pausecircleo" size={25} color='white'/>
    </TouchableOpacity>
     }
    
     <TouchableOpacity onPress={(()=>handleForward())} style={{marginRight:20,marginLeft:20}}>
        <AntDesign name="forward" size={25} color='white'/>
     </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    player:{
        width:'100%',
        height:120,
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:999,
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
});