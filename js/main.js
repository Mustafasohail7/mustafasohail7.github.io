/* Main application logic */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page) initLayout(page);

  initThemeToggle();
  initMobileMenu();
  initCommandPalette();
  initPageFeatures(page);
  initScrollAnimations();
});

/* Theme toggle — always dark, show modal on light attempt */
function initThemeToggle() {
  const toggles = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ].filter(Boolean);

  toggles.forEach((btn) => {
    btn.addEventListener("click", showLightModeModal);
  });

  const closeBtn = document.getElementById("modal-close");
  const modal = document.getElementById("light-mode-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", hideLightModeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideLightModeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideLightModeModal();
  });
}

function showLightModeModal() {
  const modal = document.getElementById("light-mode-modal");
  if (modal) {
    modal.classList.add("open");
    document.getElementById("modal-close")?.focus();
  }
}

function hideLightModeModal() {
  const modal = document.getElementById("light-mode-modal");
  if (modal) modal.classList.remove("open");
}

/* Mobile menu */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
    menu.setAttribute("aria-hidden", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

/* Command palette */
function initCommandPalette() {
  const palette = document.getElementById("command-palette");
  const input = document.getElementById("command-input");
  const results = document.getElementById("command-results");
  if (!palette || !input || !results) return;

  let selectedIndex = 0;
  let filteredItems = [...COMMAND_ITEMS];

  function renderResults(items) {
    if (items.length === 0) {
      results.innerHTML = `<div class="command-item text-[#9b9aa3]">No results found</div>`;
      return;
    }

    results.innerHTML = items
      .map(
        (item, i) => `
        <div class="command-item ${i === selectedIndex ? "selected" : ""}" data-index="${i}" role="option" aria-selected="${i === selectedIndex}">
          <span>${item.label}</span>
          ${item.shortcut ? `<kbd>${item.shortcut}</kbd>` : ""}
        </div>`
      )
      .join("");

    results.querySelectorAll(".command-item[data-index]").forEach((el) => {
      el.addEventListener("click", () => navigateToItem(items[parseInt(el.dataset.index)]));
    });
  }

  function navigateToItem(item) {
    closePalette();
    if (item.external) {
      window.open(item.href, "_blank");
    } else {
      const base = getBasePath();
      window.location.href = base + item.href;
    }
  }

  function openPalette() {
    palette.classList.add("open");
    input.value = "";
    filteredItems = [...COMMAND_ITEMS];
    selectedIndex = 0;
    renderResults(filteredItems);
    input.focus();
  }

  function closePalette() {
    palette.classList.remove("open");
  }

  function filterItems(query) {
    const q = query.toLowerCase();
    filteredItems = COMMAND_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
    selectedIndex = 0;
    renderResults(filteredItems);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !isInputFocused()) {
      e.preventDefault();
      openPalette();
      return;
    }

    if (!palette.classList.contains("open")) return;

    if (e.key === "Escape") {
      closePalette();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
      renderResults(filteredItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      renderResults(filteredItems);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      navigateToItem(filteredItems[selectedIndex]);
    }
  });

  input.addEventListener("input", (e) => filterItems(e.target.value));

  palette.addEventListener("click", (e) => {
    if (e.target === palette) closePalette();
  });
}

function isInputFocused() {
  const el = document.activeElement;
  return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
}

/* Scroll animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

/* Page-specific initialization */
function initPageFeatures(page) {
  if (page === "notes") {
    initNotesFilters();
    renderNotesFeedback();
  }
  if (page === "home") initHomePage();
  if (page === "lab") initLabPage();
  if (page === "vault") initVaultPage();
  if (page === "about") initAboutPage();
}

function initHomePage() {
  renderHeroProfile();
  renderHeroResume();
  renderIdentityStrip();
  renderTimelineCarousel();
  renderCurrentFocus();
  renderFeaturedWork();
  renderServices();
  renderCurrentActivity();
}

function renderHeroProfile() {
  const el = document.getElementById("hero-profile");
  if (!el) return;
  const base = getBasePath();
  const p = SITE.profile;
  el.innerHTML = `
    <div class="profile-swap" role="img" aria-label="${p.alt}">
      <img src="${base}${p.default}" alt="${p.alt}" class="profile-default">
      <img src="${base}${p.hover}" alt="" class="profile-hover" aria-hidden="true">
    </div>`;
}

function renderHeroResume() {
  const el = document.getElementById("hero-resume");
  if (!el) return;
  const base = getBasePath();
  el.href = base + SITE.resume;
}

