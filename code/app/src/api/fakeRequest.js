import { v4 as uuidv4 } from 'uuid';

// fakeRequest.js
const frameworks = [
  {
    id: uuidv4(),
    name: "React",
    githubStars: 20000,
    type: "Library",
    pros: "Reusable components, large community",
    cons: "High pace of changes, JSX as a barrier",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    id: uuidv4(),
    name: "Vue",
    githubStars: 20000,
    type: "Framework",
    pros: "Easy learning curve, versatile",
    cons: "Lacks official support for large scale projects",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
  },
  {
    id: uuidv4(),
    name: "Angular",
    githubStars: 85000,
    type: "Framework",
    pros: "Powerful tooling, integrated solutions",
    cons: "Steep learning curve, verbose",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg"
  },
  {
    id: uuidv4(),
    name: "Svelte",
    githubStars: 60000,
    type: "Compiler",
    pros: "Zero runtime overhead, innovative",
    cons: "Smaller community, fewer resources",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
  },
  {
    id: uuidv4(),
    name: "Next.js",
    githubStars: 90000,
    type: "Framework",
    pros: "SSR by default, easy deployment",
    cons: "Limited to React, can be overkill for small projects",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
  },
  {
    id: uuidv4(),
    name: "Gatsby",
    githubStars: 54000,
    type: "Framework",
    pros: "Static site generation, great plugin ecosystem",
    cons: "Builds can be slow, GraphQL overhead",
    logoUrl: "https://www.gatsbyjs.com/Gatsby-Monogram.svg"
  },
  {
    id: uuidv4(),
    name: "Ember",
    githubStars: 22000,
    type: "Framework",
    pros: "Conventional configuration, stable",
    cons: "Declining popularity, steep learning curve",
    logoUrl: "https://emberjs.com/images/ember-logo.svg"
  },
  {
    id: uuidv4(),
    name: "Backbone",
    githubStars: 28000,
    type: "Library",
    pros: "Lightweight, simple",
    cons: "Outdated, lacks modern features",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Backbone.js_logo.svg"
  },
  {
    id: uuidv4(),
    name: "Preact",
    githubStars: 33000,
    type: "Library",
    pros: "Lightweight alternative to React, fast",
    cons: "Not fully compatible with React plugins",
    logoUrl: "https://raw.githubusercontent.com/preactjs/awesome-preact/7b059689bd5e62da4cb76207ab91193cf48826e1/preact-logo.svg"
  },
  {
    id: uuidv4(),
    name: "Lit",
    githubStars: 12000,
    type: "Library",
    pros: "Simple and lightweight, web components",
    cons: "Limited adoption, niche",
    logoUrl: "https://lit.dev/images/logo.svg"
  }
];

// Simulate a network request
export const fetchFrameworks = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(frameworks), 1000); // Simulate network latency
  });
};
