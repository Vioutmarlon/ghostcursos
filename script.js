// CONFIGURAÇÃO DO SUPABASE
// Substitua as variáveis abaixo pelos dados do seu projeto Supabase
const SUPABASE_URL = 'https://wskajqppnvjdxyitkrvd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qRL01v8o56OASdOqtDMZxg_OqeOWcOB';

const domElements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error-message'),
    grid: document.getElementById('courses-grid'),
    gridContainer: document.querySelector('.courses-grid')
};

async function fetchCourses() {
    // Verificação de segurança para as chaves
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase Keys não configuradas. Preencha SUPABASE_URL e SUPABASE_ANON_KEY no arquivo script.js.');
        showError('Configure as chaves do Supabase no arquivo script.js para visualizar os cursos.');
        return;
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/courses?select=*&status=eq.active`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro API: ${response.status} ${response.statusText}`);
        }

        const courses = await response.json();
        renderCourses(courses);

    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        showError();
    }
}

function renderCourses(courses) {
    domElements.loading.classList.add('hidden');

    if (!courses || courses.length === 0) {
        domElements.error.innerHTML = "<p>Nenhum curso ativo encontrado.</p>";
        domElements.error.classList.remove('hidden');
        return;
    }

    domElements.grid.innerHTML = '';

    courses.forEach(course => {
        const card = createCourseCard(course);
        domElements.grid.appendChild(card);
    });

    domElements.grid.classList.remove('hidden');
}

function createCourseCard(course) {
    const article = document.createElement('article');
    article.className = 'course-card';

    // Formatando preço
    const priceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(course.price || 0);

    // Fallback de imagem
    const imageUrl = course.image_url || 'https://via.placeholder.com/600x400/000000/ff003c?text=GhostCursos';

    article.innerHTML = `
        <div class="card-image-wrapper">
            <img src="${imageUrl}" alt="${course.title}" class="card-image" loading="lazy">
        </div>
        <div class="card-content">
            <div>
                <h2 class="card-title">${course.title}</h2>
                <p class="card-desc">${course.description || 'Sem descrição.'}</p>
            </div>
            <div class="card-footer">
                <span class="card-price">${priceFormatted}</span>
                <a href="${course.checkout_url}" target="_blank" rel="noopener noreferrer" class="btn-buy">
                    Comprar
                </a>
            </div>
        </div>
    `;

    return article;
}

function showError(msg) {
    domElements.loading.classList.add('hidden');
    domElements.error.classList.remove('hidden');
    if (msg) {
        domElements.error.querySelector('p').textContent = msg;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', fetchCourses);
