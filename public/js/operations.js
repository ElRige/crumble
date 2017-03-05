var obj = {
    operations: [],
    startDate: null,
    endDate: null,
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    action: {
        getOperations: function () {
            obj.operations = [];
            restapi.operations.list(obj.startDate, obj.endDate, obj.event.operation, defaultError);
        },
        addOperation: function () {
            var operation = {
                label: $('#label')[0].value,
                amount: $('#amount')[0].value,
                date: useful.formatFrenchDateAsDate($('#date')[0].value),
                category: $('#category')[0].value,
            }
            restapi.operations.add(operation, obj.event.operation, defaultError);
        },
        updateOperation: function () {
            var operation = {
                label: $('#label')[0].value,
                amount: $('#amount')[0].value,
                date: useful.formatFrenchDateAsDate($('#date')[0].value),
                category: $('#category')[0].value,
            }
            restapi.operations.add(operation, obj.event.operation, defaultError);
        },
        deleteOperation: function () {
            var operation = {
                label: $('#label')[0].value,
                amount: $('#amount')[0].value,
                date: useful.formatFrenchDateAsDate($('#date')[0].value),
                category: $('#category')[0].value,
            }
            restapi.operations.add(operation, obj.event.operation, defaultError);
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

    event: {
        operation: function (json) {
            if (!Array.isArray(json)) {
                json.newItem = true;
            }
            obj.operations = obj.operations.concat(json).sort(useful.sortDescBy('date'));
            obj.display.operations();
        }
    },

    display: {
        operations: function (isNew) {

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
                op.newItem = op.newItem ? true : false;
                tmpHtml += new EJS({ url: '/template/line.ejs' }).render(op);
            }
            $('#balance')[0].innerHTML = useful.formatAmount(balance);
            itemList.innerHTML = tmpHtml;
            $('#modal-operation').modal('close');

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

    $('#modal-operation').modal({
        ready: function (e) {
            var title = 'Ajouter une opération';
            var confirm = 'Ajouter';

            if ($('.modal-operation')[0].getAttribute('data-uuid') !== '0') {
                title = 'Modifier une opération';
                confirm = 'Modifier';
                document.getElementById('modal-operation-delete').style.display = 'inline-block';
            }

            document.getElementById('modal-operation-title').innerHTML = title;
            document.getElementById('modal-operation-save').innerHTML = confirm + ' <i class="material-icons right">send</i>';
        }
    });


    $('select').material_select();

    obj.action.setMonth(obj.month);
    obj.action.getOperations();

    document.getElementById('modal-operation-save').addEventListener('click', obj.action.addOperation, false);
    document.getElementById('modal-operation-delete').addEventListener('click', obj.action.deleteOperation, false);
}

/*
function setCategories(data) {
    $('#category').autocomplete({ data: data });
}
*/