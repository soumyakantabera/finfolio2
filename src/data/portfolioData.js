export const defaultData = {
  about: {
    name: 'Jane Smith',
    gender: 'Female',
    address: 'New York, NY',
    profilePhoto: '',
    introTitle: 'Finance Professional & Analyst',
    introDescription: 'Aspiring finance professional with a strong foundation in financial modeling, data analysis, and portfolio management. Passionate about leveraging technology and quantitative methods to drive investment decisions.',
    bio: 'I am a finance professional with deep expertise in quantitative analysis, portfolio management, and financial technology. My work bridges the gap between traditional finance and modern data science, enabling more informed investment decisions through rigorous analytical frameworks.',
    achievements: [
      { id: '1', title: 'Dean\'s List', description: 'Recognized for outstanding academic performance', year: '2022' },
      { id: '2', title: 'Bloomberg Market Concepts', description: 'Completed comprehensive financial markets certification', year: '2023' }
    ],
    metrics: [
      { id: '1', label: 'Projects Completed', value: '10+' },
      { id: '2', label: 'Models Built', value: '15+' },
      { id: '3', label: 'Research Reports', value: '3' },
      { id: '4', label: 'Certifications', value: '2' }
    ],
    contactLinks: [
      { id: '1', platform: 'Email', url: 'mailto:jane.smith@email.com' },
      { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
      { id: '3', platform: 'GitHub', url: 'https://github.com/janesmith' }
    ],
    additionalSections: [
      { id: '1', title: 'Interests', content: 'Financial markets, Quantitative analysis, Fintech, Data visualization' }
    ],
    education: [
      { id: '1', institution: 'Columbia University', degree: 'M.S. Financial Engineering', year: '2024', details: 'Focus on derivatives pricing and risk management' },
      { id: '2', institution: 'NYU Stern', degree: 'B.S. Finance & Economics', year: '2022', details: 'Summa Cum Laude, Dean\'s List' }
    ],
    experience: [
      { id: '1', company: 'Goldman Sachs', role: 'Summer Analyst', period: 'Jun 2023 – Aug 2023', description: 'Developed valuation models for M&A transactions in the TMT group.' },
      { id: '2', company: 'BlackRock', role: 'Investment Intern', period: 'Jan 2023 – May 2023', description: 'Assisted portfolio managers with risk analytics and ESG screening.' }
    ],
    skills: [
      { id: '1', name: 'Financial Modeling', level: 'Advanced' },
      { id: '2', name: 'Python', level: 'Advanced' },
      { id: '3', name: 'Excel / VBA', level: 'Expert' },
      { id: '4', name: 'SQL', level: 'Intermediate' },
      { id: '5', name: 'Bloomberg Terminal', level: 'Advanced' },
      { id: '6', name: 'Tableau', level: 'Intermediate' }
    ],
    certifications: [
      { id: '1', title: 'CFA Level I Candidate', name: 'CFA Level I Candidate', issuer: 'CFA Institute', date: '2024', year: '2024', credentialId: '', link: '', mediaType: '', mediaUrl: '', thumbnail: '' },
      { id: '2', title: 'Bloomberg Market Concepts', name: 'Bloomberg Market Concepts', issuer: 'Bloomberg LP', date: '2023', year: '2023', credentialId: '', link: '', mediaType: '', mediaUrl: '', thumbnail: '' }
    ],
    programmingLanguages: 'Python, Excel / VBA, SQL',
    languagesKnown: 'English, Spanish'
  },
  projects: [
    {
      id: '1',
      title: 'DCF Valuation Model',
      slug: 'dcf-valuation-model',
      subtitle: 'Comprehensive DCF analysis for Fortune 500 tech companies',
      description: 'Built a comprehensive discounted cash flow model for a Fortune 500 tech company, incorporating scenario analysis and sensitivity tables.',
      category: 'Financial Models',
      tags: ['Excel', 'Valuation', 'DCF'],
      techStack: ['Excel', 'VBA'],
      links: [{ label: 'View Model', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: true,
      status: 'published',
      markdownContent: '## Overview\n\nThis project involves building a comprehensive **Discounted Cash Flow (DCF)** model for a Fortune 500 technology company.\n\n### Key Features\n\n- Revenue projections with multiple growth scenarios\n- WACC calculation with sensitivity analysis\n- Terminal value estimation (Gordon Growth & Exit Multiple)\n- Monte Carlo simulation for probabilistic valuation\n\n### Methodology\n\nThe model uses a **10-year projection period** with three scenarios:\n\n| Scenario | Revenue Growth | EBITDA Margin |\n|----------|---------------|---------------|\n| Bull | 15% | 35% |\n| Base | 10% | 30% |\n| Bear | 5% | 25% |\n',
      embeds: [],
      blocks: [
        { id: 'b1-1', type: 'markdown', content: '## Overview\n\nThis project involves building a comprehensive **Discounted Cash Flow (DCF)** model for a Fortune 500 technology company.\n\n### Key Features\n\n- Revenue projections with multiple growth scenarios\n- WACC calculation with sensitivity analysis\n- Terminal value estimation (Gordon Growth & Exit Multiple)\n- Monte Carlo simulation for probabilistic valuation' },
        { id: 'b1-2', type: 'divider' },
        { id: 'b1-3', type: 'callout', variant: 'insight', title: 'Key Insight', content: 'The Monte Carlo simulation revealed a 70% probability of the stock being undervalued at current market prices.' },
        { id: 'b1-4', type: 'markdown', content: '### Methodology\n\nThe model uses a **10-year projection period** with three scenarios:\n\n| Scenario | Revenue Growth | EBITDA Margin |\n|----------|---------------|---------------|\n| Bull | 15% | 35% |\n| Base | 10% | 30% |\n| Bear | 5% | 25% |' }
      ],
      relatedProjects: ['portfolio-optimization-tool']
    },
    {
      id: '2',
      title: 'Portfolio Optimization Tool',
      slug: 'portfolio-optimization-tool',
      subtitle: 'Mean-variance optimization with efficient frontier visualization',
      description: 'Python-based mean-variance optimization tool using historical stock data to construct efficient frontiers and optimal portfolios.',
      category: 'Coding Projects',
      tags: ['Python', 'Finance', 'Optimization'],
      techStack: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
      links: [{ label: 'GitHub', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: true,
      status: 'published',
      markdownContent: '## About This Project\n\nA Python-based **mean-variance optimization** tool that constructs efficient frontiers and identifies optimal portfolios using historical stock data.\n\n### Features\n\n- Historical data fetching and preprocessing\n- Efficient frontier calculation\n- Sharpe ratio optimization\n- Portfolio weight visualization\n- Risk-return scatter plots\n',
      embeds: [],
      blocks: [
        { id: 'b2-1', type: 'markdown', content: '## About This Project\n\nA Python-based **mean-variance optimization** tool that constructs efficient frontiers and identifies optimal portfolios using historical stock data.\n\n### Features\n\n- Historical data fetching and preprocessing\n- Efficient frontier calculation\n- Sharpe ratio optimization\n- Portfolio weight visualization\n- Risk-return scatter plots' }
      ],
      relatedProjects: ['dcf-valuation-model']
    },
    {
      id: '3',
      title: 'ESG Investment Research',
      slug: 'esg-investment-research',
      subtitle: 'Analyzing ESG portfolio performance over a decade',
      description: 'Research paper analyzing the risk-return profile of ESG-screened portfolios versus traditional benchmarks over a 10-year period.',
      category: 'Case Studies',
      tags: ['Research', 'ESG', 'Portfolio Management'],
      techStack: ['Python', 'R', 'LaTeX'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      markdownContent: '',
      embeds: [],
      blocks: [],
      relatedProjects: []
    },
    {
      id: '4',
      title: 'Crypto Market Dashboard',
      slug: 'crypto-market-dashboard',
      subtitle: 'Real-time cryptocurrency analytics and correlation analysis',
      description: 'Interactive dashboard tracking cryptocurrency market metrics with real-time data visualization and correlation analysis.',
      category: 'Coding Projects',
      tags: ['Dashboard', 'Crypto', 'Data Viz'],
      techStack: ['Python', 'Plotly', 'Dash'],
      links: [{ label: 'Live Demo', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      markdownContent: '',
      embeds: [],
      blocks: [],
      relatedProjects: []
    },
    {
      id: '5',
      title: 'ESG Performance vs. Benchmark: A 10-Year Longitudinal Study',
      slug: 'esg-performance-benchmark-study',
      subtitle: 'Evaluating ESG-screened portfolio returns against traditional indices over a decade',
      description: 'This study examines the risk-adjusted returns of ESG-screened equity portfolios versus conventional benchmarks across multiple market cycles from 2013 to 2023.',
      category: 'Research Papers',
      tags: ['ESG', 'Portfolio Performance', 'Benchmarking', 'Risk-Adjusted Returns'],
      techStack: ['Python', 'R', 'Bloomberg Terminal'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: true,
      status: 'published',
      publication: 'Journal of Sustainable Finance & Investment',
      authors: 'Jane Smith, Robert Chen, Maria Gonzalez',
      year: '2024',
      doiLink: '#',
      pdfLink: '#',
      citationText: 'Smith, J., Chen, R., & Gonzalez, M. (2024). ESG Performance vs. Benchmark: A 10-Year Longitudinal Study. Journal of Sustainable Finance & Investment, 14(2), 112–134.',
      bibtex: '@article{smith2024esg,\n  title={ESG Performance vs. Benchmark: A 10-Year Longitudinal Study},\n  author={Smith, Jane and Chen, Robert and Gonzalez, Maria},\n  journal={Journal of Sustainable Finance \\& Investment},\n  volume={14},\n  number={2},\n  pages={112--134},\n  year={2024}\n}',
      abstract: 'This paper presents a comprehensive longitudinal analysis of ESG-screened equity portfolios versus traditional benchmark indices over the period 2013–2023. Using a sample of 500+ US equities and applying multiple ESG screening methodologies, we find that ESG-tilted portfolios delivered comparable risk-adjusted returns to conventional benchmarks while exhibiting lower maximum drawdowns during market stress periods. Our results suggest that ESG integration does not impose a systematic performance penalty and may provide downside protection benefits.',
      keyFindings: [
        'ESG-screened portfolios matched benchmark Sharpe ratios over the full 10-year period',
        'Maximum drawdown was 12–18% lower for ESG portfolios during the 2020 market correction',
        'Governance factors contributed most to risk-adjusted outperformance',
        'Environmental screening had minimal impact on returns but reduced portfolio volatility by 8%'
      ],
      methodology: 'We constructed ESG-screened portfolios using three methodologies: (1) negative screening, (2) best-in-class selection, and (3) ESG momentum. Each portfolio was rebalanced quarterly and benchmarked against the S&P 500 Total Return Index. Risk-adjusted performance was evaluated using Sharpe ratio, Sortino ratio, and maximum drawdown metrics.',
      dataSources: [
        { label: 'MSCI ESG Ratings', url: '#' },
        { label: 'Bloomberg Terminal Data', url: '#' },
        { label: 'S&P 500 Index Data', url: '#' }
      ],
      markdownContent: '',
      embeds: [],
      blocks: [
        { id: 'b5-1', type: 'markdown', content: '## Abstract\n\nThis paper presents a comprehensive longitudinal analysis of ESG-screened equity portfolios versus traditional benchmark indices over the period 2013–2023. Using a sample of 500+ US equities and applying multiple ESG screening methodologies, we find that ESG-tilted portfolios delivered comparable risk-adjusted returns to conventional benchmarks while exhibiting lower maximum drawdowns during market stress periods.' },
        { id: 'b5-2', type: 'callout', variant: 'insight', title: 'Key Finding', content: 'ESG-screened portfolios matched benchmark Sharpe ratios over the full 10-year period while exhibiting 12–18% lower maximum drawdown during the 2020 market correction.' },
        { id: 'b5-3', type: 'markdown', content: '## Methodology\n\nWe constructed ESG-screened portfolios using three methodologies:\n\n1. **Negative screening** — excluding companies with low ESG scores\n2. **Best-in-class selection** — choosing top ESG performers within each sector\n3. **ESG momentum** — selecting companies with improving ESG trajectories\n\nEach portfolio was rebalanced quarterly and benchmarked against the S&P 500 Total Return Index.\n\n## Results\n\n| Metric | ESG Portfolio | S&P 500 |\n|--------|--------------|----------|\n| Annualized Return | 11.2% | 11.5% |\n| Sharpe Ratio | 0.82 | 0.79 |\n| Max Drawdown | -28.4% | -33.9% |\n| Volatility | 14.1% | 15.3% |' }
      ],
      relatedProjects: ['esg-investment-research']
    },
    {
      id: '6',
      title: 'Factor Investing: Momentum and Quality Blend Strategies',
      slug: 'factor-investing-momentum-quality',
      subtitle: 'Combining momentum and quality factors for enhanced risk-adjusted returns',
      description: 'An empirical analysis of multi-factor portfolio strategies blending momentum and quality signals across US and international equity markets.',
      category: 'Research Papers',
      tags: ['Factor Investing', 'Momentum', 'Quality', 'Multi-Factor'],
      techStack: ['Python', 'NumPy', 'Pandas', 'Statsmodels'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2024',
      featured: false,
      status: 'published',
      publication: 'Financial Analysts Journal',
      authors: 'Jane Smith, David Park',
      year: '2024',
      doiLink: '#',
      pdfLink: '#',
      citationText: 'Smith, J. & Park, D. (2024). Factor Investing: Momentum and Quality Blend Strategies. Financial Analysts Journal, 80(1), 45–67.',
      bibtex: '@article{smith2024factor,\n  title={Factor Investing: Momentum and Quality Blend Strategies},\n  author={Smith, Jane and Park, David},\n  journal={Financial Analysts Journal},\n  volume={80},\n  number={1},\n  pages={45--67},\n  year={2024}\n}',
      abstract: 'This paper investigates the performance characteristics of portfolio strategies that combine momentum and quality factor signals. Using data from 1995 to 2023 across US and developed international equity markets, we demonstrate that a blended momentum-quality approach delivers superior risk-adjusted returns compared to single-factor strategies, with significantly reduced factor crash risk.',
      keyFindings: [
        'Momentum-quality blend reduced maximum drawdown by 35% compared to pure momentum',
        'Blended strategy outperformed single-factor approaches by 1.8% annually on a risk-adjusted basis',
        'Quality factor provided a natural hedge against momentum crashes',
        'Results were robust across US, European, and Asian equity markets'
      ],
      methodology: 'We ranked stocks in each universe by 12-month momentum (excluding the most recent month) and by a composite quality score incorporating ROE, earnings stability, and low leverage. The blended portfolio was constructed using an equal-weight combination of momentum and quality z-scores, rebalanced monthly with 100bp turnover constraints.',
      dataSources: [
        { label: 'CRSP US Equity Database', url: '#' },
        { label: 'Compustat Fundamentals', url: '#' },
        { label: 'Kenneth French Data Library', url: '#' }
      ],
      markdownContent: '',
      embeds: [],
      blocks: [
        { id: 'b6-1', type: 'markdown', content: '## Abstract\n\nThis paper investigates the performance characteristics of portfolio strategies that combine momentum and quality factor signals. Using data from 1995 to 2023 across US and developed international equity markets, we demonstrate that a blended momentum-quality approach delivers superior risk-adjusted returns.\n\n## Key Results\n\n- Momentum-quality blend reduced maximum drawdown by **35%** compared to pure momentum\n- Blended strategy outperformed single-factor approaches by **1.8% annually** on a risk-adjusted basis\n- Quality factor provided a natural hedge against momentum crashes' },
        { id: 'b6-2', type: 'callout', variant: 'result', title: 'Performance Summary', content: 'The momentum-quality blend delivered an annualized Sharpe ratio of 0.95, compared to 0.72 for pure momentum and 0.68 for pure quality strategies.' }
      ],
      relatedProjects: ['portfolio-optimization-tool']
    },
    {
      id: '7',
      title: 'DCF Sensitivity Analysis Under Macroeconomic Scenarios',
      slug: 'dcf-sensitivity-macro-scenarios',
      subtitle: 'Stress-testing discounted cash flow models across interest rate and growth regimes',
      description: 'A framework for conducting DCF sensitivity analysis under varying macroeconomic scenarios, including interest rate shocks, inflation regimes, and GDP growth paths.',
      category: 'Research Papers',
      tags: ['DCF', 'Valuation', 'Sensitivity Analysis', 'Macroeconomics'],
      techStack: ['Excel', 'VBA', 'Python', 'Monte Carlo'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      publication: 'Journal of Financial Economics (Working Paper)',
      authors: 'Jane Smith',
      year: '2023',
      doiLink: '',
      pdfLink: '#',
      citationText: 'Smith, J. (2023). DCF Sensitivity Analysis Under Macroeconomic Scenarios. Working Paper.',
      bibtex: '@unpublished{smith2023dcf,\n  title={DCF Sensitivity Analysis Under Macroeconomic Scenarios},\n  author={Smith, Jane},\n  year={2023},\n  note={Working Paper}\n}',
      abstract: 'Traditional DCF models often rely on static discount rate and growth assumptions that fail to capture macroeconomic regime shifts. This paper develops a scenario-based DCF framework that systematically varies WACC, terminal growth rates, and revenue projections across four macroeconomic scenarios: baseline, stagflation, rate shock, and accelerated growth. We apply the framework to 50 S&P 500 companies and find that intrinsic value estimates vary by 40–60% across scenarios.',
      keyFindings: [
        'Intrinsic value estimates varied by 40–60% across macroeconomic scenarios',
        'Interest rate sensitivity was highest for long-duration growth companies',
        'Terminal value accounted for 65–80% of total valuation variance',
        'Monte Carlo simulation with macro-correlated inputs produced tighter confidence intervals than independent variable simulation'
      ],
      methodology: 'We defined four macroeconomic scenarios based on historical regime analysis: baseline (trend growth, stable rates), stagflation (low growth, high inflation), rate shock (rapid tightening), and accelerated growth (above-trend GDP). For each scenario, we calibrated WACC components, revenue growth rates, and margin assumptions using macro-factor regression models. DCF valuations were computed with 10-year explicit forecast periods and Gordon Growth terminal values.',
      dataSources: [
        { label: 'Federal Reserve Economic Data (FRED)', url: '#' },
        { label: 'S&P Capital IQ', url: '#' }
      ],
      markdownContent: '',
      embeds: [],
      blocks: [
        { id: 'b7-1', type: 'markdown', content: '## Abstract\n\nTraditional DCF models often rely on static discount rate and growth assumptions that fail to capture macroeconomic regime shifts. This paper develops a scenario-based DCF framework that systematically varies WACC, terminal growth rates, and revenue projections across four macroeconomic scenarios.\n\n## Scenario Definitions\n\n| Scenario | GDP Growth | Inflation | 10Y Treasury |\n|----------|-----------|-----------|-------------|\n| Baseline | 2.5% | 2.0% | 3.5% |\n| Stagflation | 0.5% | 5.0% | 4.5% |\n| Rate Shock | 1.5% | 3.0% | 6.0% |\n| Accelerated | 4.0% | 2.5% | 4.0% |' },
        { id: 'b7-2', type: 'callout', variant: 'risk', title: 'Key Risk Finding', content: 'Terminal value accounted for 65–80% of total valuation variance across scenarios, highlighting the critical importance of terminal growth rate assumptions.' }
      ],
      relatedProjects: ['dcf-valuation-model']
    },
    {
      id: '8',
      title: 'Portfolio Optimization with Constraints and Transaction Costs',
      slug: 'portfolio-optimization-constraints-costs',
      subtitle: 'Mean-variance optimization incorporating real-world constraints and friction',
      description: 'An extension of classical mean-variance optimization that incorporates sector constraints, position limits, turnover penalties, and realistic transaction cost models.',
      category: 'Research Papers',
      tags: ['Portfolio Optimization', 'Transaction Costs', 'Constraints', 'Mean-Variance'],
      techStack: ['Python', 'CVXPY', 'NumPy', 'Pandas'],
      links: [{ label: 'Read Paper', url: '#' }],
      embedType: '',
      embedUrl: '',
      thumbnail: '',
      heroImage: '',
      date: '2023',
      featured: false,
      status: 'published',
      publication: 'Quantitative Finance',
      authors: 'Jane Smith, Aiko Tanaka',
      year: '2023',
      doiLink: '#',
      pdfLink: '#',
      citationText: 'Smith, J. & Tanaka, A. (2023). Portfolio Optimization with Constraints and Transaction Costs. Quantitative Finance, 23(4), 521–540.',
      bibtex: '@article{smith2023portfolio,\n  title={Portfolio Optimization with Constraints and Transaction Costs},\n  author={Smith, Jane and Tanaka, Aiko},\n  journal={Quantitative Finance},\n  volume={23},\n  number={4},\n  pages={521--540},\n  year={2023}\n}',
      abstract: 'We extend the classical Markowitz mean-variance framework to incorporate practical portfolio constraints including sector limits, individual position bounds, turnover penalties, and a realistic transaction cost model based on market impact functions. Using a universe of 200 US large-cap equities over 2010–2023, we show that constrained optimization with transaction costs reduces realized Sharpe ratios by only 0.05–0.12 compared to unconstrained solutions, while dramatically improving portfolio implementability and reducing turnover by 60%.',
      keyFindings: [
        'Constrained optimization reduced turnover by 60% with only 0.05–0.12 Sharpe ratio reduction',
        'Transaction cost-aware rebalancing improved net-of-cost returns by 0.8% annually',
        'Sector constraints prevented concentrated bets without meaningful performance drag',
        'The market impact cost model outperformed linear cost assumptions in out-of-sample tests'
      ],
      methodology: 'We formulated the portfolio optimization problem as a convex quadratic program using CVXPY. Constraints included: maximum 5% individual position weight, maximum 25% sector exposure, maximum 20% monthly turnover, and a market impact cost function calibrated from TAQ data. The optimizer was run monthly with a 36-month rolling estimation window for expected returns and covariance.',
      dataSources: [
        { label: 'TAQ Intraday Trade Data', url: '#' },
        { label: 'CRSP Monthly Returns', url: '#' },
        { label: 'GICS Sector Classifications', url: '#' }
      ],
      markdownContent: '',
      embeds: [],
      blocks: [
        { id: 'b8-1', type: 'markdown', content: '## Abstract\n\nWe extend the classical Markowitz mean-variance framework to incorporate practical portfolio constraints including sector limits, individual position bounds, turnover penalties, and a realistic transaction cost model.\n\n## Constraint Framework\n\n- **Position limits**: Maximum 5% individual weight\n- **Sector limits**: Maximum 25% per GICS sector\n- **Turnover**: Maximum 20% monthly portfolio turnover\n- **Transaction costs**: Market impact function calibrated from TAQ data' },
        { id: 'b8-2', type: 'callout', variant: 'result', title: 'Efficiency Result', content: 'Constrained optimization reduced turnover by 60% with only a 0.05–0.12 Sharpe ratio reduction compared to unconstrained solutions.' }
      ],
      relatedProjects: ['portfolio-optimization-tool']
    }
  ],
  contact: {
    email: 'jane.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    linkedin: 'https://linkedin.com/in/janesmith',
    github: 'https://github.com/janesmith',
    socialLinks: [
      { id: '1', platform: 'Twitter', url: 'https://twitter.com/janesmith' }
    ]
  },
  home: {
    heroTitle: 'Finance meets code.\nI build both.',
    heroSubtitle: 'Analyst. Builder. Model obsessive.',
    introText: 'I build financial models, analyze markets, and develop data-driven investment strategies. Welcome to my portfolio.',
    snapshotLocation: 'New York, NY',
    snapshotRole: 'Finance Professional & Analyst',
    snapshotAvailability: 'Open to opportunities',
    ctaButtons: [
      { id: '1', label: 'View Projects', link: '/projects' },
      { id: '2', label: 'Contact Me', link: '/contact' }
    ],
    stats: [
      { id: '1', label: 'Projects', value: '10+' },
      { id: '2', label: 'Models Built', value: '15+' },
      { id: '3', label: 'Research Papers', value: '3' },
      { id: '4', label: 'Certifications', value: '2' }
    ],
    customSections: []
  },
  settings: {
    siteTitle: 'FinFolio',
    visiblePages: {
      home: true,
      projects: true,
      about: true,
      contact: true
    },
    customPages: []
  },
  quotes: [
    { id: '1', text: 'Build things that compound. Ship work that speaks.', attribution: 'Principle', context: 'Work ethic', featured: true, order: 1 },
    { id: '2', text: 'Markets reward the prepared mind—and the disciplined spreadsheet.', attribution: 'Note to self', context: 'Markets', featured: false, order: 2 },
    { id: '3', text: 'Good analysis is invisible. Bad analysis is expensive.', attribution: 'Me', context: 'Learning', featured: false, order: 3 }
  ],
  config: {
    embedWhitelist: [
      'youtube.com', 'youtu.be', 'docs.google.com', 'sheets.google.com',
      'drive.google.com', 'figma.com', 'gist.github.com',
      'codepen.io', 'codesandbox.io', 'plotly.com',
      'view.officeapps.live.com', 'onedrive.live.com'
    ],
    uploads: []
  }
};

const STORAGE_KEY = 'finfolio_data';

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const merged = { ...defaultData, ...parsed };
      // Deep-merge about section
      if (parsed.about) {
        merged.about = { ...defaultData.about, ...parsed.about };
      }
      // Deep-merge settings with defaults
      merged.settings = { ...defaultData.settings, ...(parsed.settings || {}) };
      if (parsed.settings?.visiblePages) {
        merged.settings.visiblePages = { ...defaultData.settings.visiblePages, ...parsed.settings.visiblePages };
      }
      if (!Array.isArray(merged.settings.customPages)) {
        merged.settings.customPages = defaultData.settings.customPages;
      }
      // Deep-merge config with defaults
      merged.config = { ...defaultData.config, ...(parsed.config || {}) };
      if (!Array.isArray(merged.config.embedWhitelist)) {
        merged.config.embedWhitelist = defaultData.config.embedWhitelist;
      }
      if (!Array.isArray(merged.config.uploads)) {
        merged.config.uploads = defaultData.config.uploads;
      }
      // Ensure projects have blocks array
      if (Array.isArray(merged.projects)) {
        merged.projects = merged.projects.map(p => ({
          ...p,
          blocks: p.blocks || []
        }));
      }
      // Ensure certifications have new fields with backward compat
      if (Array.isArray(merged.about.certifications)) {
        merged.about.certifications = merged.about.certifications.map(c => ({
          ...c,
          title: c.title || c.name || '',
          name: c.name || c.title || '',
          issuer: c.issuer || '',
          date: c.date || c.year || '',
          year: c.year || c.date || '',
          credentialId: c.credentialId || '',
          link: c.link || '',
          mediaType: c.mediaType || '',
          mediaUrl: c.mediaUrl || '',
          thumbnail: c.thumbnail || ''
        }));
      }
      return merged;
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return { ...defaultData };
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultData };
}

