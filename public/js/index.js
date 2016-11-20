const now = new Date();
var startDate = new Date(now.getFullYear(), now.getMonth(), 1+1);
var endDate = new Date(now.getFullYear(), now.getMonth()+1, 0, 23, 59, 59, 999);

$(document).ready( function() {

	$('#dropdownMonthButton').dropdown( {
		inDuration: 300,
		outDuration: 225,
		constrain_width: true,
		hover: false,
		gutter: 0,
		belowOrigin: true,
		alignment: 'left'
	});

	var socket = io.connect('http://localhost:8888');

	socket.on('info', function(data) {
		Materialize.toast(data.message, 4000);
	});

	init(socket);
});

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
	var amountArray = (amount / 100).toFixed(2).toString().split(".");
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