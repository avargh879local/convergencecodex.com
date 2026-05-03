import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const site = "https://www.convergencecodex.com";
const date = "2026-05-03";

const shared = {
  siteName: "The Convergence Codex",
  author: "The Convergence Codex Research Project",
  image: `${site}/assets/social-card.svg`,
  feed: `${site}/feed.xml`,
  llms: `${site}/llms.txt`,
};

const pages = [
  {
    path: "index.html",
    url: `${site}/`,
    label: "Home",
    type: "WebPage",
    headline: "The Convergence Codex",
    description:
      "A comparative eschatology research project studying Al-Mahdi, Dajjal, the Biblical Antichrist, the False Prophet, Gog and Magog, and related end-times texts.",
  },
  {
    path: "mahdi-vs-antichrist/index.html",
    url: `${site}/mahdi-vs-antichrist/`,
    label: "Mahdi vs Antichrist",
    type: "ScholarlyArticle",
    headline: "Is Al-Mahdi the Biblical Antichrist?",
    description:
      "A careful comparison of Al-Mahdi in Islamic eschatology and the Biblical Antichrist or Beast, with arguments for, against, and a three-lens research framework.",
    faqs: [
      {
        q: "Does Islam call Al-Mahdi the Antichrist?",
        a: "No. Al-Mahdi is presented positively in Islamic eschatology. The comparison on this site asks whether the same future figure could be interpreted through opposite theological lenses, not whether Islam uses the Biblical term Antichrist.",
      },
      {
        q: "What is the strongest argument for comparing Mahdi and Antichrist?",
        a: "The strongest argument is structural: both discussions involve a final political-religious ruler, a crisis around allegiance, and a larger end-times cast involving Jesus, a deceiver figure, and final judgment.",
      },
      {
        q: "What is the strongest objection to the thesis?",
        a: "The strongest objection is that the Biblical Antichrist or man of lawlessness is associated with self-exaltation and deception, while Al-Mahdi is not described in Islamic sources as claiming divinity. Dajjal more obviously fits many deceiver traits.",
      },
    ],
  },
  {
    path: "who-is-al-mahdi/index.html",
    url: `${site}/who-is-al-mahdi/`,
    label: "Who Is Al-Mahdi?",
    type: "ScholarlyArticle",
    headline: "Who Is Al-Mahdi?",
    description:
      "A beginner-friendly guide to Al-Mahdi in Islamic eschatology, where the idea comes from, what hadith say, and why the figure matters in end-times comparison.",
    faqs: [
      {
        q: "Is Al-Mahdi named directly in the Quran?",
        a: "No. The detailed figure of Al-Mahdi comes mainly from hadith, sectarian traditions, and later Islamic eschatological interpretation rather than a direct Quranic name.",
      },
      {
        q: "What is Al-Mahdi expected to do?",
        a: "Many traditions describe Al-Mahdi as a guided ruler who restores justice after oppression and leads the Muslim community near the end of history.",
      },
      {
        q: "Is belief in Al-Mahdi identical across all Muslims?",
        a: "No. Sunni and Shia traditions discuss the Mahdi differently, and individual narrations vary in wording, sequence, and hadith grading.",
      },
    ],
  },
  {
    path: "who-is-dajjal/index.html",
    url: `${site}/who-is-dajjal/`,
    label: "Who Is Dajjal?",
    type: "ScholarlyArticle",
    headline: "Who Is Al-Masih ad-Dajjal?",
    description:
      "A beginner guide to Al-Masih ad-Dajjal, the great deceiver in Islamic eschatology, with comparison to Antichrist and False Prophet motifs.",
    faqs: [
      {
        q: "Is Dajjal the same as the Biblical Antichrist?",
        a: "Dajjal shares major Antichrist-like traits such as deception and false signs, but the mapping is not simple because the Biblical Antichrist/Beast is often a political ruler while Dajjal is more directly a deceiving wonder-worker.",
      },
      {
        q: "Who defeats Dajjal in Islamic tradition?",
        a: "In major Islamic end-times traditions, Isa ibn Maryam, Jesus son of Mary, descends and kills Dajjal.",
      },
      {
        q: "Why does this site compare Dajjal with the False Prophet?",
        a: "Revelation's False Prophet performs signs and deceives people into allegiance to the Beast. That sign-working role overlaps with some Dajjal themes more than a simple political-ruler comparison does.",
      },
    ],
  },
  {
    path: "antichrist-in-the-bible/index.html",
    url: `${site}/antichrist-in-the-bible/`,
    label: "Antichrist in the Bible",
    type: "ScholarlyArticle",
    headline: "Where Does The Antichrist Idea Come From?",
    description:
      "Where the Antichrist idea comes from in the Bible, including 1 John, Daniel, 2 Thessalonians, Revelation, the Beast, and the man of lawlessness.",
    faqs: [
      {
        q: "Where does the word Antichrist appear in the Bible?",
        a: "The direct word Antichrist appears in the letters of John, especially 1 John and 2 John. Later Christian interpretation connects that language with Daniel, 2 Thessalonians, and Revelation.",
      },
      {
        q: "Is the Beast of Revelation always called the Antichrist?",
        a: "Revelation calls the figure the Beast, not directly the Antichrist. Many Christian interpreters connect the Beast with the Antichrist as part of a broader doctrinal synthesis.",
      },
      {
        q: "Why does Daniel matter for Antichrist studies?",
        a: "Daniel contains final-ruler, persecution, covenant, and abomination themes that many futurist interpreters connect with the final enemy described elsewhere in the New Testament.",
      },
    ],
  },
  {
    path: "false-prophet-revelation/index.html",
    url: `${site}/false-prophet-revelation/`,
    label: "False Prophet",
    type: "ScholarlyArticle",
    headline: "Who Is The False Prophet?",
    description:
      "A focused guide to Revelation's False Prophet, the second beast, fire from heaven, and why some compare this role with Islamic end-times figures.",
    faqs: [
      {
        q: "What does the False Prophet do in Revelation?",
        a: "The False Prophet or second beast performs signs, promotes allegiance to the first Beast, and helps enforce the Beast system.",
      },
      {
        q: "Why is fire from heaven important?",
        a: "Revelation 13 says the second beast makes fire come down from heaven, a miracle strongly associated with Elijah in the Hebrew Bible. This creates a counterfeit-prophet theme.",
      },
    ],
  },
  {
    path: "gog-and-magog-bible-quran/index.html",
    url: `${site}/gog-and-magog-bible-quran/`,
    label: "Gog and Magog",
    type: "ScholarlyArticle",
    headline: "Gog and Magog in the Bible and Quran",
    description:
      "A comparison of Gog and Magog in Ezekiel, Revelation, the Quran, and Islamic hadith, including Ya'juj and Ma'juj and end-times sequence questions.",
    faqs: [
      {
        q: "Are Gog and Magog found in both the Bible and Islamic sources?",
        a: "Yes. Gog and Magog appear in Ezekiel and Revelation, while Ya'juj and Ma'juj appear in the Quran and hadith. The names are one of the strongest shared-name parallels.",
      },
      {
        q: "Do the Bible and Islamic traditions place Gog and Magog in the same timeline?",
        a: "Not exactly. The names and broad divine-destruction theme overlap, but Revelation and Islamic hadith place the event in different sequence frameworks.",
      },
    ],
  },
  {
    path: "biblical-end-times-timeline/index.html",
    url: `${site}/biblical-end-times-timeline/`,
    label: "Biblical End Times Timeline",
    type: "ScholarlyArticle",
    headline: "Biblical End Times Timeline",
    description:
      "A beginner timeline of major Biblical end-times figures and events used in the Convergence Codex comparison.",
    faqs: [
      {
        q: "Is this timeline accepted by every Christian tradition?",
        a: "No. This page presents a simplified futurist timeline used for comparison. Other Christian traditions read Daniel, Matthew, Thessalonians, and Revelation differently.",
      },
      {
        q: "Why compare timelines instead of only traits?",
        a: "Timelines show who rises, who endorses whom, and who defeats whom. Those sequence questions are crucial in Mahdi, Dajjal, Antichrist, and False Prophet comparisons.",
      },
    ],
  },
  {
    path: "islamic-end-times-timeline/index.html",
    url: `${site}/islamic-end-times-timeline/`,
    label: "Islamic End Times Timeline",
    type: "ScholarlyArticle",
    headline: "Islamic End Times Timeline",
    description:
      "A beginner timeline of major Islamic end-times figures and events, including Al-Mahdi, Dajjal, Isa, and Ya'juj wa Ma'juj.",
    faqs: [
      {
        q: "Does every Islamic scholar give the same end-times sequence?",
        a: "No. The broad figures are well known, but exact ordering and interpretation can vary across hadith reports, scholars, and sectarian traditions.",
      },
      {
        q: "Why does Isa matter in the Islamic timeline?",
        a: "Isa ibn Maryam descends near the end in major Islamic traditions, aligns with the Muslim community, and kills Dajjal.",
      },
    ],
  },
  {
    path: "sources/index.html",
    url: `${site}/sources/`,
    label: "Sources",
    type: "CollectionPage",
    headline: "Sources For The Study",
    description:
      "Primary source map for the Convergence Codex: Bible passages, Quran passages, hadith references, and modern debate voices.",
  },
  {
    path: "about/index.html",
    url: `${site}/about/`,
    label: "About",
    type: "AboutPage",
    headline: "About The Convergence Codex",
    description:
      "About The Convergence Codex, a comparative eschatology research project studying Al-Mahdi, Dajjal, the Biblical Antichrist, and related end-times figures.",
  },
  {
    path: "methodology/index.html",
    url: `${site}/methodology/`,
    label: "Methodology",
    type: "ScholarlyArticle",
    headline: "How This Study Compares Texts",
    description:
      "The research method behind The Convergence Codex: primary sources, three lenses, strength ratings, and careful distinction between scripture and interpretation.",
  },
  {
    path: "privacy/index.html",
    url: `${site}/privacy/`,
    label: "Privacy",
    type: "WebPage",
    headline: "Privacy Policy",
    description: "Privacy policy for The Convergence Codex.",
  },
  {
    path: "contact/index.html",
    url: `${site}/contact/`,
    label: "Contact",
    type: "ContactPage",
    headline: "Contact The Convergence Codex",
    description:
      "Contact and correction page for The Convergence Codex research project.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripBlock(html, name) {
  return html.replace(
    new RegExp(`\\n?<!-- ${name} START -->[\\s\\S]*?<!-- ${name} END -->\\n?`, "g"),
    "\n",
  );
}

function extractTitle(html, fallback) {
  return html.match(/<title>([^<]+)<\/title>/)?.[1] ?? fallback;
}

function extractDescription(html, fallback) {
  return html.match(/<meta name="description" content="([^"]+)">/)?.[1] ?? fallback;
}

