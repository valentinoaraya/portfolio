import {
	Children,
	memo,
	useEffect,
	useMemo,
	useState,
	type ComponentPropsWithoutRef,
	type ReactElement,
	type ReactNode,
} from "react";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";

export function AnimatedListItem({ children }: { children: ReactNode }) {
	const animations: MotionProps = {
		initial: { scale: 0, opacity: 0 },
		animate: { scale: 1, opacity: 1, originY: 0 },
		exit: { scale: 0, opacity: 0 },
		transition: { type: "spring", stiffness: 350, damping: 40 },
	};

	return (
		<motion.div {...animations} layout className="mx-auto w-full min-w-0 max-w-md lg:max-w-none">
			{children}
		</motion.div>
	);
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
	delay?: number;
	active?: boolean;
}

export const AnimatedList = memo(
	({
		children,
		className,
		delay = 1000,
		active = true,
		...props
	}: AnimatedListProps) => {
		const [index, setIndex] = useState(0);
		const [prevActive, setPrevActive] = useState(active);
		const childrenArray = useMemo(
			() => Children.toArray(children),
			[children],
		);

		if (active !== prevActive) {
			setPrevActive(active);
			if (!active) {
				setIndex(0);
			}
		}

		useEffect(() => {
			if (!active) return;

			let timeout: ReturnType<typeof setTimeout> | null = null;

			if (index < childrenArray.length - 1) {
				timeout = setTimeout(() => {
					setIndex((prevIndex) => prevIndex + 1);
				}, delay);
			}

			return () => {
				if (timeout !== null) {
					clearTimeout(timeout);
				}
			};
		}, [index, delay, childrenArray.length, active]);

		const itemsToShow = useMemo(
			() => childrenArray.slice(0, index + 1).reverse(),
			[index, childrenArray],
		);

		return (
			<div
				className={`flex flex-col items-center gap-4 ${className ?? ""}`}
				{...props}
			>
				<AnimatePresence>
					{itemsToShow.map((item) => (
						<AnimatedListItem
							key={(item as ReactElement).key}
						>
							{item}
						</AnimatedListItem>
					))}
				</AnimatePresence>
			</div>
		);
	},
);

AnimatedList.displayName = "AnimatedList";
