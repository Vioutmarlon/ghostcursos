// CONFIGURAÇÃO DO SUPABASE
// Substitua as variáveis abaixo pelos dados do seu projeto Supabase
const SUPABASE_URL = "https://wskajqppnvjdxyitkrvd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB";

const domElements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error-message'),
    grid: document.getElementById('courses-grid'),
    gridContainer: document.querySelector('.courses-grid')
};

async function loadCourses() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/courses?select=*&active=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro API: ${response.status}`);
    }

    const courses = await response.json();
    const container = document.getElementById("courses");
    container.innerHTML = "";

    courses.forEach(course => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${course.image_url}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <strong>${course.price}</strong>
        <a href="${course.checkout_url}" target="_blank">Comprar agora</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    document.getElementById("courses").innerHTML =
      "<p style='color:red;text-align:center'>Falha ao carregar cursos.</p>";
  }
}

loadCourses();


// Inicialização
document.addEventListener('DOMContentLoaded', fetchCourses);

