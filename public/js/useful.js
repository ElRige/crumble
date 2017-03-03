var useful = {

    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décrembre'],

    formatDigit: function (tmp, nb) {
        var str = tmp.toString();
        if (str.length < nb) {
            for (var i = 1; i < nb; i++) {
                str = '0' + str;
            }
        }
        return str;
    },

    formatDateAsString: function (tmp) {
        var date = new Date(tmp);
        return formatDigit(date.getDate(), 2) + '/' + formatDigit((date.getMonth() + 1), 2) + '/' + date.getFullYear();
    },

    formatDateAsInternational: function (tmp) {
        var array = tmp.split('/');
        return new Date(array[2] + '-' + array[1] + '-' + array[0]);
    },

    formatAmount: function (amount) {
        var unitStr = '';
        var amountArray = (amount / 100).toFixed(2).toString().split('.');
        for (var i = 0; i <= amountArray[0].length - 1; i++) {
            unitStr += amountArray[0][i];
            if (i % 3 == 0 && i < amountArray[0].length - 1) {
                unitStr += ' ';
            }
        }
        return unitStr + ',' + amountArray[1] + '€';
    },

    sortDescBy: function (param) {
        return function (a, b) {
            if (a[param] > b[param]) return -1;
            if (a[param] < b[param]) return 1;
            return 0;
        }
    },

}