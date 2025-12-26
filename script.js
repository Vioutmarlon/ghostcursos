const SUPABASE_URL = "https://wskajqppnvjdxyitkrvd.supabase.co";
const SUPABASE_KEY = "sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB";

document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error-message");
  const grid = document.getElementById("courses-grid");

  loading.classList.remove("hidden");
  error.classList.add("hidden");
  grid.classList.add("hidden");
  grid.innerHTML = "";

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/courses?select=*&status=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!res.ok) throw new Error("Erro Supabase");

    const courses = await res.json();

    courses.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";

      card.innerHTML = `
        <img src="${course.image_url || ''}" alt="${course.title}">
        <div class="card-content">
          <h3 class="card-title">${course.title}</h3>
          <p class="card-description">${course.description || "Descrição não informada."}</p>
          <div class="card-footer">
            <span class="card-price">R$ ${course.price || "0,00"}</span>
            <a href="${course.checkout_url}" target="_blank" class="buy-button">
              Comprar
            </a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    loading.classList.add("hidden");
    grid.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}
