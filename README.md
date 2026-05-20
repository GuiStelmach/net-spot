<div align="center">
  <img alt="Net Spot" src="frontend/assets/images/net-spot-lite.png" width="280px" />
  
  

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen.svg)](#)
  [![Version](https://img.shields.io/badge/Version-1.0.1-blue.svg)](#)
  
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
- ✅ **Export de Resultados (CSV/JSON)** - Exportação dos resultados processados nos formatos CSV e JSON.

> Para detalhes completos sobre a funcionalidade de Extração em Massa, consulte o guia [EXTRAÇÃO_EM_MASSA.md](EXTRAÇÃO_EM_MASSA.md).

---

## 🛠️ Stack Utilizada

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com variáveis e animações
- **JavaScript (ES6+)** - Lógica de aplicação modularizada
- **Font Awesome 6** - Ícones vetoriais

### Backend (Client-side Logic)
- **JavaScript (Modules)** - Organização em módulos ES6 para manutenibilidade
- **Fetch API** - Comunicação assíncrona com serviços externos

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

2. **Executar a aplicação**
   Como é uma aplicação estática (HTML/CSS/JS), você pode:
   - Abrir o arquivo `index.html` diretamente no seu navegador.
   - Ou usar uma extensão como "Live Server" no VSCode (recomendado para evitar problemas de CORS em alguns navegadores).

### Fluxo de Uso

1. **Consulta Simples**
   - Insira o CEP do endereço (8 dígitos)
   - Insira o número do endereço
   - Selecione as operadoras desejadas
   - Clique em "Consultar"

2. **Extração em Massa**
   - Acesse a aba "Extração em Massa"
   - Faça upload de um arquivo CSV/TXT com CEPs e números
   - Processe a lista e exporte os resultados

---

## 📁 Estrutura do Projeto

```
net-spot/
├── frontend/
│   ├── assets/
│   │   ├── fonts/          # Fontes customizadas (Outfit)
│   │   └── images/         # Logos e assets visuais
│   ├── pages/              # Páginas auxiliares
│   └── style/
│       └── index.css       # Estilos globais e dark mode
├── backend/
│   ├── api/
│   │   ├── apiClient.js     # Requisições à MelhorPlano API
│   │   └── provider.js      # Adaptação e mapeamento de dados de provedores
│   ├── modules/
│   │   ├── alertSystem.js   # Sistema de notificações na UI
│   │   ├── bulkProcessor.js # Lógica de processamento em massa
│   │   ├── formValidation.js # Validação e submissão de formulários
│   │   ├── init.js         # Inicialização da aplicação
│   │   ├── operatorSelection.js # Seleção de operadoras
│   │   ├── tabsManager.js  # Gerenciamento de abas (Simples/Massa)
│   │   ├── themeToggle.js  # Sistema de dark mode
│   │   └── validators.js   # Validações de CEP e número
├── index.html              # Página principal da aplicação
├── package.json            # Metadados do projeto
├── EXTRAÇÃO_EM_MASSA.md    # Documentação da funcionalidade de extração
└── README.md               # Este arquivo
```

---

## 🎨 Recursos Avançados

### Dark Mode
- **Toggle Visual** - Botão fixo no canto superior esquerdo
- **Persistência** - Preferência salva no localStorage
- **Respeita Sistema** - Detecta preferência do SO do usuário

### Sistema de Notificações
- **Fila Inteligente** - Múltiplos alertas empilhados
- **Timeouts Independentes** - Cada alerta com duração própria
- **Tipos Variados** - Success, Info, Warning e Error

### Validações
- ✓ CEP apenas numérico (máx. 8 dígitos)
- ✓ Número apenas numérico
- ✓ Feedback em tempo real ao usuário

---

## 🔌 APIs Utilizadas

### MelhorPlano Coverage API
A aplicação consome a API pública de cobertura do MelhorPlano para verificar a disponibilidade de serviços em endereços específicos.

---

## 🌐 Performance e Acessibilidade

- ✅ **Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Modular** - Código organizado em módulos ES6 para melhor manutenção
- ✅ **Rápido** - Processamento assíncrono otimizado

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Guilherme Stelmach**
- GitHub: [@GuiStelmach](https://github.com/GuiStelmach)

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
