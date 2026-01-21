# EXTRAÇÃO_EM_MASSA.md

> Guia completo da funcionalidade de Extração em Massa do Net Spot

## 📋 Visão Geral

A funcionalidade **Extração em Massa** permite realizar consultas de viabilidade de internet fibra para múltiplos endereços simultaneamente através de um arquivo CSV ou TXT. É ideal para processamento em lote de grande volume de dados.

---

## 📄 Formato Aceito

### Extensões Suportadas
- **.csv** - Arquivo de valores separados por vírgula
- **.txt** - Arquivo de texto simples

### Separadores Suportados
- **Vírgula (,)** - `cep,numero`
- **Ponto-e-vírgula (;)** - `cep;numero`

O sistema detecta automaticamente qual separador está sendo usado.

### Estrutura de Dados

```
cep,numero
12345678,100
12345679,200
12345680,300
```

#### Componentes
- **CEP**: 8 dígitos numéricos (obrigatório)
- **Número**: Número do endereço (obrigatório)
- **Cabeçalho** (opcional): Primeira linha pode conter `cep`, `número` ou `num`

### Exemplos Válidos

**Com cabeçalho (vírgula):**
```
cep,numero
94820170,528
94820170,496
01310100,123
```

**Sem cabeçalho (ponto-e-vírgula):**
```
94820170;528
94820170;496
01310100;123
```

**Ordem invertida:**
```
numero,cep
528,94820170
496,94820170
123,01310100
```

---

## 🚀 Como Usar

### Passo 1: Acessar a Funcionalidade
1. Abra o Net Spot em seu navegador
2. Clique na aba **"Extração em Massa"**

### Passo 2: Preparar Arquivo
1. Crie um arquivo `.csv` ou `.txt`
2. Forneça CEP e Número do endereço
3. Salve o arquivo

### Passo 3: Carregar Arquivo
Escolha uma das opções:

**Opção A - Clique na Zona de Upload:**
1. Clique na área tracejada
2. Selecione o arquivo no navegador
3. Aguarde o carregamento

**Opção B - Arraste o Arquivo:**
1. Arraste o arquivo para a zona de upload
2. Solte quando a zona mudar de cor
3. Aguarde o carregamento

### Passo 4: Processamento
1. Clique em **"Processar Arquivo"** (botão ativado após upload)
2. Acompanhe o progresso: "Processando 1/100..."
3. Aguarde conclusão

### Passo 5: Resultados
1. Visualize o resumo de processamento:
   - **Processadas**: Total de consultas realizadas
   - **Com cobertura**: Endereços com pelo menos uma operadora
   - **Sem cobertura**: Endereços sem nenhuma operadora

---

## 💾 Exportar Resultados

### Formato CSV
**Estrutura:**
```
CEP,Número,Operadora
94820170,528,TIM
94820170,528,SKY
94820170,496,Unifique
```

**Para exportar:**
1. Clique em **"CSV"** (ícone com seta para baixo)
2. Arquivo será baixado como `net-spot-resultados.csv`

**Uso:**
- Importar em Excel, Google Sheets ou similar
- Cada linha = uma operadora por endereço
- Compatível com qualquer programa de planilha

### Formato JSON
**Estrutura:**
```json
[
  {
    "cep": "94820170",
    "numero": "528",
    "operadoras": ["TIM", "SKY"]
  },
  {
    "cep": "94820170",
    "numero": "496",
    "operadoras": ["Unifique"]
  }
]
```

**Para exportar:**
1. Clique em **"JSON"** (ícone com seta para baixo)
2. Arquivo será baixado como `net-spot-resultados.json`

**Uso:**
- Integração com APIs e sistemas
- Processamento programático
- Bancos de dados

---

## ⚙️ Configurações

### Operadoras em Telas Grandes
Em telas desktop (> 768px), é possível selecionar operadoras específicas antes do processamento:

- **TIM** ✓ (padrão ativado)
- **SKY** ✓ (padrão ativado)
- **Unifique** ✓ (padrão ativado)
- **Claro** ☐ (desativado por padrão)
- **Vero** ☐ (desativado por padrão)
- **Oi** ☐ (desativado por padrão)

> **Nota**: Em telas menores (< 768px), todas as operadoras são consultadas automaticamente.

---

## ⏱️ Performance e Tempos

### Velocidade de Processamento
- **Delay entre consultas**: 500ms (para não sobrecarregar a API)
- **Timeout por consulta**: 20 segundos
- **Estimativa**: 
  - 10 endereços ≈ 6 segundos
  - 50 endereços ≈ 25 segundos
  - 100 endereços ≈ 50 segundos

