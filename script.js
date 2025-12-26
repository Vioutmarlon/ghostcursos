// 🔐 CONFIGURAÇÃO SUPABASE
const SUPABASE_URL = "https://wskajqppnvjdxyitkrvd.supabase.co";
const SUPABASE_KEY = "sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB";

document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error-message");
  const grid = document.getElementById("courses-grid");

  // Estado inicial
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  grid.classList.add("hidden");

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
    grid.innerHTML = "";

    if (courses.length === 0) {
      grid.innerHTML =
        "<p style='text-align:center;color:#aaa'>Nenhum curso disponível no momento.</p>";
    } else {
      courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
  <div class="card-image">
    <img src="${course.image_url || ''}" loading="lazy" alt="${course.title}">
  </div>

  <div class="card-content">
    <h3 class="card-title">${course.title}</h3>
    <p class="card-description">
      ${course.description || 'Descrição não disponível.'}
    </p>

    <div class="card-footer">
      <span class="card-price">${course.price}</span>
      <a 
        href="${course.checkout_url}" 
        target="_blank" 
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

    // Mostra cursos
    loading.classList.add("hidden");
    grid.classList.remove("hidden");

  } catch (err) {
    console.error("Erro ao carregar cursos:", err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

