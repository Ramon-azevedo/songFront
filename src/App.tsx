
import './App.css'
import MediaPlayer from './components/MediaPlayer'

function App() {

  return (
    <>
      <div className='quadrado'>
      <div>
        <img width={"100%"} src="https://res.cloudinary.com/dnqprkqvq/image/upload/v1728190602/fundo_pequenoV_l9qmk6.gif" alt="" />
      </div>
      {<MediaPlayer/>}
      </div>
    </>
  )
}

export default App
