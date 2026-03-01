import { useEffect, useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { SiGitlab, SiX } from 'react-icons/si'

function App() {
	const [isPlaying, setIsPlaying] = useState(true)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		const audio = new Audio('https://h4h4.s3.ap-southeast-2.amazonaws.com/introduction.mp3')
		audio.preload = 'auto'
		audio.loop = true
		audioRef.current = audio

		const onPlay = () => setIsPlaying(true)
		const onPause = () => setIsPlaying(false)

		audio.addEventListener('play', onPlay)
		audio.addEventListener('pause', onPause)

		audio.play().catch(() => {
			setIsPlaying(false)
		})

		return () => {
			audio.pause()
			audio.removeEventListener('play', onPlay)
			audio.removeEventListener('pause', onPause)
			audioRef.current = null
		}
	}, [])

	const toggleAudio = async () => {
		const audio = audioRef.current
		if (!audio) return

		if (audio.paused) {
			try {
				await audio.play()
				setIsPlaying(true)
			} catch {
				setIsPlaying(false)
			}
			return
		}

		audio.pause()
		setIsPlaying(false)
	}

	return (
		<>
			<main className="fixed inset-0 grid place-items-center p-6" aria-label="h4">
				<div className="grid justify-items-center gap-3.5">
					<h1 className="m-0 text-xl text-[clamp(64px,18vw,200px)] font-bold tracking-[0.02em] leading-[0.9]">
						h4
					</h1>
					<button
						type="button"
						onClick={toggleAudio}
						className="mt-[5px] mb-[5px] inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
						aria-pressed={isPlaying}
						aria-label={isPlaying ? 'Turn audio off' : 'Turn audio on'}
					>
						<span className="sr-only">{isPlaying ? 'Audio on' : 'Audio off'}</span>
						{isPlaying ? (
							<FiVolume2 size={18} aria-hidden="true" />
						) : (
							<FiVolumeX size={18} aria-hidden="true" />
						)}
					</button>
					<nav
						className="mb-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-[Arial] text-base font-medium"
						aria-label="Projects"
					>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://openworld.h4.ninja"
							target="_blank"
							rel="noreferrer"
						>
							openworld
						</a>
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://gitlab.com/h4ninja/memory"
							target="_blank"
							rel="noreferrer"
						>
							memory
						</a>
					</nav>
					<nav className="inline-flex gap-4 text-base font-medium" aria-label="Links">
						<a
							className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							href="https://gitlab.com/h4ninja1/"
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
		</>
	)
}

export default App
