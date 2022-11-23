export let detector = null;
let estimationConfig = null;
let rn = null;

runOnStartup(async runtime =>
{
	rn = runtime;
});

//on start
export async function init()
{	
	const model = handPoseDetection.SupportedModels.MediaPipeHands;
	const detectorConfig = {
	  runtime: 'tfjs',
	  maxHands: '1',
	  modelType:'lite'
	};
	estimationConfig = {flipHorizontal: false};
	detector = await handPoseDetection.createDetector(model, detectorConfig);
}

//on every tick
export async function GetPoses(imageData)
{
	if(detector != null)
	{
		const hands = await detector.estimateHands(imageData, estimationConfig);
		if(hands != null){
		rn.callFunction("DetectPoses",[JSON.stringify(hands)]);
		}
	}
}