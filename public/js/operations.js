var operations = [];
var month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

function init() {

    $('.modal').modal();
    $('select').material_select();

    changeMonth(month);

    $('#add_operation').submit(function () {
        var date = formatDateAsInternational($('#date')[0].value);
        var operation = {
            label: $('#label')[0].value,
            amount: $('#amount')[0].value,
            date: date,
            category: $('#category')[0].value,
        }
        //socket.emit('operation_add', operation);
    });

    var callback = function (json) {
        console.log(json);
    }
    restapi.operations.list(callback, defaultError);

	/*
	socket.on('operations', function(data) {

		operations = operations.concat(data).sort(sortByDateDesc);
		var itemList = document.getElementById('operations');
		
		if (operations.length < 1) {
			toast('Aucune opération ce mois');
			$('#balance')[0].innerHTML = '';
			itemList.innerHTML = '';
			return;
		}

		var tmpHtml= '', balance = 0;
		for (i in operations) {
			balance += operations[i].amount;
			operations[i].dateStr = formatDateAsString(operations[i].date);
			operations[i].amountStr = formatAmount(operations[i].amount);
			tmpHtml += new EJS({url: '/template/line.ejs'}).render(operations[i]);
		}
		$('#balance')[0].innerHTML = formatAmount(balance);
		itemList.innerHTML = tmpHtml;
		$('#modal_add_operation').modal('close');

		setTimeout(function() {
			var tmp =$('#operations').children();
			for (i in tmp) {
				tmp[i].className = '';
			}
			for (i in operations) {
				operations[i].newItem = '';
			}
		}, 5000);
	});
	*/
}

function changeMonth(data) {

    switch (data) {
        case 'PREVIOUS':
            month.setMonth(month.getMonth() - 1);
            break;
        case 'NEXT':
            month.setMonth(month.getMonth() + 1);
            break;
        default:
            month = data;
            break;
    }
    startDate = new Date(month);
    endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999);
    for (i in $('.dropdownMonthTitle')) {
        $('.dropdownMonthTitle')[i].innerHTML = months[month.getMonth()] + ' ' + month.getFullYear();
    }
    setMonth();
}

function setMonth() {
    operations = [];
    //socket.emit('operations_get', {startDate:startDate, endDate:endDate});
}

function setCategories(data) {
    $('#category').autocomplete({ data: data });
}