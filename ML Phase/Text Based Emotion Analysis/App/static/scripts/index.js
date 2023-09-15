let emotion_images = {
	Anger: "https://play-lh.googleusercontent.com/G4PFUhWRDby0PDKCzNQU8H6uCngprpDGfz_LSDpKdCXVlAj5qM-Kq6TAvlgWemtbnlA",
	Sadness: "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png",
	Fear: "https://i.pinimg.com/474x/cb/58/6e/cb586eff7d8927dcc89e475149877f1e.jpg",
	Joy: "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f28ed28c5f7ba517e826fbcbcbe09557",
	Surprise:
		"https://media.istockphoto.com/id/840934838/vector/cute-surprised-emoticon-on-white-background.jpg?s=612x612&w=0&k=20&c=6Yny3NkIgML2h-dSFca33M3GRqKC4w7ALa-LkdxKjMg=",
	Disgust:
		"https://www.pngitem.com/pimgs/m/103-1031488_disgusted-emoji-267-decal-sarcastic-emoji-hd-png.png",
};
const emotion_values = ["Anger", "Fear", "Joy", "Disgust", "Surprise", "Anger"];
window.onload=()=>{
	const input = document.getElementById("input");
	const MainOutputContainer = document.getElementById("MainOutputContainer");
	const FilterationSection = document.getElementById("FilterationSection");
	const ValidationSection = document.getElementById("ValidationSection");
	const TokenizationSection = document.getElementById("TokenizationSection");
	const LemmetizationSection = document.getElementById("LemmetizationSection");
	const POSTaggingSection = document.getElementById("POSTaggingSection");
}
async function getResult(event) {
	event.preventDefault();
	// console.log(input.value);
	if (input.value.trim().trim() == "") {
		// window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/getresult", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "grid";
			FilterationSection.style.display = "none";
			ValidationSection.style.display = "none";
			TokenizationSection.style.display = "none";
			LemmetizationSection.style.display = "none";
			POSTaggingSection.style.display = "none";
			for (const key in emotion_values) {
				// console.log(key);
				if (
					emotion_values[key].toLocaleLowerCase() ==
					result.sentiment
				) {
					MainOutputContainer.innerHTML = `
				<div class="finalOutput">
					<h2>Predicted Emotion is</h2>
					<h1> ${emotion_values[key]}</h1>
					<img src="${emotion_images[emotion_values[key]]}" alt="">
					<p>Generalized Emotion is :<strong> ${
						result.generalizedPrediction
					}</strong></p>
					<p>More Specific Emotion is : <strong>${
						result.specificPrediction
					}</strong></p>
				</div>					
					`;
				}
			}
		} catch (error) {
			// console.log(error);
		}
	}
}

function clearInput(event) {
	document.getElementById("input").value = "";
	MainOutputContainer.style.display = "none";
	FilterationSection.style.display = "none";
	ValidationSection.style.display = "none";
	TokenizationSection.style.display = "none";
	LemmetizationSection.style.display = "none";
	POSTaggingSection.style.display = "none";
}

async function SubmitFile(event) {
	// console.log("submitted");
	let file = document.getElementById("file").files[0];
	if (!!file) {
		// console.log(file);
		let filename = file.name;
		// console.log(filename);
		let extention = file.name.split(".")[file.name.split(".").length - 1];
		// console.log(extention);
		if (extention.toLowerCase() == "txt") {
			// console.log("extension accepted");
			if (file.size < 1000000) {
				try {
					let formData = new FormData();
					formData.append("file", file ? file : "");
					let response = await fetch("/upload", {
						method: "POST",
						body: formData,
					});
					// console.log(response);
					let data = await response.json();
					// console.log(data);
					document.getElementById("input").value = data.data;
				} catch (error) {
					// console.log(error);
				}
			} else {
				window.alert("more than 1 mb is mot allowed");
			}
		} else {
			window.alert("extension not allowed, only txt file is permitted");
		}
	} else {
		window.alert("Please Select File Frst");
	}
}

