import React, { useEffect, useState } from "react";

/**
 * Full-screen round intro: large 3,2,1, GO! sequence with animation.
 * Props:
 * - onComplete(): called after GO animation finishes
 * - startFrom: number to start countdown from (default 3)
 * - intervalMs: milliseconds per step (default 800)
 */
const RoundIntro = ({ onComplete, startFrom = 3, intervalMs = 800 }) => {
	const [step, setStep] = useState(startFrom); // 3,2,1,0 (0 -> GO)

	useEffect(() => {
		let mounted = true;
		const run = async () => {
			for (let s = startFrom; s >= 0; s--) {
				if (!mounted) return;
				setStep(s);
				// wait interval
				// slightly longer for GO
				const wait = s === 0 ? intervalMs + 250 : intervalMs;
				// eslint-disable-next-line no-await-in-loop
				await new Promise((r) => setTimeout(r, wait));
			}
			if (mounted) onComplete?.();
		};
		run();
		return () => {
			mounted = false;
		};
	}, [onComplete, startFrom, intervalMs]);

	const isGo = step === 0;
	return (
		<div className="round-intro-overlay" role="presentation">
			<div className={`round-intro-card ${isGo ? "go" : "count"}`}>
				<div className="round-intro-number" aria-hidden>
					{isGo ? "GO!" : step}
				</div>
			</div>
		</div>
	);
};

export default RoundIntro;
