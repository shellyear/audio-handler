import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import song from './static/Karacaoglan.mp3'

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const PlayPauseButton = styled.button.attrs({
  role: 'switch'
})``

function useCreateAudio() {
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

function useHandleAudio(audio: HTMLAudioElement | null) {
  const [currentTime, setCurrentTime] = useState(0)

  const handleAudioTimeUpdate = (e: SyntheticEvent<HTMLAudioElement>) => {
    const { currentTime: elementCurrentTime } = e.currentTarget
    setCurrentTime(elementCurrentTime)
  }

  const handleCurrentTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newCurrentTime = parseFloat(e.target.value)
      setCurrentTime(newCurrentTime)
      audio.currentTime = newCurrentTime
    }
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newVolume = parseFloat(e.target.value)
      audio.volume = newVolume
    }
  }

  return {
    handleAudioTimeUpdate,
    handleCurrentTimeChange,
    currentTime,
    handleVolumeChange
  }
}

function usePlayPauseButton(audioCtx: AudioContext, audioElement: HTMLAudioElement | null) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioElement) {
      if (isPlaying) audioElement.play()
      else if (!isPlaying) audioElement.pause()
    }
  }, [audioElement, isPlaying])

  const handlePlayPause = () => {
    if (!isPlaying) setIsPlaying(true)
    else if (isPlaying) {
      setIsPlaying(false)
    }
  }

  return {
    isPlaying,
    handlePlayPause
  }
}

function App() {
  const { audioRef, audioCtx } = useCreateAudio()
  const { handleAudioTimeUpdate, handleCurrentTimeChange, currentTime, handleVolumeChange } = useHandleAudio(
    audioRef.current
  )
  const { isPlaying, handlePlayPause } = usePlayPauseButton(audioCtx, audioRef.current)

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
        max={audioRef.current?.duration}
        step={0.01}
        value={currentTime}
        onChange={handleCurrentTimeChange}
      />
      <input type="range" id="audio-volume-bar" min={0} max={1} step={0.01} onChange={handleVolumeChange} />
    </Container>
  )
}

export default App
