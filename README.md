# 🚛 Wise Routes | Supply Chain Control Tower

**Wise Routes** é um dashboard de inteligência logística de alta fidelidade ("High-End"). O projeto se destaca pela aplicação rigorosa do conceito de **Neumorfismo (Soft UI)**, criando uma interface tátil, física e focada na redução da carga cognitiva para tomadores de decisão.

O sistema simula uma Torre de Controle operando com dados de frota, custos de manutenção e performance de motoristas.

---

## ✨ Funcionalidades

O dashboard opera como uma Single Page Application (SPA) com navegação fluida entre três módulos estratégicos:

### 1. 📍 Planejador de Rotas (Simulação)
Calculadora preditiva para estimativa de custos antes da viagem.
- **Inputs Táteis:** Campos de entrada com física "côncava" (Inset Shadows).
- **Cálculo de Viabilidade:** Estimativa automática de Custo de Combustível e Tempo baseada em dados históricos da frota.
- **Alertas de Risco:** Indicadores visuais para margem de segurança e clima.

### 2. 📊 Torre de Controle (KPIs Estratégicos)
Visão executiva da saúde financeira e operacional.
- **KPIs de Alto Nível:** TCO (Custo Total de Posse), Custo por KM e Sinistralidade.
- **Data Viz Limpa:** Gráficos sem ruído visual (chartjunk), utilizando sombras para profundidade.
- **Breakdown Financeiro:** Gráfico de rosca segmentando gastos entre Manutenção, Sinistros e Operação.

### 3. 🏆 Scorecard de Motoristas (Performance)
Ferramenta de avaliação visual para gestão de RH e bonificação.
- **Floating Rows:** Cada motorista é apresentado em um cartão flutuante independente.
- **Eficiência Energética:** Barra de progresso neumórfica com feedback de cor (Verde/Vermelho) baseado na meta de consumo.
- **Aderência à Rota:** Monitoramento de desvios (km planejados vs. realizados) com destaque para economia de rota (ícone de troféu).

---

## 🎨 Design System (Neumorfismo)

O diferencial técnico deste projeto é a implementação de um CSS avançado para simular luz e física:

- **Paleta Monocromática:** Todo o sistema utiliza a base `#e0e0e0`.
- **Física de Luz:**
  - *Elementos Elevados (Botões/Cards):* `box-shadow: 9px 9px 16px #bebebe, -9px -9px 16px #ffffff`
  - *Elementos Pressionados (Inputs/Estados Ativos):* `box-shadow: inset 6px 6px 10px #bebebe, inset -6px -6px 10px #ffffff`
- **Tipografia:** Hierarquia visual estrita usando cinza escuro (`#333`) para rótulos e preto (`#000`) para dados.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React 18 + Vite (TypeScript)
- **Estilização:** Tailwind CSS (Configuração personalizada de sombras)
- **Gráficos:** Recharts (Customizados para remover grids e bordas)
- **Ícones:** Lucide React

---

## 🚀 Como Rodar Localmente

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/wise-routes.git](https://github.com/SEU-USUARIO/wise-routes.git)