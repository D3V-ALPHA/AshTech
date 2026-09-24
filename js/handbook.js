/* =====================================================================
   ASHTECH: handbook.js

   WHY JAVASCRIPT?
   Each diagram in the handbook is written as plain text in a mini
   language called Mermaid, like this:

       flowchart LR
         A["HTML"] --> B["CSS"] --> C["JavaScript"]

   This script loads the Mermaid library, which reads that text and draws
   the boxes and arrows as a picture. Writing diagrams as text means
   anyone can change them, without a drawing program!
   ===================================================================== */

import('https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs')
  .then(async ({ default: mermaid }) => {
    // Wait for our fonts so the diagram boxes are measured with the right letters
    await document.fonts.ready;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      fontFamily: 'Lexend, system-ui, sans-serif',
      themeVariables: {
        fontFamily: 'Lexend, system-ui, sans-serif',
        fontSize: '17px',
        primaryColor: '#fff1b0',       // box fill: our soft yellow
        primaryBorderColor: '#1b2a55', // box outline: our ink
        primaryTextColor: '#1b2a55',
        lineColor: '#1b2a55',
        secondaryColor: '#dcecff',
        tertiaryColor: '#eef6ff',
        edgeLabelBackground: '#ffffff',
        actorBkg: '#fff1b0',
        actorBorder: '#1b2a55',
        signalColor: '#1b2a55',
        noteBkgColor: '#ffffff',
        cScale0: '#ffcb05',
        cScale1: '#9bd770',
        cScale2: '#8fc3ff',
        cScale3: '#ffb38a',
      },
      flowchart: { curve: 'basis', padding: 18 },
    });

    await mermaid.run({ querySelector: '.mermaid' });
    document.documentElement.dataset.diagrams = 'ready';
  })
  .catch(() => {
    // No internet? The diagrams stay as readable text, and that's okay.
    document.documentElement.dataset.diagrams = 'text';
  });
