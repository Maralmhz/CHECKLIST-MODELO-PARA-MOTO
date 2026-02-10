(function () {
  function gerarNumeroOS() {
    const placa = (document.getElementById('placa')?.value || 'OS')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();

    const dataRaw = document.getElementById('data')?.value;
    const dataObj = dataRaw ? new Date(dataRaw + 'T00:00:00') : new Date();
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());

    return `${placa}${dia}${mes}${ano}`;
  }

  function atualizarBarraOS() {
    const os = gerarNumeroOS();
    const el = document.getElementById('barraFixaOS');
    if (el) el.textContent = os;
  }

  function atualizarResumoOS() {
    const logoSrc = document.getElementById('logo-oficina')?.src;
    if (logoSrc) document.getElementById('logoResumo').src = logoSrc;

    document.getElementById('nomeOficinaResumo').textContent = document.getElementById('nome-oficina')?.textContent || 'OFICINA';
    document.getElementById('enderecoOficinaResumo').textContent = document.getElementById('endereco-oficina')?.textContent || '';
    document.getElementById('telefoneOficinaResumo').textContent = document.getElementById('telefone-oficina')?.textContent || '';
    document.getElementById('cnpjOficinaResumo').textContent = document.getElementById('cnpj-oficina')?.textContent || 'CNPJ da oficina';

    document.getElementById('osNumero').textContent = gerarNumeroOS();

    const logoResumo2 = document.getElementById('logoResumo2');
    const nomeOficinaResumo2 = document.getElementById('nomeOficinaResumo2');
    const enderecoOficinaResumo2 = document.getElementById('enderecoOficinaResumo2');
    const telefoneOficinaResumo2 = document.getElementById('telefoneOficinaResumo2');
    const cnpjOficinaResumo2 = document.getElementById('cnpjOficinaResumo2');
    const osNumero2 = document.getElementById('osNumero2');

    if (logoResumo2 && document.getElementById('logoResumo')) {
      logoResumo2.src = document.getElementById('logoResumo').src;
    }
    if (nomeOficinaResumo2 && document.getElementById('nomeOficinaResumo')) {
      nomeOficinaResumo2.textContent = document.getElementById('nomeOficinaResumo').textContent;
    }
    if (enderecoOficinaResumo2 && document.getElementById('enderecoOficinaResumo')) {
      enderecoOficinaResumo2.textContent = document.getElementById('enderecoOficinaResumo').textContent;
    }
    if (telefoneOficinaResumo2 && document.getElementById('telefoneOficinaResumo')) {
      telefoneOficinaResumo2.textContent = document.getElementById('telefoneOficinaResumo').textContent;
    }
    if (cnpjOficinaResumo2 && document.getElementById('cnpjOficinaResumo')) {
      cnpjOficinaResumo2.textContent = document.getElementById('cnpjOficinaResumo').textContent;
    }
    if (osNumero2 && document.getElementById('osNumero')) {
      osNumero2.textContent = document.getElementById('osNumero').textContent;
    }

    // Dados do cliente
    document.getElementById('rNomeCliente').textContent = document.getElementById('nomecliente')?.value || '-';
    document.getElementById('rCelular').textContent = document.getElementById('celular')?.value || '-';

    // Dados da moto
    document.getElementById('rModelo').textContent = document.getElementById('modelo')?.value || '-';
    document.getElementById('rPlaca').textContent = (document.getElementById('placa')?.value || '-').toUpperCase();
    const kmEntrada = document.getElementById('kmentrada')?.value || '';
    document.getElementById('rKmEntrada').textContent = kmEntrada ? `${kmEntrada} km` : '-';

    // Serviços solicitados
    document.getElementById('rServicos').textContent = document.getElementById('servicos')?.value || '-';

    // Observações
    const obs = document.getElementById('obsInspecao')?.value || '-';
    const rObs = document.getElementById('rObsInspecao');
    if (rObs) rObs.textContent = obs;

    // Checklist de inspeção (marcacoes)
    const areaBadges = document.getElementById('rChecklistBadges');
    areaBadges.innerHTML = '';

    if (window.marcacoes && Object.keys(window.marcacoes).length > 0) {
      Object.entries(window.marcacoes).forEach(([item, estado]) => {
        const span = document.createElement('span');
        const ehRuim = ['RUIM', 'QUEBRADO', 'DANIFICADO', 'CARECA', 'EMPENADA', 'TRINCADA', 'TRAVANDO', 'ACABADAS', 'EMPENADO', 
                        'FROUXA', 'RESSECADA', 'DENTES QUEBRADOS', 'FROUXO', 'SEM FUNCIONAR', 'FRACA', 'DESCARREGADA', 
                        'NÃO FUNCIONA', 'COM DEFEITO', 'APAGADO', 'EMENDAS', 'EXPOSTA', 'VAZANDO', 'TRAVADA', 'COM FOLGA',
                        'DESGASTADO', 'DESGASTADAS', 'RISCADO', 'RASGADAS', 'RASGADO', 'BAIXO', 'VAZIO', 'LEVE', 'SEVERO',
                        'BARULHENTO', 'FURADO', 'DIFICULDADE', 'NÃO LIGA', 'AMASSADO', 'NÃO TEM'].includes(estado);
        
        span.className = ehRuim ? 'os-badge no' : 'os-badge ok';
        const itemFormatado = item.replace(/_/g, ' ').toUpperCase();
        span.innerHTML = ehRuim ? `⚠️ ${itemFormatado}: ${estado}` : `✅ ${itemFormatado}: ${estado}`;
        areaBadges.appendChild(span);
      });
    } else {
      areaBadges.innerHTML = '<span style="color:#999; font-size:11px;">Nenhum item inspecionado/marcado.</span>';
    }

    // PEÇAS - Buscar do array window.pecas
    const destinoPecas = document.getElementById('rTabelaPecas');
    destinoPecas.innerHTML = '';

    if (window.pecas && window.pecas.length > 0) {
      destinoPecas.innerHTML = '<thead><tr><th>Descrição</th><th style="text-align:right;">Valor</th></tr></thead><tbody>';
      window.pecas.forEach(peca => {
        destinoPecas.innerHTML += `<tr><td>${peca.descricao}</td><td style="text-align:right;">R$ ${peca.valor.toFixed(2)}</td></tr>`;
      });
      destinoPecas.innerHTML += '</tbody>';
    } else {
      destinoPecas.innerHTML = '<tr><td colspan="2" style="color:#999; text-align:center;">Nenhuma peça adicionada</td></tr>';
    }

    // SERVIÇOS - Buscar do array window.servicos
    const destinoServicos = document.getElementById('rTabelaServicos');
    destinoServicos.innerHTML = '';

    if (window.servicos && window.servicos.length > 0) {
      destinoServicos.innerHTML = '<thead><tr><th>Descrição</th><th style="text-align:right;">Valor</th></tr></thead><tbody>';
      window.servicos.forEach(servico => {
        destinoServicos.innerHTML += `<tr><td>${servico.descricao}</td><td style="text-align:right;">R$ ${servico.valor.toFixed(2)}</td></tr>`;
      });
      destinoServicos.innerHTML += '</tbody>';
    } else {
      destinoServicos.innerHTML = '<tr><td colspan="2" style="color:#999; text-align:center;">Nenhum serviço adicionado</td></tr>';
    }

    // TOTAIS
    const totalPecasCalc = window.pecas ? window.pecas.reduce((sum, p) => sum + p.valor, 0) : 0;
    const totalServicosCalc = window.servicos ? window.servicos.reduce((sum, s) => sum + s.valor, 0) : 0;
    const totalGeralCalc = totalPecasCalc + totalServicosCalc;

    const rTotalPecas = document.getElementById('rTotalPecas');
    const rTotalServicos = document.getElementById('rTotalServicos');
    const rTotalGeral = document.getElementById('rTotalGeral');

    if (rTotalPecas) rTotalPecas.textContent = 'R$ ' + totalPecasCalc.toFixed(2);
    if (rTotalServicos) rTotalServicos.textContent = 'R$ ' + totalServicosCalc.toFixed(2);
    if (rTotalGeral) rTotalGeral.textContent = 'R$ ' + totalGeralCalc.toFixed(2);
  }

  function imprimirResumo() {
    atualizarResumoOS();
    window.print();
  }

  function gerarPDFResumo() {
    atualizarResumoOS();
    const elemento = document.getElementById('resumoContainer');

    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'OS-' + (document.getElementById('placa')?.value?.toUpperCase() || 'MOTO') + '_CHECKLIST.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        backgroundColor: '#ffffff',
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: 'css', legacy: true }
    };

    html2pdf().set(opt).from(elemento).save();
  }

  document.addEventListener('input', e => {
    if (e.target.id === 'placa' || e.target.id === 'data') {
      atualizarBarraOS();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    atualizarBarraOS();
  });

  window.gerarNumeroOS = gerarNumeroOS;
  window.atualizarResumoOS = atualizarResumoOS;
  window.imprimirResumo = imprimirResumo;
  window.gerarPDFResumo = gerarPDFResumo;
})();
