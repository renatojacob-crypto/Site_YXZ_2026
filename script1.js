const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const closeMenu = () => {
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const duration = 1400;
      const start = performance.now();

      const formatNumber = (value) => {
        if (target >= 1000) {
          return `+${Math.floor(value).toLocaleString("pt-BR")}`;
        }
        if (target === 8) {
          return `+${Math.floor(value)}`;
        }
        return Math.floor(value).toLocaleString("pt-BR");
      };

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatNumber(target * eased);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = formatNumber(target);
        }
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);

      if (shouldShow) {
        card.classList.remove("is-hidden");
        requestAnimationFrame(() => card.classList.add("is-visible"));
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});

const proposalForm = document.getElementById("proposalForm");
const statusEl = document.querySelector("[data-form-status]");

const buildEmailBody = (formData) => {
  const entries = [
    ["Nome", formData.get("nome")],
    ["Empresa / Instituição", formData.get("empresa")],
    ["E-mail", formData.get("email")],
    ["WhatsApp", formData.get("telefone")],
    ["Tipo de projeto", formData.get("tipo")],
    ["Público-alvo", formData.get("publico")],
    ["Cidade / Estado", formData.get("cidade")],
    ["Participantes estimados", formData.get("participantes")],
    ["Mensagem", formData.get("mensagem")]
  ];

  return entries
    .filter(([, value]) => value && String(value).trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
};

proposalForm?.addEventListener("submit", (event) => {
  /*
    Este site está pronto para integração com Netlify Forms.
    Para usar envio nativo do Netlify, remova este listener ou publique com um endpoint próprio.
    Por padrão, o formulário gera um e-mail preenchido para o contato institucional.
  */
  event.preventDefault();

  const formData = new FormData(proposalForm);
  const nome = formData.get("nome") || "Contato";
  const empresa = formData.get("empresa") || "Nova proposta";
  const subject = encodeURIComponent(`Solicitação de orçamento - ${empresa}`);
  const body = encodeURIComponent(`Olá, equipe YXZ.\n\nGostaria de solicitar uma proposta.\n\n${buildEmailBody(formData)}\n\nAtenciosamente,\n${nome}`);
  const mailto = `mailto:administrativo@yxzrobotica.com.br?subject=${subject}&body=${body}`;

  statusEl.textContent = "Abrindo seu aplicativo de e-mail com a solicitação preenchida...";
  window.location.href = mailto;

  window.setTimeout(() => {
    statusEl.textContent = "Solicitação gerada. Caso o e-mail não abra automaticamente, envie a mensagem para administrativo@yxzrobotica.com.br.";
  }, 1100);
});
