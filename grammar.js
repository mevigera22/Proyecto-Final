// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require('moo');

    let lexer = moo.compile({
      WS:      /[ \t]+/,
      comment: /\/\/.*?$/,
      number:  /0|[1-9][0-9]*/,
      string:  /"(?:\\["\\]|[^\n"\\])*"/,
      lparen:  '(',
      rparen:  ')',
      lbrace:  '{',
      rbrace:  '}',
      lcorch:  '[',
      rcorch:  ']',
      incrementos_decrementos: ["++", "--"],
      comparaciones: [">", "<", ">=", "<=", "==","!="],
      operador: ["+","-","*","/","x","÷"],
      PalabrasReservadas: ['$', 'mientras', 'durante', 'haz'],
      keyword: ['si', 'sino', 'sino si'],
      boolean: ['true','false'],
      myNull: ['null'],
      identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
      fatarrow: "=>",
      assign: "=",
      endline: ";",
      coma: ",",
      NL: {match: /[\r\n]+/, lineBreaks: true},
    }); 
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": ["_", "statement", "n", "_"], "postprocess": 
        (d) => {
            return [d[1]];
        }
                },
    {"name": "statements", "symbols": ["_", "statement", "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements"], "postprocess": 
        (d) => {
            return [d[1], ...d[4] ]
        }
                },
    {"name": "statement", "symbols": ["var_assign", "_", {"literal":";"}], "postprocess": id},
    {"name": "statement", "symbols": ["print", "_", {"literal":";"}], "postprocess": id},
    {"name": "statement", "symbols": ["condicional_si"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["do_while"], "postprocess": id},
    {"name": "statement", "symbols": ["for_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["operadores_esp", "_", {"literal":";"}], "postprocess": id},
    {"name": "expr", "symbols": ["expresion_unaria"], "postprocess": id},
    {"name": "expr", "symbols": ["expresion_binaria"], "postprocess": id},
    {"name": "condicional_si", "symbols": [{"literal":"si"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess":  
        (d) => {
            return {
                    type: "condicional_si",
                    tipo_keyword: d[0],
                    condicion:d[4],
                    instrucciones:d[11]
                }
            }
        },
    {"name": "condicional_si", "symbols": [{"literal":"si"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}, {"literal":"sino"}, {"literal":"{"}, "_", "statements", "_", {"literal":"}"}], "postprocess":  
        (d) => {
            return {
                    type: "condicional_sino",
                    tipo_keyword1: d[0],
                    condicion:d[4],
                    instrucciones1: d[11],
                    tipo_keyword2: d[15],
                    instrucciones2: d[18]
                }
            }
        },
    {"name": "while_loop", "symbols": [{"literal":"mientras"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess": 
        (d)=> { return{
            type: "while_loop",
            instrucciones: d[11],
            condicion1: d[4]
            } 
        }
            },
    {"name": "do_while", "symbols": [{"literal":"haz"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}, {"literal":"mientras"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}], "postprocess": 
        (d)=> { return{
            type: "do_while",
            instrucciones: d[4],
            condicion1: d[12]
            } 
        }
            },
    {"name": "for_loop", "symbols": [{"literal":"durante"}, "_", {"literal":"("}, "_", "var_assign", "_", {"literal":";"}, "_", "comparacion", "_", {"literal":";"}, "_", "operadores_esp", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess": 
        (d)=> { return{
            type: "for_loop",
            condicion1: d[4],
            condicion2: d[8],
            condicion3: d[12],
            instrucciones: d[19]
        } 
        }
            },
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "comparacion", "symbols": ["comparacion$subexpression$1", "_", (lexer.has("comparaciones") ? {type: "comparaciones"} : comparaciones), "_", "expresion_unaria"], "postprocess": 
        (d)=> { return{
            type: "comparacion",
            valor1: d[0],
            valor2: d[4]
        }
        }
            },
    {"name": "expresion_unaria", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("boolean") ? {type: "boolean"} : boolean)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("myNull") ? {type: "myNull"} : myNull)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": ["array"], "postprocess": id},
    {"name": "ecuacion", "symbols": ["value"], "postprocess": id},
    {"name": "ecuacion", "symbols": ["expresion_binaria"], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expresion_binaria", "symbols": ["value", "_", (lexer.has("operador") ? {type: "operador"} : operador), "_", "ecuacion"], "postprocess":  (d)=> {
            return {
                type: "expresion_binaria",
                valor1: d[0],
                operador: d[2],
                valor2: d[0]
            }
        } },
    {"name": "array", "symbols": [{"literal":"["}, "_", "array_items", "_", {"literal":"]"}], "postprocess": (data) => data[2]},
    {"name": "array", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => []},
    {"name": "array_items", "symbols": ["expresion_unaria"], "postprocess": (data) => [data[0]]},
    {"name": "array_items", "symbols": ["expresion_unaria", "_", {"literal":","}, "_", "array_items"], "postprocess": (data) => [data[0], ...data[4]]},
    {"name": "operadores_esp", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"++"}]},
    {"name": "operadores_esp", "symbols": [{"literal":"++"}, (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "operadores_esp", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"--"}]},
    {"name": "operadores_esp", "symbols": [{"literal":"--"}, (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "var_assign", "symbols": [{"literal":"$"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr"], "postprocess":  
        (d) => {
            return {
                        type: "var_assign",
                        var_name:d[2],
                        value:d[6]
                    }
                }
        },
    {"name": "print", "symbols": [{"literal":"print"}, {"literal":"("}, "_", "expr", "_", {"literal":")"}], "postprocess":  
        (d) => {
            return {
                        type: "print",
                        text: d[3]
                    }
                }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "n$ebnf$1", "symbols": []},
    {"name": "n$ebnf$1", "symbols": ["n$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n", "symbols": ["n$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
