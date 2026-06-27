/* Shared layout injection — navbar, footer, modals */

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/articles/")) return "../";
  return "";
}

function renderNavbar(currentPage) {
  const base = getBasePath();
  const links = NAV_LINKS.map(
    (link) => `
      <a href="${base}${link.href}" class="nav-link ${link.page === currentPage ? "active" : ""}" data-page="${link.page}">
        ${link.label}
      </a>`
  ).join("");

  return `
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#16161a]/80 backdrop-blur-md" role="navigation" aria-label="Main navigation">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="${base}index.html" class="text-[#eceae6] font-medium tracking-tight hover:opacity-80 transition-opacity">
          ${SITE.domain}
        </a>

        <div class="hidden md:flex items-center gap-8">
          ${links}
          <button id="theme-toggle" class="p-2 rounded-lg text-[#9b9aa3] hover:text-[#eceae6] hover:bg-white/[0.04] transition-all" aria-label="Toggle theme" title="Toggle theme">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </button>
        </div>

        <div class="flex md:hidden items-center gap-3">
          <button id="theme-toggle-mobile" class="p-2 rounded-lg text-[#9b9aa3] hover:text-[#eceae6] transition-all" aria-label="Toggle theme">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </button>
          <button id="mobile-menu-btn" class="p-2 rounded-lg text-[#9b9aa3] hover:text-[#eceae6] transition-all" aria-label="Open menu" aria-expanded="false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu fixed top-16 right-0 bottom-0 w-64 bg-[#1e1e24] border-l border-white/[0.06] z-50 md:hidden" aria-hidden="true">
        <div class="flex flex-col p-6 gap-4">
          ${NAV_LINKS.map(
            (link) => `
            <a href="${base}${link.href}" class="nav-link text-lg py-2 ${link.page === currentPage ? "active" : ""}">
              ${link.label}
            </a>`
          ).join("")}
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const base = getBasePath();
  return `
    <footer class="border-t border-white/[0.06] mt-24">
      <div class="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p class="text-[#9b9aa3] text-sm">&copy; ${new Date().getFullYear()} ${SITE.name}</p>
        <div class="flex items-center gap-6">
          <a href="${SITE.github}" target="_blank" rel="noopener noreferrer" class="text-[#9b9aa3] hover:text-[#7ba7d4] transition-colors text-sm">GitHub</a>
          <a href="mailto:${SITE.email}" class="text-[#9b9aa3] hover:text-[#7ba7d4] transition-colors text-sm">${SITE.email}</a>
          <a href="${base}${SITE.resume}" class="inline-flex items-center gap-2 px-4 py-2 text-sm border border-white/[0.06] rounded-lg text-[#eceae6] hover:border-[#7ba7d4]/30 hover:text-[#7ba7d4] transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Resume
          </a>
        </div>
      </div>
    </footer>
  `;
}

function renderModals() {
  return `
    <div id="light-mode-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-panel">
        <div class="w-10 h-10 mx-auto mb-4 rounded-full bg-[#7ba7d4]/10 flex items-center justify-center">
          <svg class="w-5 h-5 text-[#7ba7d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </div>
        <h2 id="modal-title" class="text-lg font-medium text-[#eceae6] mb-2">Light mode has been disabled for this environment.</h2>
        <p class="text-sm text-[#9b9aa3] mb-6">Some spaces are meant to stay dark.</p>
        <button id="modal-close" class="px-5 py-2 text-sm bg-[#252530] border border-white/[0.06] rounded-lg text-[#eceae6] hover:border-[#7ba7d4]/30 transition-all">
          Understood
        </button>
      </div>
    </div>

    <div id="command-palette" class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
      <div class="command-panel mx-4">
        <input type="text" id="command-input" class="command-input" placeholder="Search pages and actions..." autocomplete="off" aria-label="Command search">
        <div id="command-results" class="command-results" role="listbox"></div>
      </div>
    </div>
  `;
}

function initLayout(currentPage) {
  const navSlot = document.getElementById("navbar");
  const footerSlot = document.getElementById("footer");
  const modalsSlot = document.getElementById("modals");

  if (navSlot) navSlot.innerHTML = renderNavbar(currentPage);
  if (footerSlot) footerSlot.innerHTML = renderFooter();
  if (modalsSlot) modalsSlot.innerHTML = renderModals();
}

function badgeClass(status) {
  const map = {
    "In Progress": "badge-progress",
    Researching: "badge-researching",
    Completed: "badge-completed",
    Archived: "badge-archived",
  };
  return map[status] || "badge-progress";
}
