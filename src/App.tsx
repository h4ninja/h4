import { useEffect, useRef, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import { SiGitlab, SiX } from 'react-icons/si'

function App() {
	const [isPlaying, setIsPlaying] = useState(true)
	const [position, setPosition] = useState(0)
	const [duration, setDuration] = useState(0)
	const isPlayingRef = useRef(true)
	const loopIdRef = useRef(0)
	const layerCountRef = useRef(1)
	const layerOffsetsMsRef = useRef<number[]>([0])
	const audioHandlesRef = useRef<Array<{ audio: HTMLAudioElement; onEnded: () => void }>>([])

	useEffect(() => {
		const src = 'https://h4h4.s3.ap-southeast-2.amazonaws.com/introduction.mp3'
		const minDelayMs = 7000
		const maxDelayMs = 13000
		const maxLayers = 3

		const destroyHandles = (keepFirst: boolean) => {
			const startIndex = keepFirst ? 1 : 0
			for (const handle of audioHandlesRef.current.slice(startIndex)) {
				handle.audio.pause()
				handle.audio.currentTime = 0
				handle.audio.removeEventListener('ended', handle.onEnded)
			}
			audioHandlesRef.current = keepFirst ? audioHandlesRef.current.slice(0, 1) : []
		}

		const createHandle = (onLoop?: () => void) => {
			const audio = new Audio(src)
			audio.preload = 'auto'
			const onEnded = () => {
				if (!isPlayingRef.current) return
				audio.currentTime = 0
				void audio.play().catch(() => {
					isPlayingRef.current = false
					setIsPlaying(false)
				})
				onLoop?.()
			}
			audio.addEventListener('ended', onEnded)
			return { audio, onEnded }
		}

		const addLayer = (expectedLoopId: number) => {
			if (!isPlayingRef.current) return
			if (expectedLoopId !== loopIdRef.current) return
			if (audioHandlesRef.current.length >= layerCountRef.current) return
			if (audioHandlesRef.current.length >= maxLayers) return

			const handle = createHandle()
			audioHandlesRef.current = [...audioHandlesRef.current, handle]

			handle.audio.currentTime = 0
			void handle.audio.play().catch(() => {
				isPlayingRef.current = false
				setIsPlaying(false)
			})
		}

		const onPrimaryLoop = () => {
			loopIdRef.current += 1
			const loopId = loopIdRef.current

			if (layerCountRef.current >= maxLayers) {
				layerCountRef.current = 1
				layerOffsetsMsRef.current = [0]
				destroyHandles(true)
				return
			}

			layerCountRef.current += 1
			const prevOffset = layerOffsetsMsRef.current[layerCountRef.current - 2] ?? 0
			const inc = minDelayMs + Math.round(Math.random() * Math.max(0, maxDelayMs - minDelayMs))
			const startDelay = prevOffset + inc
			layerOffsetsMsRef.current[layerCountRef.current - 1] = startDelay
			window.setTimeout(() => addLayer(loopId), startDelay)
		}

		const primary = createHandle(onPrimaryLoop)
		audioHandlesRef.current = [primary]

		if (isPlayingRef.current) {
			void primary.audio.play().catch(() => {
				isPlayingRef.current = false
				setIsPlaying(false)
			})
		}

		return () => {
			destroyHandles(false)
		}
	}, [])

	useEffect(() => {
		const timer = window.setInterval(() => {
			const primary = audioHandlesRef.current[0]?.audio
			if (!primary) return
			setPosition(primary.currentTime)
			if (Number.isFinite(primary.duration)) {
				setDuration(primary.duration)
			}
		}, 200)

		return () => window.clearInterval(timer)
	}, [])

	const toggleAudio = async () => {
		const handles = audioHandlesRef.current
		if (handles.length === 0) return

		if (!isPlayingRef.current) {
			isPlayingRef.current = true
			setIsPlaying(true)
			for (const handle of handles) {
				if (
					Number.isFinite(handle.audio.duration) &&
					handle.audio.currentTime >= handle.audio.duration
				) {
					handle.audio.currentTime = 0
				}
				try {
					await handle.audio.play()
				} catch {
					isPlayingRef.current = false
					setIsPlaying(false)
					break
				}
			}
			return
		}

		isPlayingRef.current = false
		for (const handle of handles) handle.audio.pause()
		setIsPlaying(false)
	}

	const onSeek = (nextPosition: number) => {
		const handles = audioHandlesRef.current
		if (handles.length === 0) return

		setPosition(nextPosition)
		for (const handle of handles) {
			const next = Number.isFinite(handle.audio.duration)
				? Math.min(nextPosition, handle.audio.duration)
				: nextPosition
			handle.audio.currentTime = Math.max(0, next)
		}
	}

	return (
		<>
			<main className="fixed inset-0 grid place-items-center bg-white p-6" aria-label="h4">
				<div className="grid justify-items-center gap-3.5">
					<h1 className="m-0 text-xl text-[clamp(64px,18vw,200px)] font-bold tracking-[0.02em] leading-[0.9]">
						h4
					</h1>
					<nav
						className="my-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-[Arial] text-base font-medium"
						aria-label="Projects"
					>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://opentechnology.h4.ninja/"
							target="_blank"
							rel="noreferrer"
						>
							opentechnology
						</a>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://gitlab.com/h4ninja/memory"
							target="_blank"
							rel="noreferrer"
						>
							memory
						</a>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://gitlab.com/h4ninja/sound"
							target="_blank"
							rel="noreferrer"
						>
							sound
						</a>
					</nav>
					<nav className="inline-flex gap-4 text-base font-medium" aria-label="Links">
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://gitlab.com/h4ninja/"
							target="_blank"
							rel="noreferrer"
						>
							<span className="sr-only">GitLab</span>
							<SiGitlab size={20} aria-hidden="true" />
						</a>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://x.com/h4h4269876"
							target="_blank"
							rel="noreferrer"
						>
							<span className="sr-only">X</span>
							<SiX size={20} aria-hidden="true" />
						</a>
					</nav>
				</div>
			</main>
			<div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={toggleAudio}
						className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
						aria-pressed={isPlaying}
						aria-label={isPlaying ? 'Turn audio off' : 'Turn audio on'}
					>
						{isPlaying ? (
							<FiPause size={16} aria-hidden="true" />
						) : (
							<FiPlay size={16} aria-hidden="true" />
						)}
					</button>
					<input
						type="range"
						min={0}
						max={duration > 0 ? duration : 0}
						step={0.01}
						value={Math.min(position, duration || position)}
						onChange={(event) => onSeek(Number(event.target.value))}
						className="h-1.5 w-full cursor-pointer accent-black"
						aria-label="Song position"
					/>
				</div>
			</div>
		</>
	)
}

export default App
