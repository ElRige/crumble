var recurrences = [];

function init(socket) {

	$('.modal').modal();

	$('#add_recurrence').submit(function () {
		var operation = {
			label: document.getElementById('label').value,
			amount: document.getElementById('amount').value,
			dayOfMonth: document.getElementById('dayOfMonth').value,
			category: document.getElementById('category').value,
		}
		socket.emit('recurrence_add', operation);
	});

	socket.on('recurrences', function(data) {

		recurrences = recurrences.concat(data).sort(sortByDateDesc);
		var itemList = document.getElementById('recurrences');

		if (recurrences.length < 1) {
			toast('Aucune récurrence');
			itemList.innerHTML = '';
			return;
		}

		var tmpHtml= '';
		for (i in recurrences) {
			recurrences[i].dateStr = formatDateAsString(recurrences[i].dayOfMonth);
			recurrences[i].amountStr = formatAmount(recurrences[i].amount);
			tmpHtml += new EJS({url: '/template/line.ejs'}).render(recurrences[i]);
		}
		itemList.innerHTML = tmpHtml;
		$('#modal_add_recurrence').modal('close');

		setTimeout(function() {
			var tmp =$('#recurrences').children();
			for (i in tmp) {
				tmp[i].className = '';
			}
			for (i in recurrences) {
				recurrences[i].newItem = '';
			}
		}, 5000);
	});

}

function setCategories(data) {
	$('#category').autocomplete( {data: data} );
}