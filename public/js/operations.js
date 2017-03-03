var obj = {
    operations: [],
    startDate: null,
    endDate: null,
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    action: {
        getOperations: function () {
            obj.operations = [];
            var success = function (json) {
                console.log(json);
                obj.operations = obj.operations.concat(json.operations).sort(sortDescBy('date'));
                obj.display.operations();
            };
            restapi.operations.list(obj.startDate, obj.endDate, success, defaultError);
        },
        addOperation: function () {
            var operation = {
                label: $('#label')[0].value,
                amount: $('#amount')[0].value,
                date: useful.formatDateAsInternational($('#date')[0].value),
                category: $('#category')[0].value,
            }
            restapi.operations.add(operation, addOperationSuccess, defaultError);
        },
        setMonth: function (data) {
            switch (data) {
                case 'PREVIOUS':
                    obj.month.setMonth(obj.month.getMonth() - 1);
                    break;
                case 'NEXT':
                    obj.month.setMonth(obj.month.getMonth() + 1);
                    break;
                default:
                    obj.month = data;
                    break;
            }
            obj.startDate = new Date(obj.month);
            obj.endDate = new Date(obj.month.getFullYear(), obj.month.getMonth() + 1, 0, 23, 59, 59, 999);
        }
    },

    display: {
        operations: function () {

            var itemList = document.getElementById('operations');

            if (obj.operations.length < 1) {
                toast('Aucune opération ce mois');
                $('#balance')[0].innerHTML = '';
                itemList.innerHTML = '';
                return;
            }

            var tmpHtml = '', balance = 0;
            for (i in obj.operations) {
                var op = obj.operations[i];
                balance += op.amount;
                op.dateStr = useful.formatDateAsString(op.date);
                op.amountStr = useful.formatAmount(op.amount);
                tmpHtml += new EJS({ url: '/template/line.ejs' }).render(op);
            }
            $('#balance')[0].innerHTML = useful.formatAmount(balance);
            itemList.innerHTML = tmpHtml;
            $('#modal_add_operation').modal('close');

            setTimeout(function () {
                var tmp = $('#operations').children();
                for (i in tmp) {
                    tmp[i].className = '';
                }
                for (i in obj.operations) {
                    obj.operations[i].newItem = '';
                }
            }, 5000);

        }
    }
};

function init() {

    $('.modal').modal();
    $('select').material_select();

    obj.action.setMonth(obj.month);
    obj.action.getOperations();
}

/*
function setCategories(data) {
    $('#category').autocomplete({ data: data });
}
*/