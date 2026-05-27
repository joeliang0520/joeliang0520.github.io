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
      'The growing ubiquity of Extended Reality (XR) is driving Conversational Recommendation Systems (CRS) toward visually immersive experiences. We formalize this paradigm as Immersive CRS (ICRS), where recommended items are highlighted directly in the user’s scene-based visual environment and augmented with in-situ labels. While item recommendation has been widely studied, the problem of how to select and evaluate which information to present as immersive labels remains an open problem. To this end, we introduce a principled categorization of information needs into explicit intent satisfaction and proactive information needs and use these to define novel evaluation metrics for item label selection. We benchmark IR-, LLM-, and VLM-based methods across three datasets and ICRS scenarios: fashion, movie recommendation, and retail shopping. Our evaluation reveals three important limitations of existing methods: (1) they fail to leverage scenario-specific information modalities (e.g., visual cues for fashion, metadata for retail), (2) they present redundant information that is visually inferable, and (3) they poorly anticipate users’ proactive information needs from explicit dialogue alone. In summary, this work provides both a novel evaluation paradigm for in-situ item labeling in ICRS and highlights key challenges for future work.',
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
      'Natural Language Recommendation (NLRec) generates item suggestions based on the relevance between user-issued NL requests and NL item description passages. Existing NLRec approaches often use Dense Retrieval (DR) to compute item relevance scores from aggregation of inner products between user request embeddings and relevant passage embeddings. However, DR views the request as the sole relevance signal, resulting in a unimodal scoring function centered on the request embedding, which is often a weak proxy for true relevance. To better capture the multiple relevance modes that may arise in complex NLRec data, we propose GPR-LLM, which uses Gaussian Process Regression (GPR) to estimate the underlying relevance function from multiple LLMjudged anchor passages instead of treating the request as the sole relevance signal. Experiments on four NLRec datasets and three LLM backbones demonstrate that GPR-LLM consistently outperforms baseline methods including DR, cross-encoder, and pointwise LLM-based relevance scoring by up to 65%.',
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
    'While Large Language Models (LLMs) exhibit exceptional zero-shot relevance modeling, their high computational cost necessitates framing passage retrieval as a budget-constrained global optimization problem. Existing approaches passively rely on first-stage dense retrievers, which leads to two limitations: (1) failing to retrieve relevant passages in semantically distinct clusters, and (2) failing to propagate relevance signals to the broader corpus. To address these limitations, we propose Bayesian Active Learning with Gaussian Processes guidEd by LLM relevance scoring (BAGEL)1, a novel framework that propagates sparse LLM relevance signals across the embedding space to guide global exploration. BAGEL models the multimodal relevance distribution across the entire embedding space with a query-specific Gaussian Process (GP) based on LLM relevance scores. Subsequently, it iteratively selects passages for scoring by strategically balancing the exploitation of highconfidence regions with the exploration of uncertain areas. Extensive experiments across four benchmark datasets and two LLM backbones demonstrate that BAGEL effectively explores and captures complex relevance distributions and outperforms LLM reranking methods under the same LLM budget on all four datasets.',
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
      'Conversational AI (ConvAI) agents increasingly maintain structured memory to support long-term, task-oriented interactions. Incontext memory approaches append the growing history to the model input, which scales poorly under context-window limits. RAGbased methods retrieve request-relevant information, but most assume flat memory collections and ignore structure. We propose SEMANTIC XPATH, a tree-structured memory module to access and update structured conversational memory. SEMANTIC XPATH improves performance over flat-RAG baselines by 176.7% while using only 9.1% of the tokens required by in-context memory. We also introduce SEMANTICXPATH CHAT, an end-to-end ConvAI demo system that visualizes the structured memory and query execution details. Overall, this paper demonstrates a candidate for the next generation of long-term, task-oriented ConvAI systems built on structured memory',
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
      'Planning in open-world environments, where agents must act with partially observed states and incomplete knowledge, is a central challenge in embodied AI. Open-world planning involves not only sequencing actions but also determining what information the agent needs to sense to enable those actions. Existing approaches using Large Language Models (LLM) and Vision-Language Models (VLM) cannot reliably plan over long horizons and complex goals, where they often hallucinate and fail to reason causally over agent-environment interactions. Alternatively, classical PDDL planners offer correct and principled reasoning, but fail in open-world settings: they presuppose complete models and depend on exhaustive grounding over all objects, states, and actions; they cannot address misalignment between goal specifications (e.g., “heat the bread”) and action specifications (e.g., “toast the bread”); and they do not generalize across modalities (e.g., text, vision). To address these core challenges: (i) we extend symbolic PDDL into a flexible natural language representation that we term NL-PDDL, improving accessibility for non-expert users as well as generalization over modalities; (ii) we generalize regression-style planning to NL-PDDL with commonsense entailment reasoning to determine what needs to be observed for goal achievement in partially-observed environments with potential goal–action specification misalignment; and (iii) we leverage the lifted specification of NL-PDDL to facilitate open-world planning that avoids exhaustive grounding and yields a time and space complexity independent of the number of ground objects, states, and actions. Our experiments in three diverse domains — classical Blocksworld and the embodied ALFWorld environment with both textual and visual states — show that NL-PDDL substantially outperforms existing baselines, is more robust to longer horizons and more complex goals, and generalizes across modalities.',
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
      'Linear Predictive Clustering (LPC) partitions samples based on shared linear relationships between feature and target variables, with numerous applications including marketing, medicine, and education. Greedy optimization methods, commonly used for LPC, alternate between clustering and linear regression but lack global optimality. While effective for separable clusters, they struggle in non-separable settings where clusters overlap in feature space. In an alternative constrained optimization paradigm, previous work formulated LPC as a Mixed-Integer Program (MIP), ensuring global optimality regardless of separability but suffering from poor scalability. This work builds on the constrained optimization paradigm to introduce two novel approaches that improve the efficiency of global optimization for LPC. By leveraging key theoretical properties of separability, we derive near-optimal approximations with provable error bounds, significantly reducing the MIP formulation’s complexity and improving scalability. Additionally, we can further approximate LPC as a Quadratic Pseudo-Boolean Optimization (QPBO) problem, achieving substantial computational improvements in some settings. Comparative analyses on synthetic and real-world datasets demonstrate that our methods consistently achieve near-optimal solutions with substantially lower regression errors than greedy optimization while exhibiting superior scalability over existing MIP formulations.',
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
      'Dense Passage Retrieval (DPR) typically relies on Euclidean or cosine distance to measure query-passage relevance in embedding space, which is effective when embeddings lie on a linear manifold. However, our experiments across DPR benchmarks suggest that embeddings often lie on lower-dimensional, non-linear manifolds, especially in out-of-distribution (OOD) settings, where cosine and Euclidean distance fail to capture semantic similarity. To address this limitation, we propose a manifold-aware distance metric for DPR (MA-DPR) that models the intrinsic manifold structure of passages using a nearest neighbor graph and measures query-passage distance based on their shortest path in this graph. We show that MA-DPR outperforms Euclidean and cosine distances by up to 26% on OOD passage retrieval with comparable in-distribution performance across various embedding models while incurring a minimal increase in query inference time. Empirical evidence suggests that manifold-aware distance allows DPR to leverage context from related neighboring passages, making it effective even in the absence of direct semantic overlap. MADPR can be applied to a wide range of dense embedding and retrieval tasks, offering potential benefits across a wide spectrum of domains.',
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
      'Temporal clustering extends the conventional task of data clustering by grouping time series data according to shared temporal trends across sociospatial units, with diverse applications in the social sciences, especially urban science. The two dominant methods are as follows: Time Series Clustering (TSC), with dynamic cluster centres but static labels for each entity, and Sequence Label Analysis (SLA), with static cluster centres but dynamic labels. To implement the universe of models spanning the design space between TSC and SLA, we present tscluster, an open-source Python framework. tscluster offers: (1) several innovative techniques, such as Bounded Dynamic Clustering (BDC), that are not available in existing libraries, allowing users to set an upper bound on the number of label changes and identify the most dynamically evolving time series; (2) a user-friendly interface for applying and comparing these methods; (3) globally optimal solutions for the clustering objective by employing a mixed-integer linear programming formulation, enhancing the reproducibility and robustness of the results in contrast to existing methods based on initializationsensitive local optimization; and (4) a suite of visualization tools for interpretability and comparison of clustering results. We present our framework using a case study of neighbourhood change in Toronto, comparing two methods available in tscluster. Supplemental materials provide an additional case study of local business development in Chicago and a detailed mathematical exposition of our framework. tscluster can be installed via PyPI (pypi.org/project/tscluster), and the source code is accessible on Github (github.com/tscluster-project/tscluster). Documentation is available online at the tscluster website (tscluster.readthedocs.io).',
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

/* ---renderer ---*/
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
