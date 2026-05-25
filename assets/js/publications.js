/* ===========================================
   Publications data + renderer
   Edit this file to add/update publications.
   =========================================== */

window.PUBLICATIONS = [
  {
    id: 'scene-acl26',
    year: 2026,
    venue: 'ACL 2026',
    venueLong: 'The 64th Annual Meeting of the Association for Computational Linguistics',
    venueTier: 'top',
    tags: ['nlp', 'recsys', 'xr'],
    title: 'Evaluating Scene-based In-Situ Item Labeling for Immersive Conversational Recommendation',
    authors: [
      { name: 'Jiazhou Liang', me: true, equal: true },
      { name: 'Yifan Simon Liu', equal: true },
      { name: 'David Guo', equal: true },
      { name: 'Minqi Sun' },
      { name: 'Yilun Jiang' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'We study how in-situ item labels rendered into the user\'s visual scene affect immersive conversational recommendation, and propose a new evaluation protocol that disentangles label salience, scene grounding, and dialogue quality.',
    pdf: 'papers/2026-acl-scene-labeling.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@article{liang2026evaluating,
  title   = {Evaluating Scene-based In-Situ Item Labeling for Immersive Conversational Recommendation},
  author  = {Liang, Jiazhou and Liu, Yifan Simon and Guo, David and Sun, Minqi and Jiang, Yilun and Sanner, Scott},
  journal = {arXiv preprint arXiv:2604.09698},
  year    = {2026},
  note    = {To appear, ACL 2026}
}`,
  },
  {
    id: 'mm-gpr-acl26',
    year: 2026,
    venue: 'ACL 2026',
    venueLong: 'The 64th Annual Meeting of the Association for Computational Linguistics',
    venueTier: 'top',
    tags: ['nlp', 'recsys', 'retrieval'],
    title: 'Multimodal Item Scoring for Natural Language Recommendation via Gaussian Process Regression with LLM Relevance Judgments',
    authors: [
      { name: 'Yifan Liu', equal: true },
      { name: 'Qianfeng Wen', equal: true },
      { name: 'Jiazhou Liang', me: true, equal: true },
      { name: 'Mark Zhao', equal: true },
      { name: 'Justin Cui' },
      { name: 'Anton Korikov' },
      { name: 'Armin Toroghi' },
      { name: 'Junyoung Kim' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'A Gaussian-process scoring approach that combines multimodal item embeddings with LLM-elicited relevance judgments to power natural-language recommendation with calibrated uncertainty.',
    pdf: 'papers/2026-acl-mm-gpr.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@article{liu2025multimodal,
  title   = {Multimodal Item Scoring for Natural Language Recommendation via Gaussian Process Regression with LLM Relevance Judgments},
  author  = {Liu, Yifan and Wen, Qianfeng and Liang, Jiazhou and Zhao, Mark and Cui, Justin and Korikov, Anton and Toroghi, Armin and Kim, Junyoung and Sanner, Scott},
  journal = {arXiv preprint arXiv:2510.22023},
  year    = {2025},
  note    = {To appear, ACL 2026}
}`,
  },
  {
    id: 'bald-acl26',
    year: 2026,
    venue: 'ACL 2026',
    venueLong: 'The 64th Annual Meeting of the Association for Computational Linguistics',
    venueTier: 'top',
    tags: ['nlp', 'retrieval'],
    title: 'Bayesian Active Learning with Gaussian Processes Guided by LLM Relevance Scoring for Dense Passage Retrieval',
    authors: [
      { name: 'Junyoung Kim' },
      { name: 'Anton Korikov' },
      { name: 'Jiazhou Liang', me: true },
      { name: 'Justin Cui' },
      { name: 'Yifan Simon Liu' },
      { name: 'Qianfeng Wen' },
      { name: 'Mark Zhao' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'A Bayesian active learning strategy that uses Gaussian processes guided by LLM relevance scoring to select informative passages for training dense retrievers, reducing annotation cost while improving downstream recall.',
    pdf: 'papers/2026-acl-bald.pdf',
    code: '',
    project: '',
    bibtex: `@article{kim2026bayesian,
  title   = {Bayesian Active Learning with Gaussian Processes Guided by LLM Relevance Scoring for Dense Passage Retrieval},
  author  = {Kim, Junyoung and Korikov, Anton and Liang, Jiazhou and Cui, Justin and Liu, Yifan Simon and Wen, Qianfeng and Zhao, Mark and Sanner, Scott},
  journal = {arXiv preprint arXiv:2604.17906},
  year    = {2026},
  note    = {To appear, ACL 2026}
}`,
  },
  {
    id: 'sxpath-acl26',
    year: 2026,
    venue: 'ACL 2026 Demo',
    venueLong: 'ACL 2026 System Demonstrations',
    venueTier: 'top',
    tags: ['nlp', 'memory', 'agents'],
    title: 'Semantic XPath: Structured Agentic Memory Access for Conversational AI',
    authors: [
      { name: 'Yifan Simon Liu', equal: true },
      { name: 'Ruifan Wu', equal: true },
      { name: 'Liam Gallagher', equal: true },
      { name: 'Jiazhou Liang', me: true, equal: true },
      { name: 'Armin Toroghi' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'A demo of Semantic XPath, an addressable memory layer that lets conversational agents query their own knowledge graph with structured, composable paths instead of opaque vector recall.',
    pdf: 'papers/2026-acl-semantic-xpath.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@article{liu2026semantic,
  title   = {Semantic XPath: Structured Agentic Memory Access for Conversational AI},
  author  = {Liu, Yifan Simon and Wu, Ruifan and Gallagher, Liam and Liang, Jiazhou and Toroghi, Armin and Sanner, Scott},
  journal = {arXiv preprint arXiv:2603.01160},
  year    = {2026},
  note    = {To appear, ACL 2026 (Demo)}
}`,
  },
  {
    id: 'nlpddl-iclr26',
    year: 2026,
    venue: 'ICLR 2026',
    venueLong: 'The Fourteenth International Conference on Learning Representations',
    venueTier: 'top',
    tags: ['nlp', 'planning', 'embodied'],
    title: 'Natural Language PDDL (NL-PDDL) for Open-world Goal-oriented Commonsense Regression Planning in Embodied AI',
    authors: [
      { name: 'Xiaotian Liu' },
      { name: 'Armin Toroghi' },
      { name: 'Jiazhou Liang', me: true },
      { name: 'David Courtis' },
      { name: 'Ruiwen Li' },
      { name: 'Ali Pesaranghader' },
      { name: 'Jaehong Kim' },
      { name: 'Tanmana Sadhu' },
      { name: 'Hyejeong Jeon' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'We lift classical PDDL planning to natural-language predicates, enabling open-world embodied agents to reason about commonsense goals and regress plans through a learned language interface.',
    pdf: 'papers/2026-iclr-nl-pddl.pdf',
    code: '',
    project: '',
    bibtex: `@inproceedings{liu2026natural,
  title     = {Natural Language PDDL (NL-PDDL) for Open-world Goal-oriented Commonsense Regression Planning in Embodied AI},
  author    = {Liu, Xiaotian and Toroghi, Armin and Liang, Jiazhou and Courtis, David and Li, Ruiwen and Pesaranghader, Ali and Kim, Jaehong and Sadhu, Tanmana and Jeon, Hyejeong and Sanner, Scott},
  booktitle = {The Fourteenth International Conference on Learning Representations (ICLR)},
  year      = {2026}
}`,
  },
  {
    id: 'linpc-aaai26',
    year: 2026,
    venue: 'AAAI 2026',
    venueLong: 'Proceedings of the AAAI Conference on Artificial Intelligence',
    venueTier: 'top',
    tags: ['ml', 'optimization'],
    title: 'Near-optimal Linear Predictive Clustering in Non-separable Spaces via MIP and QPBO Reductions',
    authors: [
      { name: 'Jiazhou Liang', me: true, equal: true },
      { name: 'Hassan Khurram', equal: true },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'A mixed-integer programming and QPBO reduction approach to linear predictive clustering that yields near-optimal solutions even when classes are not linearly separable, with strong empirical gains over heuristic baselines.',
    pdf: 'papers/2026-aaai-linpc.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@inproceedings{liang2026near,
  title     = {Near-optimal Linear Predictive Clustering in Non-separable Spaces via MIP and QPBO Reductions},
  author    = {Liang, Jiazhou and Khurram, Hassan and Sanner, Scott},
  booktitle = {Proceedings of the AAAI Conference on Artificial Intelligence},
  volume    = {40},
  number    = {28},
  pages     = {23409--23416},
  year      = {2026}
}`,
  },
  {
    id: 'vogue-umap26',
    year: 2026,
    venue: 'UMAP 2026',
    venueLong: '34th ACM Conference on User Modeling, Adaptation and Personalization',
    tags: ['recsys', 'multimodal'],
    title: 'VOGUE: A Multimodal Dataset for Conversational Recommendation in Fashion',
    authors: [
      { name: 'David Guo' },
      { name: 'Minqi Sun' },
      { name: 'Yilun Jiang' },
      { name: 'Jiazhou Liang', me: true },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'VOGUE is a large-scale multimodal dataset pairing fashion items, user dialogues, and visual context to benchmark conversational recommendation in a rich, visually-grounded setting.',
    pdf: 'papers/2026-umap-vogue.pdf',
    code: '',
    project: '',
    bibtex: `@article{guo2025vogue,
  title   = {VOGUE: A Multimodal Dataset for Conversational Recommendation in Fashion},
  author  = {Guo, David and Sun, Minqi and Jiang, Yilun and Liang, Jiazhou and Sanner, Scott},
  journal = {arXiv preprint arXiv:2510.21151},
  year    = {2025},
  note    = {To appear, UMAP 2026}
}`,
  },
  {
    id: 'mapping-smr26',
    year: 2026,
    venue: 'Sociological Methods & Research',
    venueLong: 'Sociological Methods & Research (journal)',
    tags: ['ml', 'optimization', 'social'],
    title: 'Mapping Social Change: A Unified Framework for Temporal Clustering',
    authors: [
      { name: 'Jiazhou Liang', me: true },
      { name: 'Jolomi Tosanwumi' },
      { name: 'Ethan Fosse' },
      { name: 'Daniel Silver' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'A unified optimization framework for temporal clustering of social data, enabling consistent comparison of structural change across time and across competing clustering objectives.',
    pdf: 'papers/2026-smr-mapping.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@article{liang2026mapping,
  title     = {Mapping Social Change: A Unified Framework for Temporal Clustering},
  author    = {Liang, Jiazhou and Tosanwumi, Jolomi and Fosse, Ethan and Silver, Daniel and Sanner, Scott},
  journal   = {Sociological Methods \\& Research},
  pages     = {00491241251396789},
  year      = {2026},
  publisher = {SAGE Publications}
}`,
  },
  {
    id: 'madpr-emnlp25',
    year: 2025,
    venue: 'EMNLP 2025',
    venueLong: '2025 Conference on Empirical Methods in Natural Language Processing',
    venueTier: 'top',
    tags: ['nlp', 'retrieval'],
    title: 'MA-DPR: Manifold-aware Distance Metrics for Dense Passage Retrieval',
    authors: [
      { name: 'Yifan Liu' },
      { name: 'Qianfeng Wen' },
      { name: 'Mark Zhao' },
      { name: 'Jiazhou Liang', me: true },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'MA-DPR introduces a manifold-aware distance metric for dense passage retrieval that respects the local geometry of the embedding space, improving retrieval quality without changing the retriever architecture.',
    pdf: 'papers/2025-emnlp-ma-dpr.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@inproceedings{liu2025ma,
  title     = {MA-DPR: Manifold-aware Distance Metrics for Dense Passage Retrieval},
  author    = {Liu, Yifan and Wen, Qianfeng and Zhao, Mark and Liang, Jiazhou and Sanner, Scott},
  booktitle = {Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP)},
  pages     = {31073--31091},
  year      = {2025}
}`,
  },
  {
    id: 'tscluster-2024',
    year: 2024,
    venue: 'Environment and Planning B',
    venueLong: 'Environment and Planning B: Urban Analytics and City Science',
    tags: ['ml', 'software', 'social'],
    title: 'tscluster: A Python Package for the Optimal Temporal Clustering Framework',
    authors: [
      { name: 'Jolomi Tosanwumi', equal: true },
      { name: 'Jiazhou Liang', me: true, equal: true },
      { name: 'Daniel Silver' },
      { name: 'Ethan Fosse' },
      { name: 'Scott Sanner' },
    ],
    abstract:
      'tscluster is an open-source Python package implementing the optimal temporal clustering framework, providing tunable solvers, evaluation utilities, and reproducible workflows for urban analytics.',
    pdf: 'papers/2024-tscluster.pdf',
    code: 'https://github.com/joeliang0520',
    project: '',
    bibtex: `@article{tosanwumi2024tscluster,
  title     = {tscluster: A Python Package for the Optimal Temporal Clustering Framework},
  author    = {Tosanwumi, Jolomi and Liang, Jiazhou and Silver, Daniel and Fosse, Ethan and Sanner, Scott},
  journal   = {Environment and Planning B: Urban Analytics and City Science},
  pages     = {23998083241293833},
  year      = {2024},
  publisher = {SAGE Publications}
}`,
  },
];

/* ---- renderer ---- */
function authorString(authors) {
  return authors
    .map((a) => {
      const cls = [a.me ? 'me' : '', a.equal ? 'equal' : ''].filter(Boolean).join(' ');
      return cls
        ? `<span class="${cls}">${a.name}${a.equal ? '*' : ''}</span>`
        : `<span>${a.name}</span>`;
    })
    .join(', ');
}

function pubHTML(p, idx) {
  const hasAny = (p.authors || []).some((a) => a.equal);
  const num = String(idx + 1).padStart(2, '0');
  const tags = (p.tags || []).join(' ');

  const iconPDF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>`;
  const iconCode = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  const iconLink = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>`;
  const iconBook = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="16" rx="2"/><path d="M21 8v12a2 2 0 0 1-2 2H7"/></svg>`;

  return `
  <article class="pub" data-tags="${tags}">
    <div class="pub-num">${num}<div class="pub-venue-badge">${p.year}</div></div>
    <div class="pub-body">
      <h3 class="pub-title">${p.title}</h3>
      <div class="pub-authors">${authorString(p.authors)}</div>
      <div class="pub-venue">
        <span class="tag${p.venueTier === 'top' ? ' top' : ''}">${p.venue}</span>
        <span class="year">${p.venueLong || ''}</span>
        ${hasAny ? '<span class="year">★ equal contribution</span>' : ''}
      </div>
      <div class="pub-actions">
        ${p.pdf ? `<a class="pub-btn accent" href="${p.pdf}" target="_blank" rel="noopener">${iconPDF} PDF</a>` : ''}
        ${p.code ? `<a class="pub-btn" href="${p.code}" target="_blank" rel="noopener">${iconCode} Code</a>` : ''}
        ${p.project ? `<a class="pub-btn" href="${p.project}" target="_blank" rel="noopener">${iconLink} Project</a>` : ''}
        <button class="pub-btn" data-expand="abstract">${iconBook} Abstract</button>
        <button class="pub-btn" data-expand="bibtex">${iconBook} BibTeX</button>
      </div>
      <div class="pub-expand" data-panel="abstract">
        <h5>Abstract</h5>
        <p>${p.abstract}</p>
      </div>
      <div class="pub-expand" data-panel="bibtex">
        <h5>BibTeX</h5>
        <pre>${p.bibtex.replace(/</g, '&lt;')}</pre>
        <button class="copy" data-copy>Copy</button>
      </div>
    </div>
    <div class="pub-aside"></div>
  </article>`;
}

window.renderPubs = function (container, options = {}) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  let list = window.PUBLICATIONS.slice();
  if (options.limit) list = list.slice(0, options.limit);
  el.innerHTML = list.map((p, i) => pubHTML(p, i)).join('');
};
