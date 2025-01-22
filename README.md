 # Net Spot

Net Spot é uma aplicação web desenvolvida para agilizar o processo de consulta de viabilidade de internet fibra de diversas operadoras. O sistema é destinado exclusivamente ao uso interno por equipes de vendas de uma empresa credenciada para comercializar serviços de internet de diferentes operadoras.

## Objetivo

O objetivo do Net Spot é unificar as consultas de cobertura, eliminando a necessidade de acessar o sistema de cada operadora separadamente. Isso reduz o tempo gasto em cada consulta e aumenta a eficiência do processo de vendas.

## Funcionalidades

- **Consulta Unificada:** Permite a busca por cobertura de internet fibra em múltiplas operadoras simultaneamente, utilizando CEP e número da residência/comércio.
- **Integração com APIs:** Consome APIs de diferentes operadoras para obter a viabilidade de cada uma.
- **Interface Simples e Intuitiva:** Desenvolvida para ser usada no navegador, otimizando a experiência da equipe de vendas.

## Tecnologias Utilizadas

- **Frontend:**
  - ReactJS
  - JavaScript
  - HTML5 e CSS3

- **APIs:**
  - Integração com as APIs das operadoras de internet para consulta de cobertura.

## Arquitetura

- **Web-Based:** O aplicativo será acessado diretamente pelo navegador, sem necessidade de instalação.
- **Sem Banco de Dados:** Todas as consultas são realizadas diretamente nas APIs das operadoras, sem armazenamento local ou remoto.

## Como Funciona

1. O vendedor informa o CEP e o número do endereço desejado.
2. O Net Spot realiza requisições para as APIs das operadoras configuradas.
3. Os resultados das consultas são exibidos de forma consolidada, mostrando a disponibilidade de cada operadora no local solicitado.

## Como Contribuir

Este repositório é destinado ao desenvolvimento e manutenção da aplicação. Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade ou correção: `git checkout -b minha-feature`.
3. Realize os commits: `git commit -m 'Minha nova feature'`.
4. Faça o push da branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

O Net Spot é uma aplicação de uso interno e proprietário. Todos os direitos reservados.

## Contato

Para dúvidas ou suporte, entre em contato com o administrador do sistema ou o time de desenvolvimento.