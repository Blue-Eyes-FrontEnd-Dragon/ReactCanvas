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
}

/**
 *
 */
const Canvas = ({
	options,
	style,
	children,
	...attributes
}: CanvasProps) => {
	const classes = stylesheet();
	const ref = useRef<HTMLCanvasElement>(null);

	// eslint-disable-next-line require-jsdoc
	const cleanup = () => {
		//
	};

	useEffect(() => {
		const canvas = ref.current;

		if (!canvas) return;

		return () => {
			cleanup();
		};
	}, []);

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
