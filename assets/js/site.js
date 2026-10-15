/* ============================================================================
   EMORY SUSTAINABLE BUSINESS GROUP — SHARED SCRIPT
   ============================================================================
   Every page loads this file. It:
     1. Builds the header (page tabs only) and footer, so they only need
        editing HERE.
     2. Handles the mobile menu and the header shadow on scroll.
     3. Fades sections in as you scroll (optional).
     4. Shows initials in place of any headshot photo that is missing.

   TO ADD, REMOVE OR RENAME A PAGE IN THE MENU
     Edit the PAGES list just below. Each line is one menu link:
       { id: "about", label: "About Us", href: "about.html" }
     - "id" must match the data-page attribute on that page's <body> tag,
       which is how the menu knows which link to underline.
     - Delete a line to remove it from the menu and footer.
     - If you delete a page, also delete its .html file.
   ============================================================================ */


/* ---------- Site settings: edit these ---------- */

const PAGES = [
  { id: "home",     label: "Home",        href: "index.html"   },
  { id: "about",    label: "About Us",    href: "about.html"   },
  { id: "clients",  label: "Our Clients", href: "clients.html" },
  { id: "team",     label: "Our Team",    href: "team.html"    },
  { id: "events",   label: "Events",      href: "events.html"  },
  { id: "join",     label: "Join SBG",    href: "join.html"    },
  { id: "contact",  label: "Contact",     href: "contact.html" }
];

// SBG logo files. The black logo is used in the header (light background), the white logo in the footer.
const WHITE_LOGO_IMAGE = "images/white-logo.png";
const BLACK_LOGO_IMAGE = "images/black-logo.png";

const CONTACT_EMAIL = "emorysustainablebusiness@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/emorysbg/";
const LINKEDIN_URL  = "https://www.linkedin.com/company/emory-sustainable-business-group/home/";

/* ---------- 1. Header and footer ---------- */

const currentPage = document.body.dataset.page;

// Builds an <a> tag for a page, marking it active if it is the current page
function navLink(page) {
  return `<a href="${page.href}"${page.id === currentPage ? ' class="is-active"' : ""}>${page.label}</a>`;
}

// Builds the SBG logo as a link to the home page
function logoLink(imageFile) {
  return `
  <a href="index.html" class="logo" aria-label="Emory Sustainable Business Group home">
    <img class="logo-img" src="${imageFile}" alt="Emory Sustainable Business Group" onerror="this.remove()">
  </a>`;
}

const ICONS = {
  menu:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>',
  linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z"/></svg>',
  email:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};

document.body.insertAdjacentHTML("afterbegin", `
  <header class="site-header">
    <div class="container">
      ${logoLink(BLACK_LOGO_IMAGE)}
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${PAGES.map(navLink).join("")}
      </nav>
    </div>
  </header>`);

document.body.insertAdjacentHTML("beforeend", `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          ${logoLink(WHITE_LOGO_IMAGE)}
          <div class="socials">
            <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
            ${LINKEDIN_URL ? `<a href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>` : ""}
            <a href="mailto:${CONTACT_EMAIL}" aria-label="Email">${ICONS.email}</a>
          </div>
        </div>
        <div>
          <h4>Get Involved</h4>
          <ul>
            <li><a href="join.html">Join SBG</a></li>
            <li><a href="contact.html">Become a Client</a></li>
            <li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} Emory Sustainable Business Group</span>
        <a href="#">Back to top &uarr;</a>
      </div>
    </div>
  </footer>`);


/* ---------- 2. Mobile menu and header shadow ---------- */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


/* ---------- 3. Fade-in on scroll (elements with class="reveal") ---------- */

document.documentElement.classList.add("js");   // the CSS only hides .reveal items when JS is running

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}


/* ---------- 4. Missing photos fall back to placeholders ---------- */
// If a headshot (.avatar), photo (.photo) or client logo (.project-logo) can't be
// found, remove the broken image so the initials or the placeholder show instead.

document.querySelectorAll(".avatar img, .photo img, .project-logo img").forEach(img => {
  const hide = () => img.remove();
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener("error", hide);
});