function renderIdentityStrip() {
  const el = document.getElementById("identity-strip");
  if (!el) return;
  el.innerHTML = IDENTITY_STRIP.map(
    (item) => `
    <div class="flex items-center gap-2 text-sm text-[#9b9aa3]">
      <span class="w-1 h-1 rounded-full bg-[#7ba7d4]/50"></span>
      ${item}
    </div>`
  ).join("");
}

function renderCurrentFocus() {
  const el = document.getElementById("current-focus");
  if (!el) return;
  el.innerHTML = CURRENT_FOCUS.map(
    (item) => `
    <div class="card p-6 fade-in">
      <h3 class="font-medium text-[#eceae6] mb-3">${item.title}</h3>
      <p class="text-sm text-[#9b9aa3] leading-relaxed">${item.description}</p>
    </div>`
  ).join("");
}

function renderFeaturedWork() {
  const el = document.getElementById("featured-work");
  if (!el) return;
  const w = FEATURED_WORK;
  const base = getBasePath();
  el.innerHTML = `
    <a href="${base}${w.href}" class="card block p-8 md:p-10 fade-in group">
      <h3 class="text-2xl font-medium text-[#eceae6] mb-3 group-hover:text-[#7ba7d4] transition-colors">${w.title}</h3>
      <p class="text-[#9b9aa3] leading-relaxed mb-6 max-w-2xl">${w.excerpt}</p>
      <div class="flex flex-wrap items-center gap-3">
        ${w.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        <span class="text-sm text-[#9b9aa3] ml-auto">${w.readTime} read</span>
      </div>
    </a>`;
}

function renderServices() {
  const el = document.getElementById("services");
  if (!el) return;
  el.innerHTML = SERVICES.map(
    (s) => `
    <div class="card p-6 fade-in">
      <h3 class="font-medium text-[#eceae6] mb-2">${s.title}</h3>
      <p class="text-sm text-[#9b9aa3] leading-relaxed">${s.description}</p>
    </div>`
  ).join("");
}

function renderCurrentActivity() {
  const el = document.getElementById("current-activity");
  if (!el) return;
  el.innerHTML = `
    <div class="flex items-center gap-3 text-sm text-[#9b9aa3]">
      <span class="activity-dot"></span>
      <span>Currently: <span class="text-[#eceae6]">${SITE.currentActivity}</span></span>
    </div>`;
}

function renderTimelineCarousel() {
  const el = document.getElementById("learning-timeline");
  if (!el) return;

  el.innerHTML = `
    <div class="timeline-carousel" id="timeline-carousel">
      <button class="timeline-nav-btn prev" id="timeline-prev" aria-label="Previous timeline items">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="timeline-track-wrapper">
        <div class="timeline-track" id="timeline-track">
          ${LEARNING_TIMELINE.map(
            (item) => `
            <div class="timeline-card">
              <span class="text-xs text-[#7ba7d4] tracking-wider">${item.date}</span>
              <h3 class="font-medium text-[#eceae6] mt-2 mb-2">${item.title}</h3>
              <p class="text-sm text-[#9b9aa3] leading-relaxed">${item.description}</p>
            </div>`
          ).join("")}
        </div>
      </div>
      <button class="timeline-nav-btn next" id="timeline-next" aria-label="Next timeline items">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="timeline-dots" id="timeline-dots"></div>
    </div>`;

  initTimelineCarousel();
}

