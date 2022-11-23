const tempCanvas = document.createElement("canvas");

const Globals = {
	videoElem: C3UserMedia_GetVideoElement(0),
	tempCanvas,
	tempCtx: tempCanvas.getContext("2d")
};

export default Globals;