var operations = [];

function init(socket) {

	$('.modal').modal();
	$('select').material_select();

	$('#add_operation').submit(function () {
		var date = formatDateAsInternational($('#date')[0].value);
		var operation = {
			label: $('#label')[0].value,
			amount: $('#amount')[0].value,
			date: date,
			category: $('#category')[0].value,
		}
		socket.emit('operation_add', operation);
	});

	socket.on('operations', function(data) {

		operations = operations.concat(data).sort(sortByDateDesc);
		if (operations.length < 1) {
			toast('Aucune opération ce mois');
			$('#balance')[0].innerHTML = '';
			fillOperations('');
			return;
		}
		var tmpHtml= '', balance = 0;
		for (i in operations) {
			balance += operations[i].amount;
			operations[i].dateStr = formatDateAsString(operations[i].date);
			operations[i].amountStr = formatAmount(operations[i].amount);
			tmpHtml += new EJS({url: '/template/operation.ejs'}).render(operations[i]);
		}
		$('#balance')[0].innerHTML = formatAmount(balance);
		fillOperations(tmpHtml);
		$('#modal_add_operation').modal('close');
		setTimeout(function() {
			var tmp =$('#operations').children();
			for (i in tmp) { tmp[i].className = ''; }
		}, 5000);
	});
}

function fillOperations(htmlData) {
	var operationsDiv = document.getElementById('operations');
	//var div = document.createElement('div');
	operationsDiv.innerHTML = htmlData;
	//operationsDiv.appendChild(div);
}

function setMonth() {
	operations = [];
	socket.emit('operations_get', {startDate:startDate, endDate:endDate});
}

function setCategories(data) {
	$('#category').autocomplete( {data: data} );
}