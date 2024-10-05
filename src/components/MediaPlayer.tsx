import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import './MediaPlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';



// Definindo a interface para o tipo Song
interface Song {
    title: string;
    artist: string;
    url: string;
}

const MediaPlayer = () => {
    const [songs, setSongs] = useState<Song[]>([]);   // Lista de músicas
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);  // Índice da música atual
    const [isPlaying, setIsPlaying] = useState<boolean>(false);  // Estado de reprodução

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // Buscar a lista de músicas do back-end ao carregar o componente
    useEffect(() => {
        axios.get(`${backendUrl}api/songs`)
            .then(response => {
                setSongs(response.data);  
                if (response.data.length > 0) {
                    setCurrentSongIndex(0);  
                }
            })
            .catch(error => {
                console.error("Erro ao carregar as músicas", error);
            });
    }, [backendUrl]);

    // Função para pular para a próxima música
    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => 
            prevIndex + 1 < songs.length ? prevIndex + 1 : 0
        );  // Avança para a próxima música ou reinicia no início
    };

    // Função para voltar para a música anterior
    const previousSong = () => {
        setCurrentSongIndex((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : songs.length - 1
        );  // Volta para a música anterior ou vai para a última música
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev); // Alternar estado de reprodução
    };

    return (
        <div className="media-player">
            {songs.length > 0 && (
                <div>
                    {/* Informações da música atual */}
                    <div className="current-song-info">
                        <h3>{songs[currentSongIndex].title} - {songs[currentSongIndex].artist}</h3>
                    </div>

                    {/* Botões para controlar o player */}
                    <div className="controls">
                        <button onClick={previousSong}>
                            <FontAwesomeIcon icon={faStepBackward} />
                        </button>
                        <button onClick={togglePlay}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                        </button>
                        <button onClick={nextSong}>
                            <FontAwesomeIcon icon={faStepForward} />
                        </button>
                    </div>

                    {/* Player */}
                    <ReactPlayer
                        className="react-player"
                        url={songs[currentSongIndex].url}
                        controls={true}        
                        playing={isPlaying}     
                        onEnded={nextSong}      
                        width="100%"
                        height="50px"          
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            position: 'relative', 
                            zIndex: 1 
                        }}
                    />
                </div>
            )}

            {/* Exibir uma mensagem se não houver músicas disponíveis */}
            {songs.length === 0 && <p>Carregando músicas...</p>}
        </div>
    );
}

export default MediaPlayer;