function initTimelineCarousel() {
  const track = document.getElementById("timeline-track");
  const prevBtn = document.getElementById("timeline-prev");
  const nextBtn = document.getElementById("timeline-next");
  const dotsEl = document.getElementById("timeline-dots");
  if (!track || !prevBtn || !nextBtn || !dotsEl) return;

  let currentPage = 0;
  let itemsPerPage = 3;
  let pageStarts = [];
  let currentStartIndex = null;

  function getItemsPerPage() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function computePageStarts() {
    itemsPerPage = getItemsPerPage();
    const totalItems = LEARNING_TIMELINE.length;
    pageStarts = [];
    let start = Math.max(0, totalItems - itemsPerPage);

    while (start > 0) {
      pageStarts.unshift(start);
      start -= itemsPerPage;
    }

    pageStarts.unshift(0);
  }

  function updateCarousel() {
    computePageStarts();
    const totalPages = pageStarts.length;
    if (currentStartIndex === null || pageStarts.indexOf(currentStartIndex) === -1) {
      currentStartIndex = pageStarts[totalPages - 1];
    }
    currentPage = pageStarts.indexOf(currentStartIndex);
    if (currentPage === -1) {
      currentPage = totalPages - 1;
      currentStartIndex = pageStarts[currentPage];
    }

    const card = track.querySelector(".timeline-card");
    const gap = 20;
    const cardWidth = card ? card.offsetWidth + gap : 280;
    const offset = currentStartIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;

    dotsEl.innerHTML = pageStarts
      .map(
        (start, i) => `
      <button class="timeline-dot-btn ${i === currentPage ? "active" : ""}" data-page="${i}" aria-label="Go to timeline page ${i + 1}"></button>`
      )
      .join("");

    dotsEl.querySelectorAll(".timeline-dot-btn").forEach((dot) => {
      dot.addEventListener("click", () => {
        currentPage = parseInt(dot.dataset.page, 10);
        currentStartIndex = pageStarts[currentPage];
        updateCarousel();
      });
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      currentStartIndex = pageStarts[currentPage];
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < pageStarts.length - 1) {
      currentPage++;
      currentStartIndex = pageStarts[currentPage];
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  updateCarousel();
}

function initLabPage() {
  renderLabProjects();
}

function renderProjectLinks(project) {
  const links = [];
  if (project.github) {
    links.push(`
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>`);
  }
  if (project.medium) {
    links.push(`
      <a href="${project.medium}" target="_blank" rel="noopener noreferrer" class="project-link">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
        Medium
      </a>`);
  }
  return links.length ? `<div class="flex flex-wrap gap-4 mt-5 pt-4 border-t border-white/[0.06]">${links.join("")}</div>` : "";
}

function renderLabProjects() {
  const el = document.getElementById("lab-projects");
  if (!el) return;

  // Ensure status-pill styles exist at runtime (injected if stylesheet isn't applied)
  function injectStatusPillStyles() {
    if (document.getElementById("status-pill-styles")) return;
    const css = `
      .status-pill {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        font-size: 0.75rem;
        color: var(--text-primary);
        background: rgba(123,167,212,0.06);
        border-radius: 999px;
        border: 1px solid rgba(123,167,212,0.12);
      }
    `;
    const style = document.createElement("style");
    style.id = "status-pill-styles";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  injectStatusPillStyles();
  el.innerHTML = LAB_PROJECTS.map(
    (p) => `
    <div class="card p-6 md:p-8 fade-in relative">
      ${p.status && p.status !== "Completed" ? `<div class="absolute top-4 right-4"><span class="status-pill">${p.status}</span></div>` : ""}
      <h3 class="text-lg font-medium text-[#eceae6] mb-4">${p.title}</h3>
      <p class="text-[#9b9aa3] leading-relaxed">${p.summary}</p>
      ${renderProjectLinks(p)}
    </div>`
  ).join("");

  if (typeof initScrollAnimations === 'function') initScrollAnimations();
}

function initNotesFilters() {
  const filtersEl = document.getElementById("note-filters");
  const gridEl = document.getElementById("notes-grid");
  if (!filtersEl || !gridEl) return;

  filtersEl.innerHTML = NOTE_CATEGORIES.map(
    (cat, i) => `
    <button class="filter-btn ${i === 0 ? "active" : ""}" data-category="${cat}">${cat}</button>`
  ).join("");

  function renderNotes(category) {
    const filtered =
      category === "All" ? NOTES : NOTES.filter((n) => n.category === category);

    gridEl.innerHTML = filtered
      .map((note) => {
        const link = note.href;
        const isExternal = /^(https?:)?\/\//.test(link);
        const linkAttrs = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";

        return `
      <a href="${link}" class="card block p-6 md:p-8 fade-in group"${linkAttrs}>
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs text-[#7ba7d4] uppercase tracking-wider">${note.category}</span>
          <span class="text-xs text-[#9b9aa3]">${note.readTime}</span>
        </div>
        <h3 class="text-lg font-medium text-[#eceae6] group-hover:text-[#7ba7d4] transition-colors">${note.title}</h3>
        <p class="text-sm text-[#9b9aa3] leading-relaxed mb-4 mt-2">${note.excerpt}</p>
        <div class="flex flex-wrap gap-2">
          ${note.skills.map((s) => `<span class="tag">${s}</span>`).join("")}
        </div>
      </a>`;
      })
      .join("");

    initScrollAnimations();
  }

  renderNotes("All");

  filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderNotes(btn.dataset.category);
    });
  });
}

