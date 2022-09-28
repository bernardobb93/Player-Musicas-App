import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js';




export default function App() {
  LogBox.ignoreAllLogs(true);
  const [audioIndex,setarAudioIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [audio,setarAudio]=useState(null);
  const[musicas,setarMusicas]=useState([
    {
      nome: 'In My Head',
      artista:'Jason Derulo',
      playing: false,
      file:require('./assets/Musicas/In-My-Head.mp3'),
  },
  {
    nome: 'Price Tag',
    artista:'Jessie J',
    playing: false,
    file:require('./assets/Musicas/Price-Tag.mp3'),
},
{
  nome: 'New Divide',
  artista:'Linkin Park',
  playing: false,
  file:require('./assets/Musicas/New-Divide.mp3'),
},
{
  nome: 'Tonight',
  artista:'Usher',
  playing: false,
  file:require('./assets/Musicas/Tonight.mp3'),
},
{
  nome: 'Monster',
  artista:'Paramore',
  playing: false,
  file:require('./assets/Musicas/Monster.mp3'),
},
{
  nome: 'The Ballad Of Mona Lisa',
  artista:'Panic! At The Disco',
  playing: false,
  file:require('./assets/Musicas/The-Ballad-Of-Mona-Lisa.mp3'),
},
  ]);

  const changeMusic= async (id)=>{
    let curfile=null;
    let newMusics=musicas.filter((val,k)=>{
      if (id==k){
        musicas[k].playing=true;
        curfile=musicas[k].file;
        setPlaying(true);
        setarAudioIndex(id);
      }else{
        musicas[k].playing=false;
      }
      return musicas[k];
    })
    if (audio!=null){
      audio.unloadAsync();
    }
    let curAudio=new Audio.Sound();
    try {
      await curAudio.loadAsync(curfile);
      await curAudio.playAsync();
    }catch(error){

    }
    setarAudio(curAudio);
    setarMusicas(newMusics);
  }

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <StatusBar hidden/>
      <View style={styles.header}>
        <Text style={styles.txtTitulo}>App Musica | ReactNative</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.txtHeader}>Música</Text>
        <Text style={styles.txtHeader}>Artista</Text>
      </View>
      {
        musicas.map((val,k)=>{
          if (val.playing){
            return(
            <View style={styles.table}>
              <TouchableOpacity onPress={()=>changeMusic(k)} style={styles.toMusicas}>
                <Text style={styles.txtMusicasTocando}>
                  <AntDesign name="pausecircle" size={15} color='#1DB954'/> {val.nome}</Text>
                <Text style={styles.txtMusicasTocando}> {val.artista}</Text>
              </TouchableOpacity>
            </View>);
          }else{
            return(
              <View style={styles.table}>
                <TouchableOpacity onPress={()=>changeMusic(k)} style={styles.toMusicas}>
                  <Text style={styles.txtMusicas}>
                    <AntDesign name="play" size={15} color="white"/> {val.nome}</Text>
                  <Text style={styles.txtMusicas}> {val.artista}</Text>
                </TouchableOpacity>
              </View>);
          }
        })
      }

    <View style={{paddingBottom:200}}></View>
    </ScrollView>
    <Player 
    playing={playing} 
    setPlaying={setPlaying} 
    audioIndex={audioIndex} 
    setarAudioIndex={setarAudioIndex}
    musicas={musicas}
    setarMusicas={setarMusicas}
    audio={audio}
    setarAudio={setarAudio}
    >  
    </Player>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  txtTitulo:{
    textAlign:'center',
    color:'white',
    fontSize:25,
  },
  header:{
    backgroundColor:'#1DB954',
    width:'100%',
    padding:20,
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderColor:'white',
    borderBottomWidth:1,
  },
  toMusicas:{
    width:'100%',
    flexDirection: 'row',

  },
  txtHeader:{
    width:'50%',
    color:'rgb(200,200,200)',
  },
  txtMusicas:{
    width:'50%',
    color:'white',
  },
  txtMusicasTocando:{
    width:'50%',
    color:'#1DB954',
  },
});
