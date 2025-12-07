const plans = [
    // TODO: preencha com 3–5 planos reais
    // {
    //   id: 1,
    //   name: 'New Testament in 6 months',
    //   focus: 'nt',
    //   durationDays: 180,
    //   description: 'Short daily readings from the New Testament.'
    // },
];

function getFilteredPlans(focus) {
    if (focus === 'all') return plans;
    return plans.filter(plan => plan.focus === focus);
}

function renderPlans(list) {
    const container = document.querySelector('#plans-grid');
    if (!container) return;

    const html = list.map(plan => `
    <article class="card plan-card">
      <h3>${plan.name}</h3>
      <p>${plan.description}</p>
      <p><strong>${plan.durationDays}</strong> days</p>
      <button type="button"
              class="btn"
              data-plan-id="${plan.id}">
        Select this plan
      </button>
    </article>
  `).join('');

    container.innerHTML = html;
}

function handleFilterChange(event) {
    const focus = event.target.value;
    const filtered = getFilteredPlans(focus);
    renderPlans(filtered);
}

function handlePlanClick(event) {
    const button = event.target.closest('button[data-plan-id]');
    if (!button) return;

    const id = Number(button.dataset.planId);
    const selected = plans.find(p => p.id === id);
    if (!selected) return;

    // Exemplo de condicional + localStorage
    localStorage.setItem('dsj-selected-plan', JSON.stringify(selected));

    alert(`You selected: ${selected.name}`); // TODO: troque por algo mais bonitinho no DOM
}

document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#focus-filter');
    if (select) {
        select.addEventListener('change', handleFilterChange);
    }

    const container = document.querySelector('#plans-grid');
    if (container) {
        container.addEventListener('click', handlePlanClick);
    }

    renderPlans(plans);
});
