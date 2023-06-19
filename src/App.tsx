import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import song from './static/Karacaoglan.mp3'
import { round } from './tools'

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const PlayPauseButton = styled.button.attrs({
  role: 'switch'
})``

function useHandleAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  if (audioCtxRef.current === null) {
    audioCtxRef.current = new AudioContext() // #https://react.dev/reference/react/useRef - prevent recreating ref contents
  }
  const audioCtx = audioCtxRef.current

  useEffect(() => {
    if (audioRef.current && !(audioRef.current.src || audioRef.current.srcObject)) {
      const source: MediaElementAudioSourceNode = audioCtx.createMediaElementSource(audioRef.current) // passing input node to the API
      source.connect(audioCtx.destination)
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  }, [audioCtx])

  return {
    audioRef,
    audioCtx
  }
}

function useAudioProgressBar(audio: HTMLAudioElement | null) {
  const [progress, setProgress] = useState(0)

  const handleAudioTimeUpdate = (e: SyntheticEvent<HTMLAudioElement>) => {
    const { currentTime, duration } = e.currentTarget
    const newProgress = round((currentTime / duration) * 100, 1)
    setProgress(newProgress)
  }

  const handleCurrentTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (audio) {
      const newCurrentTime = (audio.duration / 100) * Number(value)
      audio.currentTime = newCurrentTime
    }
  }

  return {
    handleAudioTimeUpdate,
    handleCurrentTimeChange,
    progress
  }
}

function usePlayPauseButton(audioCtx: AudioContext, audioElement: HTMLAudioElement | null) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioElement && audioCtx) {
      if (audioElement.paused) audioElement.play()
      else if (!audioElement.paused) audioElement.pause()
    }
  }, [audioCtx, audioElement, isPlaying])

  const handlePlayPause = () => {
    if (!isPlaying) setIsPlaying(true)
    else if (isPlaying) setIsPlaying(false)
  }

  return {
    isPlaying,
    handlePlayPause
  }
}

function App() {
  const { audioRef, audioCtx } = useHandleAudio()
  const { isPlaying, handlePlayPause } = usePlayPauseButton(audioCtx, audioRef.current)
  const { handleAudioTimeUpdate, handleCurrentTimeChange, progress } = useAudioProgressBar(audioRef.current)

  return (
    <Container>
      <audio ref={audioRef} onTimeUpdate={handleAudioTimeUpdate} src={song}>
        Your browser does not support the audio tag.
      </audio>
      <PlayPauseButton onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</PlayPauseButton>
      <input
        type="range"
        id="audio-progress-bar"
        min={0}
        max={100}
        step={0.1}
        value={progress}
        onChange={handleCurrentTimeChange}
      />
    </Container>
  )
}

export default App
