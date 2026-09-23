const fs = require('fs');
let code = fs.readFileSync('src/components/ui/project-detail.jsx', 'utf8');

// 1. Import X
code = code.replace(
  "import { ArrowLeft, MapPin, Briefcase, Building2, Layers } from 'lucide-react';",
  "import { ArrowLeft, MapPin, Briefcase, Building2, Layers, X } from 'lucide-react';"
);

// 2. Add Floating X at the top of the return
code = code.replace(
  '<div className="w-full bg-[var(--page-cream)] min-h-screen pt-[90px]">',
  `<div className="w-full bg-[var(--page-cream)] min-h-screen pt-[90px]">
      
      {/* Floating Close Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-white bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full transition-all border border-white/20 shadow-2xl group"
      >
        <X size={24} className="group-hover:scale-110 transition-transform" />
      </button>`
);

// 3. Add Bottom Journey Button
const bottomCode = `
        {/* End of Journey Button */}
        <div className="mt-16 mb-8 text-center flex justify-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-[var(--walnut)] hover:text-white bg-white hover:bg-[var(--walnut)] px-8 py-4 rounded-full transition-all duration-300 border border-[var(--hairline)] hover:border-transparent shadow-sm hover:shadow-lg text-[15px] font-bold tracking-wide"
          >
            <ArrowLeft size={18} /> Return to All Projects
          </button>
        </div>
      </div>
      
    </div>
  );
}`;

code = code.replace(
  `      </div>\n      \n    </div>\n  );\n}`,
  bottomCode
);

fs.writeFileSync('src/components/ui/project-detail.jsx', code);
