// Função para validar o número do cartão usando o algoritmo de Luhn
function validarLuhn(numero) {
    let soma = 0;
    let alternar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
        let n = parseInt(numero[i], 10);
        if (alternar) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        soma += n;
        alternar = !alternar;
    }
    return soma % 10 === 0;
}

// Função para identificar a bandeira do cartão
function identificarBandeira(numero) {
    const bandeiras = [
        { nome: "MasterCard", regex: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/ },
        { nome: "Visa", regex: /^4[0-9]{12}(?:[0-9]{3})?$/ },
        { nome: "American Express", regex: /^3[47][0-9]{13}$/ },
        { nome: "Diners Club", regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
        { nome: "Discover", regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
        { nome: "EnRoute", regex: /^(2014|2149)[0-9]{11}$/ },
        { nome: "JCB", regex: /^(?:2131|1800|35\d{3})\d{11}$/ },
        { nome: "Voyager", regex: /^8699[0-9]{11}$/ },
        { nome: "HiperCard", regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/ },
        { nome: "Aura", regex: /^50[0-9]{14,17}$/ }
    ];

    for (const bandeira of bandeiras) {
        if (bandeira.regex.test(numero)) {
            return bandeira.nome;
        }
    }
    return "Bandeira desconhecida";
}

// Função principal: valida e identifica a bandeira
function validarCartao(numero) {
    const apenasNumeros = numero.replace(/\D/g, '');
    const valido = validarLuhn(apenasNumeros);
    const bandeira = identificarBandeira(apenasNumeros);
    return { valido, bandeira };
}

// Exemplo de uso:
const resultado = validarCartao('4111111111111111');
console.log(resultado); // { valido: true, bandeira: 'Visa' }