const fs = require('fs');
const file = 'src/components/ui/scroll-hero.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Remove pin: true from GSAP
code = code.replace("pin: true,", "");

// 2. Change end: '+=250%' to end: 'bottom bottom'
code = code.replace("end: '+=250%', // Pin for 2.5x screen heights", "end: 'bottom bottom', // Ends when bottom of outer container hits bottom of viewport");

// 3. Update the JSX to use sticky
const oldJSX = `<div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}`;

const newJSX = `<div ref={containerRef} className="relative w-full bg-black" style={{ height: '350vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}`;

code = code.replace(oldJSX, newJSX);

// 4. Close the new outer div
const oldEnd = `</canvas>
    </div>
  );`;

const newEnd = `</canvas>
      </div>
    </div>
  );`;

code = code.replace(oldEnd, newEnd);

fs.writeFileSync(file, code);
