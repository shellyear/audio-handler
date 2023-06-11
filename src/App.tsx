import { useEffect, useRef } from 'react'
import song from './static/Karacaoglan.mp3'

function useHandleAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext>(new AudioContext())
  const audioCtx = audioCtxRef.current

  useEffect(() => {
    if (audioRef.current && !(audioRef.current.src || audioRef.current.srcObject)) {
      const source: MediaElementAudioSourceNode = audioCtx.createMediaElementSource(audioRef.current)
      source.connect(audioCtx.destination)
    }

    return () => {
      if (['running', 'suspended'].includes(audioCtx.state)) {
        audioCtx.close()
      }
    }
  }, [audioCtx])

  return {
    audioRef
  }
}

function App() {
  const { audioRef } = useHandleAudio()

  return (
    <div className="flex h-screen grow flex-col items-center justify-center">
      <audio ref={audioRef} controls src={song}>
        {/* <source src={song} type="audio/mpeg" /> */}
        Your browser does not support the audio tag.
      </audio>
    </div>
  )
}

export default App
