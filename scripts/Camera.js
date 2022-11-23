import Globals from "./globals.js";
import * as Poses from "./PosesManager.js";
let rn = null;
let webcam = null;
let MyVideo = null;


runOnStartup(async runtime =>
{
	rn = runtime;
});

export async function StartCamera()
{
	webcam = rn.objects.UserMedia;
	try {
		let constraints = { 
                        video: { 
                            width: { ideal: 640 }, 
                            height: { ideal: 360 } 
                        }
                    };
		
		MyVideo = C3UserMedia_GetVideoElement(0);
// 		// Request camera input from the user. This might show a permission prompt.
// 		const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
// 		// If camera input approved, show it in the video element.
// 		const videoElem = Globals.videoElem;
// 		videoElem.srcObject = mediaStream;
// 		videoElem.play();
		// Start looking at the pixels in the video. This repeatedly
		// calling itself every frame using requestAnimationFrame.
		OnFrame();
	}
	catch (err)
	{
		// Handle an error - most likely the user declining the permission prompt.
		console.error(err);
		Globals.statusTextInstance.text = "Oops! Something went wrong";
	}
}

function OnFrame()
{
	// Read the pixels from the camera video
	GetCameraPixels();
	
	// Tell the browser to call this function again the next frame.
	// This means the function keeps being called every frame.
	requestAnimationFrame(OnFrame);
}

function GetCameraPixels()
{
	// Get the size of the video
	const videoElem = MyVideo;
	const videoWidth = videoElem.videoWidth;
	const videoHeight = videoElem.videoHeight;
	// If the video size is not greater than 0, it's probably not fully loaded yet.
	// Ignore this call - it will keep trying every frame until it loads.
	if (videoWidth <= 0 || videoHeight <= 0)
		return;
	
	// Pixel data cannot be directly retrieved from a video, but it can be retrieved
	// from a canvas, which the video can be drawn to. So to get the video pixel data
	// use the following three steps:
	// 1) Size the canvas to match the size of the video
	const tempCanvas = Globals.tempCanvas;
	const tempCtx = Globals.tempCtx;
	tempCanvas.width = videoWidth;
	tempCanvas.height = videoHeight;
	// 2) Draw the video to the canvas
	tempCtx.drawImage(videoElem, 0, 0, videoWidth, videoHeight);
	// 3) Retrieve the canvas pixel data
	const imageData = tempCtx.getImageData(0, 0, videoWidth, videoHeight);
	if(imageData!= null){
	Poses.GetPoses(imageData);
	}
}