async function validateTheScript(event) {
	event.preventDefault();
	if (input.value.trim() == "") {
		window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/validate", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "none";
			FilterationSection.style.display = "none";
			ValidationSection.style.display = "flex";
			TokenizationSection.style.display = "none";
			LemmetizationSection.style.display = "none";
			POSTaggingSection.style.display = "none";
			if (!!result.data) {
				if (result.data == "Valid") {
					ValidationSection.innerHTML = `
					<h1>Validation Output</h1>
				<div class="output">
					<img src="https://media.istockphoto.com/id/924932028/vector/grunge-green-valid-square-rubber-seal-stamp-on-white-background.jpg?s=170667a&w=0&k=20&c=X6KOlHSu-YOQIeiZKoZCgw4pqsK7ayrwJfIuVZNAbXw=" alt="">
					<h1>Given Text is Valid As per the English Language</h1>
					`;
				} else {
					ValidationSection.innerHTML = `
					<h1>Validation Output</h1>
				<div class="output">
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTne1vTscvxPsxY5-YxsMDrBwmfPEPmpP7fcXnoU259U2pApYFVdCTR1aq-RpWyyAvI0bU&usqp=CAU" alt="">
					<h1>Given Text is InValid As per the English Language</h1>
					`;
				}
			} else {
				window.alert("Some Error occured");
			}
		} catch (error) {
			// console.log(error);
		}
	}
}

async function filterTheScript(event) {
	event.preventDefault();
	if (input.value.trim() == "") {
		window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/filterthetext", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "none";
			FilterationSection.style.display = "flex";
			ValidationSection.style.display = "none";
			TokenizationSection.style.display = "none";
			LemmetizationSection.style.display = "none";
			POSTaggingSection.style.display = "none";
			if (!!result.data) {
				if (result.data == "ERROR") {
					FilterationSection.innerHTML = `
					<h1>Filtered Output is</h1>
					<div class="output">Sorry Some Error Occurred</div>
					`;
				} else {
					FilterationSection.innerHTML = `
					<h1>Filtered Output is</h1>
					<div class="output">" ${result.data} "</div>
					`;
				}
			} else {
				window.alert("Some Error occurred");
			}
		} catch (error) {
			// console.log(error);
		}
	}
}
async function getTokens(event) {
	event.preventDefault();
	if (input.value.trim() == "") {
		window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/tokenize", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "none";
			FilterationSection.style.display = "none";
			ValidationSection.style.display = "none";
			TokenizationSection.style.display = "flex";
			LemmetizationSection.style.display = "none";
			POSTaggingSection.style.display = "none";
			if (!!result.data) {
				if (result.data == "ERROR") {
					TokenizationSection.innerHTML = `
					<h1>Tokenization Output</h1>
				<div class="output">Sorry Some Error Occurred</div>
					`;
				} else {
					TokenizationSection.innerHTML = `
					<h1>Tokenization Output</h1>
				<div class="output">${result.data}</div>
					`;
				}
			} else {
				window.alert("Some Error occured");
			}
		} catch (error) {
			// console.log(error);
		}
	}
}

async function getStems(event) {
	event.preventDefault();
	if (input.value.trim() == "") {
		window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/lemmetization", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "none";
			FilterationSection.style.display = "none";
			ValidationSection.style.display = "none";
			TokenizationSection.style.display = "none";
			LemmetizationSection.style.display = "flex";
			POSTaggingSection.style.display = "none";
			if (!!result.data) {
				if (result.data == "ERROR") {
					LemmetizationSection.innerHTML = `
					<h1>Lemmetization Output</h1>
				<div class="output">Sorry Some Error Occurred</div>
					`;
				} else {
					LemmetizationSection.innerHTML = `
					<h1>Lemmetization Output</h1>
				<div class="output">${result.data}</div>
					`;
				}
			} else {
				window.alert("Some Error occured");
			}
		} catch (error) {
			// console.log(error);
		}
	}
}

async function getPOSTags(event) {
	event.preventDefault();
	if (input.value.trim() == "") {
		window.alert("Please Enter Your Emotion First");
	} else {
		try {
			let response = await fetch("/postagging", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					text: input.value.trim(),
				}),
			});
			let result = await response.json();
			// console.log(result);
			MainOutputContainer.style.display = "none";
			FilterationSection.style.display = "one";
			ValidationSection.style.display = "none";
			TokenizationSection.style.display = "none";
			LemmetizationSection.style.display = "none";
			POSTaggingSection.style.display = "flex";
			if (!!result.data) {
				if (result.data == "ERROR") {
					POSTaggingSection.innerHTML = `
					<h1>POSTagging Output</h1>
					<div class="output">Sorry Some Error Occurred</div>
					`;
				} else {
					POSTaggingSection.innerHTML = `
					<h1>POSTagging Output</h1>
					<div class="output">${result.data}</div>
					`;
				}
			} else {
				window.alert("Some Error occured");
			}
		} catch (error) {
			// console.log(error);
		}
	}
}
