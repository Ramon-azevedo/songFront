
import './App.css'
import MediaPlayer from './components/MediaPlayer'

function App() {

  return (
    <>
      <div className='quadrado'>
      <div>
        <img width={"100%"} src="../public/pictures/fundo_pequenoV.gif" alt="" />
      </div>
      {<MediaPlayer/>}
      </div>
    </>
  )
}

export default App
