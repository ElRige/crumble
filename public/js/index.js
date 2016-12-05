const months = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décrembre' ];
var socket, startDate, endDate;

$(document).ready( function() {

	$('.button-collapse').sideNav();
	$('.dropdownMonthButton').dropdown({
		inDuration: 300,
		outDuration: 225,
		constrain_width: false,
		hover: true,
		gutter: 0,
		belowOrigin: true,
		alignment: 'left'
	});

	socket = io.connect('http://localhost:8888');

	socket.emit('categories_get');

	socket.on('info', function(data) {
		toast(data.message);
	});

	socket.on('categories', function(data) {
		setCategories(data);
	});

	init(socket);

	$('.dropdownMonthPrevious').click(function() { changeMonth('PREVIOUS') });
	$('.dropdownMonthNext').click(function() { changeMonth('NEXT') });
});

function toast(message) {
	Materialize.toast(message, 5000);
}

/* Utils */
function formatDigit(tmp, nb) {
	var str = tmp.toString();
	if (str.length < nb) {
		for (var i = 1; i < nb; i++) {
			str = '0' + str;
		}
	}
	return str;
}

function formatDateAsString(tmp) {
	var date = new Date(tmp);
	return formatDigit(date.getDate(), 2) + '/' + formatDigit((date.getMonth() + 1), 2)  + '/' + date.getFullYear();
}

function formatDateAsInternational(tmp) {
	var array = tmp.split('/');
	return new Date(array[2] + '-' + array[1] + '-' + array[0]);
}

function formatAmount(amount) {
	var unitStr = '';
	var amountArray = (amount / 100).toFixed(2).toString().split('.');
	for (var i = 0; i <= amountArray[0].length - 1; i++) {
		unitStr += amountArray[0][i];
		if (i%3 == 0 && i < amountArray[0].length -1) {
			unitStr+= ' ';
		}
	}
	return unitStr + ',' + amountArray[1] + '€';
}

function sortByDateDesc(a, b) {
	if (a.date > b.date) return -1;
	if (a.date < b.date) return 1;
	return 0;
}
/* !Utils */