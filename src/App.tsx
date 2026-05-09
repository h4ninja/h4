import { SiGithub, SiX } from 'react-icons/si'

function App() {
	return (
		<main className="fixed inset-0 grid place-items-center bg-white p-6" aria-label="h4">
			<div className="grid justify-items-center gap-3.5">
				<h1 className="m-0 text-xl text-[clamp(64px,18vw,200px)] font-bold tracking-[0.02em] leading-[0.9]">
					h4
				</h1>
				<nav className="inline-flex gap-4 text-base font-medium" aria-label="Links">
					<a
						className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
						href="https://github.com/h4ninja"
						target="_blank"
						rel="noreferrer"
					>
						<span className="sr-only">GitHub</span>
						<SiGithub size={20} aria-hidden="true" />
					</a>
					<a
						className="text-black no-underline hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
						href="https://x.com/imh4ninja"
						target="_blank"
						rel="noreferrer"
					>
						<span className="sr-only">X</span>
						<SiX size={20} aria-hidden="true" />
					</a>
				</nav>
			</div>
		</main>
	)
}

export default App
