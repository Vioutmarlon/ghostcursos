// 🔐 CONFIGURAÇÃO SUPABASE
const SUPABASE_URL = "https://wskajqppnvjdxyitkrvd.supabase.co";
const SUPABASE_KEY = "sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB";

// 🚀 FUNÇÃO PRINCIPAL
async function loadCourses() {
  try {
    const coursesContainer = document.getElementById("courses-grid");

    if (!coursesContainer) {
      console.error("Elemento #courses-grid não encontrado no HTML");
      return;
    }

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
    coursesContainer.innerHTML = "";

    if (courses.length === 0) {
      coursesContainer.innerHTML =
        "<p style='text-align:center;color:#aaa'>Nenhum curso disponível no momento.</p>";
      return;
    }

    courses.forEach(course => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${course.image_url || ''}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <strong>R$ ${course.price}</strong>
        <a href="${course.checkout_url}" target="_blank">Comprar agora</a>
      `;

      coursesContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao buscar cursos:", error);

    const coursesContainer = document.getElementById("courses-grid");
    if (coursesContainer) {
      coursesContainer.innerHTML =
        "<p style='color:red;text-align:center'>Falha ao carregar cursos.</p>";
    }
  }
}

// 🧠 GARANTE QUE O HTML CARREGOU
document.addEventListener("DOMContentLoaded", loadCourses);
