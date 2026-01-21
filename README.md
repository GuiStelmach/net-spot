<div align="center">
  <img alt="Net Spot" src="frontend/assets/images/net-spot-lite.png" width="280px" />
  
  

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen.svg)](#)
  [![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](#)
  
  **Plataforma de consulta unificada de cobertura de internet fibra**
  
</div>

---

## 📋 Sobre o Projeto

**Net Spot** é uma aplicação web moderna e responsiva desenvolvida para otimizar consultas de viabilidade de internet fibra em múltiplas operadoras brasileiras. A plataforma foi construída com foco em eficiência operacional, permitindo que equipes de vendas realizem consultas consolidadas sem necessidade de acessar sistemas de cada operadora separadamente.

### 🎯 Objetivo Principal

Unificar e simplificar o processo de consulta de cobertura de internet fibra, reduzindo drasticamente o tempo despendido em cada pesquisa e aumentando a produtividade das equipes comerciais.

---

## ✨ Funcionalidades

- ✅ **Consulta Unificada** - Busca simultânea em múltiplas operadoras
- ✅ **Validação em Tempo Real** - Validação de CEP e número do endereço
- ✅ **Interface Intuitiva** - Design responsivo e acessível
- ✅ **Sistema de Notificações** - Alertas visuais com fila de notificações
- ✅ **Dark Mode** - Tema claro e escuro com persistência de preferência
- ✅ **Sem Banco de Dados** - Arquitetura simples e escalável
- ✅ **API Integration** - Integração com APIs confiáveis do MelhorPlano

- ✅ **Consulta Massiva (Extração em massa)** - Processamento em lote via upload de arquivos CSV/TXT para executar consultas sequenciais.
- ✅ **Export de Resultados (CSV/JSON)** - Exportação dos resultados processados nos formatos CSV e JSON (download disponível após processamento).

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com variáveis e animações
- **JavaScript (ES6+)** - Lógica de aplicação
- **Font Awesome 6** - Ícones vetoriais

### Backend
- **JavaScript (Node.js)** - Manipulação de APIs

### Integrações
- **MelhorPlano API** - Consulta de cobertura de internet

---

## 🚀 Como Usar

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/GuiStelmach/net-spot.git
   cd net-spot
   ```

2. **Abra no navegador**
   ```bash
   # Abra o arquivo index.html no seu navegador favorito
   # Ou use um servidor local (recomendado)
   ```

### Fluxo de Uso

1. **Preenchimento de Dados**
   - Insira o CEP do endereço (8 dígitos)
   - Insira o número do endereço
   - Selecione as operadoras desejadas (ou desmarque todas para busca mais ampla)

2. **Execução da Consulta**
   - Clique em "Consultar"
   - Aguarde o processamento (máx. 20 segundos)

3. **Análise de Resultados**
   - Visualize quais operadoras têm cobertura disponível
   - Informações consolidadas com endereço completo

---

## 📁 Estrutura do Projeto

```
net-spot/
├── frontend/
│   ├── assets/
│   │   ├── fonts/          # Fontes customizadas (Outfit)
│   │   └── images/         # Logos e assets visuais
│   ├── pages/              # (geralmente não utilizada)
│   │   └── index.html      # Página alternativa (removida)
│   └── style/
│       └── index.css       # Estilos globais e dark mode
├── backend/
│   ├── api/
│   │   ├── api.js          # Integração com MelhorPlano API
│   │   └── provider.js     # Processamento de provedores
│   └── formValidate/
│       ├── formValidation.js      # Validação e submissão
│       ├── validateZipcode.js     # Validação de CEP
│       ├── validateNumber.js      # Validação de número
│       └── themeToggle.js         # Sistema de dark mode
├── index.html              # Página principal
├── package.json            # Metadados do projeto
└── README.md              # Este arquivo
```

---

## 🎨 Recursos Avançados

### Dark Mode
- **Toggle Visual** - Botão fixo no canto superior esquerdo
- **Persistência** - Preferência salva no localStorage
- **Respeita Sistema** - Detecta preferência do SO do usuário
- **Transições Suaves** - Animações de 0.3s entre temas

### Sistema de Notificações
- **Fila Inteligente** - Múltiplos alertas empilhados
- **Timeouts Independentes** - Cada alerta com duração própria (5s)
- **Animações** - Slide-in/slide-out com easing
- **Tipos Variados** - Success, Info, Warning e Error

### Validações
- ✓ CEP apenas numérico (máx. 8 dígitos)
- ✓ Número apenas numérico
- ✓ Feedback em tempo real ao usuário

---

## 🔌 APIs Utilizadas

### MelhorPlano Coverage API
```
GET /api/v1/postcodes/coverage?postcode={CEP}&number={NUMBER}&c={PROVIDERS}
```

**Operadoras Suportadas:**
- A API pode retornar cobertura de diversas operadoras, incluindo provedores locais menores (apenas desmarcando as opções de operadoras na consulta).

---

## 🌐 Performance e Acessibilidade

- ✅ **Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Otimizado** - Sem dependências externas desnecessárias
- ✅ **Acessível** - Semântica HTML correta e bom contraste
- ✅ **Rápido** - Tempo máximo de resposta: 20 segundos

---

## 📝 Melhorias Recentes

- ✨ Implementação de Dark Mode com toggle persistente
- ✨ Sistema de notificações com fila inteligente
- ✨ Correção de overflow e scroll issues
- ✨ Estilização completa para ambos os temas
- ✨ Melhorias na legibilidade de elementos
 - ✨ Implementação de Consulta Massiva e Export de Resultados (CSV/JSON) — veja o guia de extração em massa em [EXTRAÇÃO_EM_MASSA.md](EXTRAÇÃO_EM_MASSA.md)

---

## 🔮 Roadmap Futuro

- ✅ Consulta massiva (scrap) — Implementado (veja [EXTRAÇÃO_EM_MASSA.md](EXTRAÇÃO_EM_MASSA.md))
- ✅ Export de resultados (CSV) — Implementado (CSV/JSON)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Guilherme Stelmach**
- GitHub: [@GuiStelmach](https://github.com/GuiStelmach)
- Email: Contate através do GitHub

---

## 🤝 Suporte

Encontrou um bug ou tem uma sugestão? 
- 📧 Abra uma [issue](https://github.com/GuiStelmach/net-spot/issues)
- 🔗 Faça um fork e envie um pull request

---

<div align="center">
  
  **Desenvolvido por [GuiStelmach](https://github.com/GuiStelmach)**
  
  *"Simplificando a venda de internet fibra no Brasil"*
  
</div>
