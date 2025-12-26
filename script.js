// 🔐 CONFIGURAÇÃO SUPABASE
const SUPABASE_URL = "https://wskajqppnvjdxyitkrvd.supabase.co";
const SUPABASE_KEY = "sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB";

document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error-message");
  const grid = document.getElementById("courses-grid");

  // 🔄 Estado inicial
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  grid.classList.add("hidden");
  grid.innerHTML = "";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/courses?select=*&status=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro API: ${response.status}`);
    }

    const courses = await response.json();

    if (!courses || courses.length === 0) {
      grid.innerHTML = `
        <p style="text-align:center;color:#aaa">
          Nenhum curso disponível no momento.
        </p>
      `;
    } else {
      courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";

        const priceFormatted = formatPrice(course.price);
        const description = course.description
          ? truncateText(course.description, 120)
          : "Curso completo com acesso imediato após a compra.";

        card.innerHTML = `
          <div class="card-image">
            <img 
              src="${course.image_url || 'https://via.placeholder.com/600x400?text=GhostCursos'}"
              loading="lazy"
              alt="${course.title}"
            >
          </div>

          <div class="card-content">
            <h3 class="card-title">${course.title}</h3>

            <p class="card-description">
              ${description}
            </p>

            <div class="card-footer">
              <span class="card-price">${priceFormatted}</span>

              <a 
                href="${course.checkout_url}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="buy-button"
              >
                Comprar agora
              </a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    }

    // ✅ Mostra cursos
    loading.classList.add("hidden");
    grid.classList.remove("hidden");

  } catch (err) {
    console.error("Erro ao carregar cursos:", err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

// 💰 Formata preço (R$)
function formatPrice(value) {
  if (!value) return "Consultar";
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ✂️ Limita descrição (UX melhor)
function truncateText(text, maxLength) {
  if (text.length <
