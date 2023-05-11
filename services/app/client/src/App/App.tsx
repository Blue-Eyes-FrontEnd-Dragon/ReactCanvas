import React from 'react';
import Canvas from './components/Canvas';


/**
 *
 * @param context
 */
const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = '#000000';
	ctx.beginPath();
	ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
	ctx.fill();
};

/**
 *
 * @returns
 */
const App = () => (
	<div role="application">
		<Canvas draw={draw} />
	</div>
);

export default App;