function breadcrumbGraph(page) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${site}/`,
    },
  ];

  if (page.url !== `${site}/`) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.label,
      item: page.url,
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${page.url}#breadcrumbs`,
    itemListElement: items,
  };
}

function pageGraph(page, title, description) {
  const base = {
    "@type": page.type,
    "@id": `${page.url}#webpage`,
    url: page.url,
    name: title,
    headline: page.headline,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${site}/#website` },
    about: [
      "Al-Mahdi",
      "Dajjal",
      "Antichrist",
      "False Prophet",
      "Gog and Magog",
      "Comparative eschatology",
    ],
    breadcrumb: { "@id": `${page.url}#breadcrumbs` },
    datePublished: date,
    dateModified: date,
    author: { "@id": `${site}/about/#organization` },
    publisher: { "@id": `${site}/about/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: shared.image,
      width: 1200,
      height: 630,
    },
  };

  return base;
}

function faqGraph(page) {
  if (!page.faqs?.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${page.url}#faq`,
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

function jsonLd(page, title, description) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site}/about/#organization`,
      name: shared.siteName,
      url: `${site}/`,
      logo: {
        "@type": "ImageObject",
        url: shared.image,
        width: 1200,
        height: 630,
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: shared.siteName,
      description:
        "A public research map comparing Islamic, Biblical, and secular end-times interpretations.",
      inLanguage: "en-US",
      publisher: { "@id": `${site}/about/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.google.com/search?q=site%3Aconvergencecodex.com+{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    pageGraph(page, title, description),
    breadcrumbGraph(page),
  ];

  const faq = faqGraph(page);
  if (faq) graph.push(faq);

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph,
    },
    null,
    2,
  );
}

function advancedHead(page, title, description) {
  const type = page.type.includes("Article") ? "article" : "website";
  const articleMeta =
    type === "article"
      ? `\n<meta property="article:published_time" content="${date}T00:00:00-05:00">\n<meta property="article:modified_time" content="${date}T00:00:00-05:00">\n<meta property="article:section" content="Comparative Eschatology">`
      : "";

  return `<!-- ADVANCED SEO START -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="${escapeHtml(shared.author)}">
<meta property="og:site_name" content="${escapeHtml(shared.siteName)}">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="${shared.image}">
<meta property="og:image:type" content="image/svg+xml">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="${shared.image}">
<link rel="alternate" type="application/rss+xml" title="The Convergence Codex updates" href="${shared.feed}">
<link rel="help" type="text/plain" href="${shared.llms}">${articleMeta}
<script type="application/ld+json">
${jsonLd(page, title, description)}
</script>
<!-- ADVANCED SEO END -->`;
}

function faqSection(page) {
  if (!page.faqs?.length) return "";

  const details = page.faqs
    .map(
      (faq) => `    <details>
      <summary>${escapeHtml(faq.q)}</summary>
      <p>${escapeHtml(faq.a)}</p>
    </details>`,
    )
    .join("\n");

  return `<!-- FAQ SECTION START -->
  <section class="faq-list" id="faq">
    <h2>Quick Questions</h2>
${details}
  </section>
<!-- FAQ SECTION END -->
`;
}

for (const page of pages) {
  const file = join(publicDir, page.path);
  let html = readFileSync(file, "utf8");
  html = stripBlock(html, "ADVANCED SEO");
  html = stripBlock(html, "FAQ SECTION");

  const title = extractTitle(html, page.headline);
  const description = extractDescription(html, page.description);
  html = html.replace("</head>", `${advancedHead(page, title, description)}\n</head>`);

  const faq = faqSection(page);
  if (faq) {
    if (html.includes('<div class="cta-strip">')) {
      html = html.replace('<div class="cta-strip">', `${faq}\n  <div class="cta-strip">`);
    } else {
      html = html.replace("</main>", `${faq}</main>`);
    }
  }

  writeFileSync(file, html.replace(/[ \t]+$/gm, ""));
}
