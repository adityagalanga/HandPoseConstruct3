
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

import Globals from "./globals.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	// On startup, insert the video element to the document, and
	// position it in the top-left of the page so it appears on-screen.
// 	const videoElem = Globals.videoElem;
// 	document.body.appendChild(videoElem);
// 	videoElem.style.opacity = 0.3;
// 	videoElem.style.position = "absolute";
// 	videoElem.style.left = "0px";
// 	videoElem.style.top = "0px";
	
// 	// Note only setting the width will proportionately resize the video
// 	// down to show a 320px sized thumbnail, rather than taking up the full
// 	// size of the video, which could take up the whole screen.
// 	videoElem.style.width = "100%";
// 	videoElem.style.height = "100%";
	
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{

	// Code to run every tick
}