function renderNotesFeedback() {
  const el = document.getElementById("notes-feedback");
  if (!el) return;

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(NOTES_FEEDBACK.emailSubject)}`;
  el.innerHTML = `
    <p class="text-[#9b9aa3] leading-relaxed mb-4 max-w-lg mx-auto">${NOTES_FEEDBACK.message}</p>
    <a href="${mailto}" class="feedback-link text-sm">Send me an email &rarr;</a>`;
}

function initVaultPage() {
  const el = document.getElementById("cert-grid");
  if (!el) return;

  el.innerHTML = CERTIFICATIONS.map(
    (cert) => `
    <div class="card card-illuminate p-6 md:p-8 fade-in">
      <div class="flex items-start justify-between gap-4 mb-2">
        <h3 class="text-xl font-medium text-[#eceae6]">${cert.name}</h3>
        ${cert.status === "in-progress" ? '<span class="badge badge-progress">In Progress</span>' : ""}
      </div>
      <p class="text-sm text-[#9b9aa3] mb-1">${cert.fullName}</p>
      <p class="text-xs text-[#9b9aa3] mb-3">${cert.issuer} · ${cert.year}</p>
      ${
        cert.credentialUrl
          ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-link">View credential &rarr;</a>`
          : ""
      }
      <details class="vault-details mt-5">
        <summary>What I Learned</summary>
        <ul class="mt-3 space-y-2 text-sm text-[#9b9aa3] list-disc pl-4">
          ${cert.learned.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </details>
    </div>`
  ).join("");
}

function initAboutPage() {
  renderTopMovies();
  renderRunningSection();
  renderHobbiesAndSong();
}

{/* <p class="text-sm font-medium text-[#eceae6]">${m.title}</p> */}
function renderTopMovies() {
  const moviesEl = document.getElementById("top-movies");
  if (!moviesEl) return;

  moviesEl.innerHTML = TOP_MOVIES.map(
    (m) => `
    <div class="movie-poster fade-in">
      ${m.image ? `<img src="${m.image}" alt="${m.title} poster">` : ""}
      <div>
        <p class="text-xs text-[#9b9aa3]">${m.year}</p>
      </div>
    </div>`
  ).join("");
}

function renderRunningSection() {
  const el = document.getElementById("running-section");
  if (!el) return;
  const base = getBasePath();

  el.innerHTML = `
    <div class="grid sm:grid-cols-3 gap-4 mb-8">
      ${RUNNING.stats.map(
        (s) => `
        <div class="card p-5 text-center fade-in">
          <p class="text-xs text-[#7ba7d4] uppercase tracking-wider mb-2">${s.label}</p>
          <p class="text-2xl font-medium text-[#eceae6]">${s.value}</p>
        </div>`
      ).join("")}
    </div>
    <div class="grid sm:grid-cols-2 gap-4">
      ${RUNNING.medals.map(
        (m) => `
        <div class="fade-in">
          <div class="medal-photo">
            <img src="${base}${m.src}" alt="${m.alt}">
          </div>
          <p class="text-xs text-[#9b9aa3] mt-2 text-center">${m.caption}</p>
        </div>`
      ).join("")}
    </div>`;
}

function renderHobbiesAndSong() {
  const el = document.getElementById("hobbies-song");
  if (!el) return;

  el.innerHTML = `
    <ul id="hobbies-list" class="space-y-0" aria-live="polite"></ul>
    <div class="song-player">
      <p class="text-sm text-[#9b9aa3] mb-3">Song corner — ${SONG_CORNER.title}</p>
      <button id="play-song-btn" class="play-song-btn" type="button" aria-expanded="false" aria-controls="song-embed">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        Play
      </button>
      <div id="song-embed" class="song-embed hidden" hidden></div>
    </div>`;

  renderHobbiesList();
  initSongPlayer();
}

function renderHobbiesList() {
  const list = document.getElementById("hobbies-list");
  if (!list) return;

  list.innerHTML = HOBBIES_ROTATION.map(
    (hobby) => `
    <li class="hobby-item">
      <span class="hobby-bullet" aria-hidden="true"></span>
      <div>
        <span class="text-[#eceae6] font-medium">${hobby.title}</span>
        <span class="text-[#9b9aa3] text-sm"> — ${hobby.reason}</span>
      </div>
    </li>`
  ).join("");
}

function initSongPlayer() {
  const btn = document.getElementById("play-song-btn");
  const embed = document.getElementById("song-embed");
  if (!btn || !embed) return;

  let loaded = false;

  btn.addEventListener("click", () => {
    if (!loaded) {
      embed.innerHTML = `
        <iframe
          src="https://www.youtube-nocookie.com/embed/${SONG_CORNER.youtubeId}?autoplay=1"
          title="${SONG_CORNER.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>`;
      embed.classList.remove("hidden");
      embed.hidden = false;
      loaded = true;
      btn.setAttribute("aria-expanded", "true");
      btn.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
        Playing`;
    }
  });
}
