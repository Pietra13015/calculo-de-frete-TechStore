/**
 * Calcula a taxa de desconto com base na forma de pagamento escolhida.
 * @param {string} formaPagamento - A chave da forma de pagamento selecionada.
 * @returns {number} O percentual de desconto expresso em decimal (ex: 0.15 para 15%).
 */
function calcularDescontoPagamento(formaPagamento) {
    let desconto = 0;
    switch (formaPagamento) {
        case 'pix':
            desconto = 0.15;
            break;
        case 'boleto':
            desconto = 0.10;
            break;
        case 'cartao-vista':
            desconto = 0.05;
            break;
        case 'cartao-parcelado':
            desconto = 0.0;
            break;
        default:
            desconto = 0.0;
    }
    return desconto;
}

/**
 * Calcula o valor do frete com base na modalidade de entrega escolhida.
 * @param {string} tipoEntrega - A chave da modalidade de entrega selecionada.
 * @returns {number} O valor monetário correspondente ao frete.
 */
function calcularValorEntrega(tipoEntrega) {
    let valorFrete = 0;
    switch (tipoEntrega) {
        case 'retirada':
            valorFrete = 0.0;
            break;
        case 'padrao':
            valorFrete = 12.0;
            break;
        case 'expressa':
            valorFrete = 25.0;
            break;
        case 'super-expressa':
            valorFrete = 45.0;
            break;
        default:
            valorFrete = 0.0;
    }
    return valorFrete;
}

/**
 * Formata um valor numérico para o padrão de moeda Real brasileiro (R$).
 * @param {number} valor - O valor numérico a ser formatado.
 * @returns {string} O valor formatado como string em Reais.
 */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Manipulação do evento submit do formulário e atualização do DOM
document.addEventListener('DOMContentLoaded', () => {
    const formOrcamento = document.getElementById('form-orcamento');
    const painelResultado = document.getElementById('painel-resultado');

    formOrcamento.addEventListener('submit', function(event) {
        // Evita o recarregamento padrão da página
        event.preventDefault();

        // Captura os dados inseridos pelo usuário
        const valorProduto = parseFloat(document.getElementById('valor-produto').value);
        const formaPagamento = document.getElementById('forma-pagamento').value;
        const tipoEntrega = document.getElementById('tipo-entrega').value;

        // Executa as regras de negócio
        const taxaDesconto = calcularDescontoPagamento(formaPagamento);
        const valorDesconto = valorProduto * taxaDesconto;
        const valorFrete = calcularValorEntrega(tipoEntrega);

        // Calcula o valor total final
        const totalFinal = (valorProduto - valorDesconto) + valorFrete;

        // Atualiza os elementos do DOM com os resultados formatados
        document.getElementById('res-produto').textContent = formatarMoeda(valorProduto);
        document.getElementById('res-desconto').textContent = formatarMoeda(valorDesconto);
        document.getElementById('res-frete').textContent = formatarMoeda(valorFrete);
        document.getElementById('res-total').textContent = formatarMoeda(totalFinal);

        // Exibe o painel de resultado removendo a classe 'hidden'
        painelResultado.classList.remove('hidden');
    });
});