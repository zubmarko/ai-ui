import { v4 as uuidv4 } from 'uuid';

// fakeRequest.js
const frameworks = [
    {
      id: uuidv4(),
      name: "React",
      githubStars: 20000,
      type: "Library",
      pros: "Reusable components, large community",
      cons: "High pace of changes, JSX as a barrier"
    },
    {
      id: uuidv4(),
      name: "Vue",
      githubStars: 20000,
      type: "Framework",
      pros: "Easy learning curve, versatile",
      cons: "Lacks official support for large scale projects"
    },
    {
      id: uuidv4(),
      name: "Angular",
      githubStars: 85000,
      type: "Framework",
      pros: "Powerful tooling, integrated solutions",
      cons: "Steep learning curve, verbose"
    },
    {
      id: uuidv4(),
      name: "Svelte",
      githubStars: 60000,
      type: "Compiler",
      pros: "Zero runtime overhead, innovative",
      cons: "Smaller community, fewer resources"
    },
    {
      id: uuidv4(),
      name: "Next.js",
      githubStars: 90000,
      type: "Framework",
      pros: "SSR by default, easy deployment",
      cons: "Limited to React, can be overkill for small projects"
    },
    {
      id: uuidv4(),
      name: "Gatsby",
      githubStars: 54000,
      type: "Framework",
      pros: "Static site generation, great plugin ecosystem",
      cons: "Builds can be slow, GraphQL overhead"
    },
    {
      id: uuidv4(),
      name: "Ember",
      githubStars: 22000,
      type: "Framework",
      pros: "Conventional configuration, stable",
      cons: "Declining popularity, steep learning curve"
    },
    {
      id: uuidv4(),
      name: "Backbone",
      githubStars: 28000,
      type: "Library",
      pros: "Lightweight, simple",
      cons: "Outdated, lacks modern features"
    },
    {
      id: uuidv4(),
      name: "Preact",
      githubStars: 33000,
      type: "Library",
      pros: "Lightweight alternative to React, fast",
      cons: "Not fully compatible with React plugins"
    },
    {
      id: uuidv4(),
      name: "Lit",
      githubStars: 12000,
      type: "Library",
      pros: "Simple and lightweight, web components",
      cons: "Limited adoption, niche"
    }
  ];
  
  // Simulate a network request
  export const fetchFrameworks = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(frameworks), 1000); // Simulate network latency
    });
  };
  