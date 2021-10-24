function createLetter(){
	var form = document.getElementById("letter_link");
	const host = "https://letter-qr.herokuapp.com";
	const endpoint = host + "/api/v1/letter/";

	form.addEventListener("submit", function(e){
		e.preventDefault();
		var dataForm = new FormData(form);
		var objectForm = {};

		dataForm.forEach(function(value, key){
			objectForm[key] = value;
		});

		// request
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {;
			if (xhr.status >= 200 && xhr.status < 300){
				const response = JSON.parse(xhr.responseText);
				addContentResponse(host, response);	
			};
		};

		if(form["link"].value != ""){
			xhr.open('POST', endpoint);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(objectForm));
		};

		document.letter_form.reset();
	});
	return false;
};


function addContentResponse(host, response){
	
	// insert div containing qr image	
	var divDupl = document.getElementById("divImg");
	// insert download button
	var tagDupl = document.getElementById("download");

	// Check if div is present in document
	if(divDupl != null){
		// Remove div from document
		divDupl.remove();
	};
	// Check if the download button is present in document
	if(tagDupl != null){
		// Remove tag from document
		tagDupl.remove();
	};

	var rowContainer = document.getElementById("rowContainer");
	var divImg = document.createElement("div");
	divImg.classList.add("col-sm");
	divImg.id = "divImg";
	var imgShow = document.createElement("img");
	imgShow.src = host + response.image;
	imgShow.classList.add("img-fluid");
	imgShow.id = "qrImage";
	divImg.appendChild(imgShow);
	rowContainer.appendChild(divImg);

	var atag = document.createElement("a");
	var ptag = document.createElement("p");
	ptag.innerHTML = "Este QR estara con la hoja en pdf";
	ptag.classList.add("pLabel");
	atag.href = host + response.download;
	atag.id = "download";
	atag.innerHTML = "descargar";
	atag.classList.add("btn");
	atag.classList.add("btn-secondary");
	divImg.appendChild(ptag);
	divImg.appendChild(atag);
};