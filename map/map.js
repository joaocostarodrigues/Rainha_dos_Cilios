(() => {
  const states = [
    ['BR-AC', 'Acre'], ['BR-AL', 'Alagoas'], ['BR-AP', 'Amapá'], ['BR-AM', 'Amazonas'],
    ['BR-BA', 'Bahia'], ['BR-CE', 'Ceará'], ['BR-DF', 'Distrito Federal'], ['BR-ES', 'Espírito Santo'],
    ['BR-GO', 'Goiás'], ['BR-MA', 'Maranhão'], ['BR-MT', 'Mato Grosso'], ['BR-MS', 'Mato Grosso do Sul'],
    ['BR-MG', 'Minas Gerais'], ['BR-PA', 'Pará'], ['BR-PB', 'Paraíba'], ['BR-PR', 'Paraná'],
    ['BR-PE', 'Pernambuco'], ['BR-PI', 'Piauí'], ['BR-RJ', 'Rio de Janeiro'], ['BR-RN', 'Rio Grande do Norte'],
    ['BR-RS', 'Rio Grande do Sul'], ['BR-RO', 'Rondônia'], ['BR-RR', 'Roraima'], ['BR-SC', 'Santa Catarina'],
    ['BR-SP', 'São Paulo'], ['BR-SE', 'Sergipe'], ['BR-TO', 'Tocantins']
  ];
  const stores = {
    'BR-MG': [
      { name: 'GL cílios Store', phone: '+55 (31) 99735-8220', address: 'R. José Caetano de Lima, 75 - Aleixa Ferreira, Sarzedo - MG' }
    ],
    'BR-RS': [
      { name: 'Eylash Shop', phone: '+55 (51) 99805-9856', address: 'R. Marquês do Herval, 320 - Sala 02 - Centro, Campo Bom - RS' }
    ],
    'BR-SC': [
      { name: 'Casa da Extensionista', phone: '+55 (49) 99828-9792', address: 'R. Barão do Rio Branco, 76e - Centro, Chapecó - SC' },
      { name: 'Casa dos Cílios', phone: '+55 (47) 99237-7330', address: 'R. São José do Cerrito, 108 - Petrópolis, Joinville - SC' },
      { name: 'Priscila Prestes Store', phone: '+55 (47) 99972-9044', address: 'R. Jovita Azevedo, 154 - Costa e Silva, Joinville - SC' },
      { name: 'GERALDO KMIECIK PAZ', phone: '+55 (47) 99965-6124', address: 'R. Max Eugenio Roberto Ziemann, 223 - Czerniewicz, Jaraguá do Sul - SC' }
    ]
  };

  const select = document.getElementById('state-select');
  const quick = document.getElementById('quick-states');
  const list = document.getElementById('store-list');
  const title = document.getElementById('active-state');
  const count = document.getElementById('result-count');
  const mapTitle = document.getElementById('map-active-state');
  const mapCount = document.getElementById('map-active-count');
  const mapStates = document.querySelectorAll('.brazil-svg .state');
  const whatsapp = 'https://wa.me/5548999632319?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20onde%20encontrar%20os%20produtos%20da%20Rainha%20dos%20C%C3%ADlios%20no%20meu%20estado.';
  const stateName = Object.fromEntries(states);
  let current = 'BR-SC';

  document.getElementById('total-states').textContent = Object.keys(stores).length;
  document.getElementById('total-stores').textContent = Object.values(stores).reduce((sum, entries) => sum + entries.length, 0);

  for (const [code, name] of states) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    select.append(option);
  }
  for (const code of ['BR-SC', 'BR-MG', 'BR-RS']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.state = code;
    button.textContent = `${stateName[code]} · ${stores[code].length}`;
    button.addEventListener('click', () => selectState(code));
    quick.append(button);
  }

  const line = (icon, content) => {
    const p = document.createElement('p');
    const symbol = document.createElement('span');
    symbol.setAttribute('aria-hidden', 'true');
    symbol.textContent = icon;
    p.append(symbol, document.createTextNode(content));
    return p;
  };

  function renderStores(code) {
    const entries = stores[code] || [];
    title.textContent = stateName[code];
    count.textContent = `${entries.length} ${entries.length === 1 ? 'unidade' : 'unidades'}`;
    mapTitle.textContent = stateName[code];
    mapCount.textContent = count.textContent;
    list.replaceChildren();
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      const heading = document.createElement('strong');
      heading.textContent = 'Ainda não há unidades cadastradas neste estado.';
      const description = document.createElement('p');
      description.textContent = 'Nossa rede está crescendo. Fale com a equipe para saber como adquirir os produtos.';
      const link = document.createElement('a');
      link.href = whatsapp;
      link.textContent = 'Falar com a Rainha dos Cílios ↗';
      empty.append(heading, description, link);
      list.append(empty);
      return;
    }
    for (const store of entries) {
      const card = document.createElement('article');
      card.className = 'store-card';
      const heading = document.createElement('h4');
      heading.textContent = store.name;
      const actions = document.createElement('div');
      actions.className = 'store-actions';
      const route = document.createElement('a');
      route.className = 'store-link';
      route.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
      route.target = '_blank';
      route.rel = 'noopener noreferrer';
      route.textContent = 'Ver rota ↗';
      const phone = document.createElement('a');
      phone.className = 'store-link';
      phone.href = `tel:${store.phone.replace(/[^\d+]/g, '')}`;
      phone.textContent = 'Ligar';
      actions.append(route, phone);
      card.append(heading, line('⌖', store.address), line('✆', store.phone), actions);
      list.append(card);
    }
  }

  function selectState(code) {
    if (!stateName[code]) return;
    current = code;
    select.value = code;
    quick.querySelectorAll('button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.state === code));
    });
    mapStates.forEach(state => {
      const active = state.dataset.state === code;
      state.classList.toggle('is-selected', active);
      state.setAttribute('aria-pressed', String(active));
    });
    renderStores(code);
  }
  select.addEventListener('change', () => selectState(select.value));
  mapStates.forEach(state => {
    if (stores[state.dataset.state]?.length) state.classList.add('has-stores');
    state.addEventListener('click', () => selectState(state.dataset.state));
    state.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectState(state.dataset.state);
      }
    });
  });
  selectState(current);
})();