### Limite de Linhas
Não há limite oficial, mas recomenda-se:
- **Ideal**: Até 100 endereços por arquivo
- **Máximo**: 500 endereços por arquivo

Para volumes maiores, processe em múltiplos arquivos.

---

## ✅ Validações Automáticas

O sistema realiza validações em tempo real:

| Validação | Critério | Status |
|-----------|----------|--------|
| Formato arquivo | .csv ou .txt | ✓ Obrigatório |
| Separador | , ou ; | ✓ Auto-detectado |
| Cabeçalho | cep, número, num | ✓ Opcional |
| CEP | 8 dígitos numéricos | ✓ Obrigatório |
| Número | Apenas numéricos | ✓ Obrigatório |
| Linhas vazias | Ignoradas | ✓ Removidas |

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|--------|
| "0 linhas carregadas" | Separador não reconhecido | Use , ou ; |
| "CEP inválido" | CEP com menos de 8 dígitos | Padding com zeros |
| "Número inválido" | Contém caracteres não numéricos | Use apenas números |
| "Arquivo não reconhecido" | Extensão errada | Use .csv ou .txt |

---

## 🎯 Casos de Uso

### Vendas em Massa
Processar lista de prospects para identificar oportunidades de venda de internet fibra.

**Exemplo:**
- 200 endereços de potenciais clientes
- Identifica quais têm cobertura
- Prioriza prospecção

### Atualização de Base
Validar cobertura de uma base de dados existente periodicamente.

**Exemplo:**
- Atualizar status de cobertura mensal
- Identificar novos mercados
- Comparar com período anterior

### Planejamento de Rede
Planejar expansão de cobertura com dados consolidados.

**Exemplo:**
- Análise de gaps de cobertura
- Identificar potencial de mercado
- Justificar investimentos

---

## 🔄 Fluxo Completo

```
┌─────────────────────┐
│ Preparar Arquivo CSV│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Carregar Arquivo   │
│ (Clique ou Arraste) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Validar Dados       │
│ (Auto)              │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Clicar "Processar"  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ API Chamadas        │
│ (500ms delay)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Resultados          │
│ (Tabela + Download) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Exportar CSV/JSON   │
└─────────────────────┘
```

---

## 💡 Dicas e Boas Práticas

### ✓ Faça
- Use arquivos com até 100 linhas para melhor performance
- Valide dados antes de fazer upload
- Salve resultados em JSON para arquivamento
- Processe em horários de baixo tráfego

### ✗ Evite
- Arquivos muito grandes (>1000 linhas)
- CEPs inválidos ou incompletos
- Espaços em branco extras nos dados
- Fechar a aba durante o processamento

---

## 🐛 Solução de Problemas

### Problema: "Erro ao processar arquivo"
**Causas possíveis:**
- Arquivo corrompido
- Separador não reconhecido
- Espaços/caracteres especiais

**Solução:**
1. Abra o arquivo em editor de texto
2. Verifique formato (CEP,Número por linha)
3. Remova caracteres especiais
4. Salve como UTF-8
5. Tente novamente

### Problema: Processamento muito lento
**Causas possíveis:**
- Muitas linhas no arquivo
- Conexão internet lenta
- API sobrecarregada

**Solução:**
1. Divida arquivo em partes menores
2. Processe um arquivo por vez
3. Aguarde e tente novamente
4. Processe em horário menos ocupado

### Problema: Resultados em branco
**Causas possíveis:**
- Sem cobertura em nenhum endereço
- Operadoras não selecionadas (desktop)
- Erro na consulta

**Solução:**
1. Verifique CEP manualmente na busca simples
2. Selecione "todas" operadoras
3. Verifique conexão de internet

---

## 📱 Responsividade

### Desktop (> 768px)
- Seleção de operadoras visível
- Tabela com detalhes completos
- Múltiplos botões de ação

### Tablet (600px - 768px)
- Seleção de operadoras **oculta** (usa todas)
- Interfase compacta
- Botões redimensionados

### Mobile (< 600px)
- Layout vertical otimizado
- Upload área simplificada
- Resultados em formato compacto
- Botões de download empilhados

---

## 📚 Recursos Relacionados

- [README.md](./README.md) - Documentação geral do projeto
- [GitHub](http://github.com/GuiStelmach) - Repositório do projeto

---

**Última atualização**: 21 de janeiro de 2026  
**Versão**: 1.0.0
