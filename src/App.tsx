import { SiGithub, SiX } from 'react-icons/si'

const reviews = [
	{
		name: 'Jamie Church',
		rating: 5,
		text: 'Awesome!! 👌🏼 Jackson & his team at Arbor analytics just recently completed some work at one of our jobs in lower plenty and did such an amazing job. We will definitely use again on any of our next jobs coming up. Thanks guys!',
	},
	{
		name: 'jackjohnsoning',
		rating: 5,
		text: 'Arbor Analytics completed a Health, Condition and Risk Assessment for some trees on our property. We are extremely happy with the report and advice from Jackson',
	},
	{
		name: 'Aaron Meneghini',
		rating: 5,
		text: 'We needed some guidance and reports regarding some trees that are on our property and proposed building works. Arbour Analytics were very prompt and professional in providing this service.',
	},
	{
		name: 'Fenrisulfr Jossef (Fen)',
		rating: 5,
		text: 'Jackson arrived and gave me some great advice on a large liquid amber tree and how to live with/maintain. If it becomes to problematic we\'ll be seeing these guys again.',
	},
	{
		name: 'Andrew',
		rating: 5,
		text: 'Arbor Analytics has been fantastic to work with — professional, approachable, and truly invested in delivering clear insights. Their mix of technical expertise and genuine care for clients makes them an easy five-star recommendation.',
	},
	{
		name: 'James Michetti',
		rating: 5,
		text: 'Extremely happy with the service and Arboriculture Impact Assessment - Tree Report recently completed by Arbor Analytics',
	},
	{
		name: 'Paul McCuaig',
		rating: 5,
		text: 'I had an issue with an unworkable council requirement to plant a replacement tree. I engaged Jackson, who recommended a workable solution. He then contacted …',
	},
	{
		name: 'Joel & Dani Nelson',
		rating: 5,
		text: 'We recently got a tree assessment done on our property. Very happy with their knowledge and expertise. The report is very professional and will be a big aid in our permit application to the council.',
	},
]

function App() {
	return (
		<main className="min-h-screen bg-white p-6" aria-label="h4">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-8 pt-[15vh]">
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

				<section className="w-full pb-12" aria-label="Reviews">
					<h2 className="mb-6 text-center text-lg font-medium tracking-wide">Reviews</h2>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{reviews.map((review) => (
							<div
								key={review.name}
								className="rounded-lg border border-black/10 p-4"
							>
								<div className="mb-1 font-medium">{review.name}</div>
								<div className="mb-2 text-base tracking-widest text-yellow-500">
									{'★'.repeat(review.rating)}
								</div>
								<p className="text-sm leading-relaxed opacity-80">{review.text}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

export default App
