# 👻 GhostCursos Vitrine

Este projeto é uma vitrine de cursos online moderna e responsiva, construída com HTML, CSS e JavaScript puro (Vanilla). Ele consome dados diretamente do Supabase.

## 🚀 Como Configurar

1. **Supabase**:
    - Crie um projeto no [Supabase](https://supabase.com/).
    - Crie uma tabela chamada `courses` com os seguintes campos:
        - `id` (int8, primary key)
        - `created_at` (timestamptz)
        - `title` (text)
        - `description` (text)
        - `price` (numeric/float)
        - `image_url` (text)
        - `checkout_url` (text)
        - `status` (text) - Use 'active' para exibir o curso.

2. **Conexão**:
    - Abra o arquivo `script.js`.
    - No topo do arquivo, preencha as constantes com suas chaves do Supabase:
      ```javascript
      const SUPABASE_URL = 'https://seu-projeto.supabase.co';
      const SUPABASE_ANON_KEY = 'sua-chave-anonima-publica';
      ```

3. **Executando Localmente**:
    - Você pode usar uma extensão como "Live Server" no VS Code.
    - Ou apenas abrir o `index.html` no navegador (embora requisições fetch possam ser bloqueadas por CORS dependendo da configuração local, recomenda-se um servidor local).

## 🌍 Deploy no Netlify

1. Arraste esta pasta para o [Netlify Drop](https://app.netlify.com/drop) ou conecte ao GitHub.
2. O site funcionará automaticamente, desde que as chaves no `script.js` estejam preenchidas ou configuradas (nota: como é front-end puro, as chaves ficarão expostas no código cliente, o que é aceitável para a `ANON_KEY` se as `RLS` (Row Level Security) do Supabase estiverem configuradas corretamente para permitir apenas leitura pública).

## 🎨 Design

- Tema Futurist Dark Mode.
- Neon Red (#ff003c).
- Responsivo para Mobile e Desktop.
