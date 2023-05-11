/* eslint-disable complexity */
import React, { useRef, useEffect } from 'react';
import stylesheet from './Canvas.style';

interface CanvasOptions {
	width: string | number;
	height: string | number;
}

interface CanvasProps {
	children?: React.ReactNode;
	options?: CanvasOptions;
	style?: object;
	draw?: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

/**
 *
 */
const Canvas = ({
	options,
	style,
	children,
	draw,
	...attributes
}: CanvasProps) => {
	const classes = stylesheet();
	const ref = useRef<HTMLCanvasElement>(null);

	// eslint-disable-next-line require-jsdoc
	const cleanup = (animationFrameId: number) => {
		window.cancelAnimationFrame(animationFrameId);
	};

	useEffect(() => {
		const canvas = ref.current;

		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		let frameCount = 0;
		let animationFrameId: number;

		if (!ctx) return;

		if (!draw) return;

		// eslint-disable-next-line require-jsdoc
		const render = () => {
			frameCount++;
			draw(ctx, frameCount);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			cleanup(animationFrameId);
		};
	}, [draw]);

	return (
		<canvas
			height={options?.height}
			width={options?.width}
			ref={ref}
			style={classes.canvas || style}
			{...attributes}
		>
			{children}
		</canvas>
	);
};

export default Canvas;
