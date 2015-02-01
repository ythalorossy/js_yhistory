var historico = function () {
    'use strict';

    var historico = [
        {
            dataOperacao: '06/11/2014',
            operacao: 'INSERIR',
            acaoFiscal: '201400001',
            contribuinte: 'Alkinda SOARES DE ARAUJO',
            modalidade: 'AUDITORIA FISCAL PLENA',
            motivo: 'AÇÃO FISCAL POR SOLICITAÇÃO INTERNA OU EXTERNA',
            orgaoExecutor: 'NUCLEO SETORIAL DE COMBUSTIVEIS',
            duracaoAcao: '180',
            valorEsperado: '10000,00'
        },
        {
            dataOperacao: '07/11/2014',
            operacao: 'ATUALIZAR',
            duracaoAcao: '150'
        },
        {
            dataOperacao: '10/11/2014',
            operacao: 'ATUALIZAR',
            valorEsperado: '15000,00'
        },
    ];

    function clone(obj) {
        if (obj == null || typeof (obj) != 'object')
            return obj;
        var temp = new obj.constructor();
        for (var key in obj)
            temp[key] = clone(obj[key]);
        return temp;
    }
    
    var prepareView = function () {

        historicoView = []

        for (var i = 0; i <= historico.length - 1; i++) {

            if (i == 0) {
                historicoView[0] = clone(historico[0]);
                continue;
            }

            historicoView[i] = clone(historicoView[i - 1]);
            
            for (var prop in historico[i]) {
                historicoView[i][prop] = fillValueChanged(historicoView[i - 1][prop], historico[i][prop]);
            }
        }
    };

    function fillValueChanged (anterior, atual) {
        if (atual && anterior != atual) {
            return clone(atual);
        }
        
        return clone(anterior);
    }

    var historicoView = null;
    var current = 0;
    
    return {
        all: function () {
            return historico;
        },
        index: function (index) {
            return historico[index];
        },
        length: function () {
            return historico.length;
        },
        view: function () {
            if (historicoView == null)
                prepareView();

            return historicoView;
        }, 
        current: function () {
            return this.view()[current];
        },
        hasNext : function () {
            return current < this.length();
        },
        hasPrevious : function () {
            return current > 0;
        },
        next : function () {
            current += 1;
            return this.view()[current];
        },
        previous : function () {
            current -= 1;
            return this.view()[current];
        }
    };
}();