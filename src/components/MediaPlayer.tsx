import { useState } from "react";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import './MediaPlayer.css';

// Definindo a interface para o tipo Song
interface Song {
    title: string;
    artist: string;
    url: string;
}

const MediaPlayer = () => {
    // Lista de músicas definida localmente
    const [songs] = useState<Song[]>([
        {
            title: "Umbrella",
            artist: "Master producer",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050561/Umbrella_da89dd.m4a"
        },
        {
            title: "Take_on_me",
            artist: "Remastered",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050556/Take_on_me_xxnwdn.m4a"
        },
        {
            title: "peloInterfone",
            artist: "Ritchie",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050548/peloInterfone_dri0fe.m4a"
        },
        {
            title: "meninaVeneno",
            artist: "Ritchie",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050543/meninaVeneno_mqxdxm.m4a"
        },
        {
            title: "melo my love",
            artist: "Igor producer",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050538/melo_ewwywo.m4a"
        },
        {
            title: "girlsJust",
            artist: "Cyndi Lauper",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050530/girlsJust_tbymna.m4a"
        },
        {
            title: "dancing",
            artist: "SpeedUp",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1728050523/dancingSpeedUp_ooyx5i.m4a"
        },
        {
            title: "LinkinPark",
            artist: "Banda",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1727974452/LinkinPark_bun9da.m4a"
        },
        {
            title: "DriveNightCall",
            artist: "Drive",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1727968643/DriveNightCall_wunwnn.m4a"
        },
        {
            title: "LifeGoesOn",
            artist: "Oliver Tree",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1727968621/LifeGoesOn_jnsadq.m4a"
        },
        {
            title: "SunFlower",
            artist: "Spider-man",
            url: "https://res.cloudinary.com/dnqprkqvq/video/upload/v1727968593/SunFlower_l4etge.m4a"
        }
        // Adicione mais músicas conforme necessário
    ]);
    
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);  // Índice da música atual
    const [isPlaying, setIsPlaying] = useState<boolean>(false);  // Estado de reprodução

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
