
import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"

/*
  CALIFEST TV — CUSTOM VIDEO PLAYER

  IMPORTANT:
  - Uses the existing CRBC HLS stream.
  - HLS.js remains responsible for HLS playback.
  - Custom controls replace the browser's default controls.
  - No current-time or duration labels.
*/

const SAMPLE_HLS_URL =
  "https://shoppstream.nsmall.com/IPHONE/mobile.m3u8"

function VideoPlayer() {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const hideControlsTimer = useRef(null)

  const [playerState, setPlayerState] = useState("loading")
  const [errorMessage, setErrorMessage] = useState("")

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // For streams that expose a finite duration, show a seekable timeline.
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // --------------------------------------------------
  // HLS STREAM INITIALIZATION
  // --------------------------------------------------

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setPlayerState("loading")
    setErrorMessage("")

    const handleLoaded = () => setPlayerState("ready")

    const handleError = () => {
      setPlayerState("error")
      setErrorMessage(
        "The stream could not be loaded. Check your connection or stream source."
      )
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = SAMPLE_HLS_URL

      video.addEventListener("loadedmetadata", handleLoaded)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadedmetadata", handleLoaded)
        video.removeEventListener("error", handleError)
        video.removeAttribute("src")
        video.load()
      }
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      })

      hlsRef.current = hls

      hls.loadSource(SAMPLE_HLS_URL)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setPlayerState("ready")
      })

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return

        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          setPlayerState("loading")
          hls.startLoad()
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError()
        } else {
          setPlayerState("error")
          setErrorMessage("The HLS stream is unavailable or unsupported.")

          hls.destroy()
          hlsRef.current = null
        }
      })

      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    }

    setPlayerState("error")
    setErrorMessage("This browser does not support HLS playback.")
  }, [])

  // --------------------------------------------------
  // VIDEO PLAYBACK STATE
  // --------------------------------------------------

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updatePlaying = () => setIsPlaying(true)
    const updatePaused = () => setIsPlaying(false)

    const updateProgress = () => {
      if (
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        setDuration(video.duration)
        setProgress((video.currentTime / video.duration) * 100)
      } else {
        setDuration(0)
        setProgress(0)
      }
    }

    video.addEventListener("play", updatePlaying)
    video.addEventListener("pause", updatePaused)
    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("durationchange", updateProgress)

    return () => {
      video.removeEventListener("play", updatePlaying)
      video.removeEventListener("pause", updatePaused)
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("durationchange", updateProgress)
    }
  }, [])

  // --------------------------------------------------
  // PLAYER CONTROLS
  // --------------------------------------------------

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      try {
        await video.play()
      } catch {
        setErrorMessage("Unable to start playback. Please try again.")
      }
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const changeVolume = (value) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = Number(value)

    video.volume = newVolume
    video.muted = newVolume === 0

    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = async () => {
    const player = videoRef.current?.parentElement
    if (!player) return

    try {
      if (!document.fullscreenElement) {
        await player.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen may be unavailable in some browser contexts.
    }
  }

  useEffect(() => {
    const updateFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", updateFullscreen)

    return () => {
      document.removeEventListener("fullscreenchange", updateFullscreen)
    }
  }, [])

  const seekVideo = (event) => {
    const video = videoRef.current
    if (!video || !duration) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const position = (event.clientX - bounds.left) / bounds.width

    video.currentTime = Math.max(
      0,
      Math.min(position, 1)
    ) * duration
  }

  // --------------------------------------------------
  // AUTO-HIDE CONTROLS
  // --------------------------------------------------

  const showControls = () => {
    setControlsVisible(true)

    clearTimeout(hideControlsTimer.current)

    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setControlsVisible(false)
      }, 3500)
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true)
      clearTimeout(hideControlsTimer.current)
    }

    return () => clearTimeout(hideControlsTimer.current)
  }, [isPlaying])

  // --------------------------------------------------
  // ICONS
  // --------------------------------------------------

  const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  )

  const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  )

  const VolumeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-5 w-5">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  )

  const MutedIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-5 w-5">
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="m16 9 5 6m0-6-5 6" />
    </svg>
  )

  const FullscreenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="h-5 w-5">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" />
    </svg>
  )

  const ExitFullscreenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="h-5 w-5">
      <path d="M8 3v5H3m13-5v5h5M3 16h5v5m8 0v-5h5" />
    </svg>
  )

  // --------------------------------------------------
  // PLAYER INTERFACE
  // --------------------------------------------------

  return (
    <div
      className="group relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-[#080808] shadow-2xl"
      onMouseMove={showControls}
      onMouseLeave={() => {
        if (isPlaying) setControlsVisible(false)
      }}
      onTouchStart={showControls}
    >

      {/* VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        playsInline
        preload="metadata"
        poster=""
        onClick={togglePlay}
      />

      {/* SAMPLE STREAM LABEL */}
      <div className="pointer-events-none absolute left-5 top-5 z-10">
        <span className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-lg">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          LIVE 24/7
        </span>
      </div>

      {/* CENTER PLAY BUTTON */}
      {!isPlaying && playerState !== "loading" && playerState !== "error" && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFC400] text-[#080808] shadow-2xl transition duration-300 hover:scale-110 hover:bg-white"
        >
          <PlayIcon />
        </button>
      )}

      {/* LOADING */}
      {playerState === "loading" && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/20 border-t-[#FFC400]" />
            <p className="text-sm font-semibold">
              Connecting to Califest TV...
            </p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {playerState === "error" && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/90 p-6">
          <div className="max-w-sm text-center">
            <p className="font-bold text-red-400">Stream unavailable</p>
            <p className="mt-2 text-sm text-gray-300">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* CUSTOM CONTROLS */}
      {playerState !== "loading" && playerState !== "error" && (
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >

          {/* SEEK BAR: only displayed when the stream has a finite duration */}
          {duration > 0 && (
            <div
              onClick={seekVideo}
              role="slider"
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              tabIndex={0}
              className="mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/25"
            >
              <div
                className="h-full rounded-full bg-[#FFC400] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-4">

            {/* LEFT CONTROLS */}
            <div className="flex items-center gap-4">

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="text-white transition hover:scale-110 hover:text-[#FFC400]"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div className="group/volume flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="text-white transition hover:text-[#FFC400]"
                >
                  {isMuted || volume === 0 ? <MutedIcon /> : <VolumeIcon />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(event) => changeVolume(event.target.value)}
                  aria-label="Volume"
                  className="w-0 cursor-pointer accent-[#FFC400] opacity-0 transition-all duration-300 group-hover/volume:w-20 group-hover/volume:opacity-100 focus:w-20 focus:opacity-100"
                />
              </div>

              {/* LIVE STATUS */}
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                LIVE
              </span>

            </div>

            {/* RIGHT CONTROLS */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="text-white transition hover:scale-110 hover:text-[#FFC400]"
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
