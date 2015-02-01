var History = function() {
	'use strict';
	return function(dSource) {
		var dataSource = dSource, 
		result = [], 
		current = 0;
		
		// Clona objeto
		function clone(obj) {
			if (obj === null || typeof (obj) !== 'object') {
				return obj;
			}
			var temp = new obj.constructor();
			for ( var key in obj) {
				temp[key] = clone(obj[key]);
			}
			return temp;
		}

		/*
		 * Verifica se o objeto "current" é diferente do "previous", caso seja,
		 * retorna um clone do "current". O clone é necessário para evitar a 
		 * referência com o objeto anterior.
		 */ 
		function fillValueChanged(previous, current) {
			
			var changed = (current && previous != current) ? true : false;
			
			return {
				changed: changed,
				value: (changed) ? clone(current) : clone(previous) 
			};
			
			/*
			if (current && previous != current) {
				return {
					changed: true,
					value: clone(current)
				};
			}
			return {
					changed : false,
					value : clone(previous)
			};
			*/
		}
		
		/*
		 * Prepara a lista resultante com todos os campos atualizados
		 */
		var prepareResult = function() {
			
			// Navega em todos os itens da lista 'dataSource'
			for ( var i = 0; i <= dataSource.length - 1; i++) {
				
				// Apenas adiona o primeiro a lista 
				if (i == 0) {
                    
                    var aux = {};
                    
                    for (var prop in dataSource[0]) {
                        aux[prop] = fillValueChanged(dataSource[0][prop], dataSource[0][prop]);
                    }
                    
					result[0] = aux;
					continue;
				}
				
				// Sempre atualiza a posição atual da lista resultante com a posição anterior
				result[i] = clone(result[i - 1]);
				
				// Pega o item atual do dataSource e compara com o recém criado na resultante
				for ( var prop in dataSource[i]) {
					result[i][prop] = fillValueChanged(result[i - 1][prop], dataSource[i][prop]);
				}
			}
		};

		return {
			all : function() {
				return dataSource;
			},
			index : function(index) {
				return dataSource[index];
			},
			length : function() {
				return dataSource.length;
			},
			view : function() {
				if (result.length == 0)
					prepareResult();
				return result;
			},
			current : function() {
				if (result.length == 0)
					prepareResult();
				return result[current];
			},
			hasNext : function() {
				return current < dataSource.length - 1;
			},
			hasPrevious : function() {
				return current > 0;
			},
			next : function() {
				current += 1;
				return result[current];
			},
			previous : function() {
				current -= 1;
				return result[current];
			}
		};
	};
}();