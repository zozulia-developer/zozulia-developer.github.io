let dataUsers = [];
$("#search-field").on('input', searchUsers)
$("#search-button").click(searchUsers);

$.ajax({
	method: "get",
	url: 'https://randomuser.me/api/?results=20',
	dataType: 'json',
	success: function(r) {
		dataUsers = r.results;
		renderUsers(r.results);
	},
	error: function() {
		alert("error");
	},
	complete: function(){
		$("#loadingtext").fadeOut();
	}
});

function formatDate(date) {
	return new Date(date).toLocaleDateString('en-US')
}

function searchUsers(e) {
	$("div.card").remove();
	let inputValue = e.target.value.toLowerCase();
	const filteredUsers = dataUsers.filter(({ name: { first } }) =>first.startsWith(inputValue))
	renderUsers(filteredUsers);
	if (filteredUsers.length == 0) {
		alert('No matches')
	}
}

function renderUsers(data) {
	showChart(data);
	for (var i = 0; i < data.length; i++) {

		let idBody = 'acc-body' + i;
		let idHeading = 'heading' + i;
		let idGenderIcon = 'gender' + i;

		let classAvatarMedium = 'avatar-medium' + i;
		let classAvatarLarge = 'avatar-large' + i;
		let classFirstName = 'firstname' + i;
		let classLastName = 'lastname' + i;
		let classUsername = 'username' + i;
		let classPhone = 'phone' + i;
		let classLocation = 'location' + i;
		let classEmail = 'email' + i;
		let classRegistered = 'registered' + i;
		let classAdress = 'adress' + i;
		let classCity = 'location' + i;
		let classZipCode = 'zipcode' + i;
		let classBirthday = 'birthday' + i;
		let classCell = 'cell' + i;

		$('#content').append('<div class="card"><div class="card-header" role="tab" id='+idHeading+'><div class="row h-100 align-items-center mb-1 collapsed" data-toggle="collapse" data-target="#'+idBody+'" aria-expanded="false" aria-controls="'+idBody+'"><div class="col"><img src="" alt="avatar" class="avatar title-avatar '+classAvatarMedium+'"></div><div class="col" id="lastname"><span class='+classLastName+'></span></div><div class="col" id="firstname"><span class='+classFirstName+'></span></div><div class="col"><span class='+classUsername+'></span></div><div class="col"><span class='+classPhone+'></span></div><div class="col"><span class='+classLocation+'></span></div></div></div><div class="collapse" id='+idBody+' role="tabpanel" aria-labelledby='+idHeading+' data-parent="#accordion"><div class="card-body"><div class="row"><div class="body-firstname"><span class='+classFirstName+' id="name-style"></span><span class="body-icon" id='+idGenderIcon+'></span></div></div><div class="row"><div class="col-4 body-col-1"><span class="title-style">Username: </span><span class='+classUsername+'></span><br><span class="title-style">Registered: </span><span class='+classRegistered+'></span><br><span class="title-style">Email: </span><span class='+classEmail+'></span></div><div class="col"><span class="title-style">Adress: </span><span class='+classAdress+'></span><br><span class="title-style">City: </span><span class='+classCity+'></span><br><span class="title-style">Zip code: </span><span class='+classZipCode+'></span></div><div class="col"><span class="title-style">Birthday: </span><span class='+classBirthday+'></span><br><span class="title-style">Phone: </span><span class='+classPhone+'></span><br><span class="title-style">Cell: </span><span class='+classCell+'></span></div><div class="col"><img src="" alt="avatar" class="avatar body-avatar '+classAvatarLarge+'"></div></div></div></div></div>');

		if (i%2 == 0) {
			$("#"+idHeading).addClass("black-zone");
			$("#"+idBody).addClass("black-zone");
		} else {
			$("#"+idHeading).addClass("grey-zone");
			$("#"+idBody).addClass("grey-zone");
		}

		let avatarMedium = data[i].picture.medium;
		let avatarLarge = data[i].picture.large;
		let firstName = data[i].name.first;
		let lastName = data[i].name.last;
		let username = data[i].login.username;
		let phone = data[i].phone;
		let location = data[i].location.state;
		let email = data[i].email;
		let registered = formatDate(data[i].registered.date);
		let adress = data[i].location.street;
		let city = data[i].location.city;
		let zipcode = data[i].location.postcode;
		let birthday = formatDate(data[i].dob.date);
		let cell = data[i].cell;
		let gender = data[i].gender;

		if (gender == 'male') {
			$("#"+idGenderIcon).append('<i class="fas fa-mars fa-2x"></i>');
		} else {
			$("#"+idGenderIcon).append('<i class="fas fa-venus fa-2x"></i>');
		}

		$("."+classAvatarMedium).attr("src", avatarMedium);
		$("."+classAvatarLarge).attr("src", avatarLarge);
		$("."+classFirstName).text(firstName);
		$("."+classLastName).text(lastName);
		$("."+classUsername).text(username)
		$("."+classPhone).text(phone);
		$("."+classLocation).text(location);
		$("."+classEmail).text(email);
		$("."+classRegistered).text(registered);
		$("."+classAdress).text(adress);
		$("."+classCity).text(city);
		$("."+classZipCode).text(zipcode);
		$("."+classBirthday).text(birthday);
		$("."+classCell).text(cell);
	}
}
