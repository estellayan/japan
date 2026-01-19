import { brandContent } from './data.js';

export function initPosters() {
    const container = document.getElementById('poster-container');
    if (!container) return;
    
    brandContent.posters.forEach(poster => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="poster-card group cursor-pointer h-[480px] md:h-[560px] relative overflow-hidden rounded-sm shadow-xl">
                <img src="${poster.bg}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="background">
                <div class="poster-overlay absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                    <div class="mb-6 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                        <span class="inline-block bg-[#002FA7] px-2 py-0.5 text-[9px] tracking-widest uppercase font-bold mb-3">Professional Service</span>
                        <h3 class="text-xl md:text-2xl font-serif font-bold leading-tight mb-2">${poster.title}</h3>
                        <p class="text-[10px] md:text-xs text-blue-100 font-light tracking-wide opacity-80">${poster.subtitle}</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="flex-1 glass-btn py-3.5 text-[10px] md:text-xs font-bold rounded-sm hover:bg-white hover:text-[#002FA7] transition-all flex items-center justify-center gap-2 copy-btn" data-id="${poster.id}">
                            <i data-lucide="copy" class="w-3 h-3"></i> 复制文案
                        </button>
                        <button class="w-12 glass-btn flex items-center justify-center rounded-sm hover:bg-white hover:text-[#002FA7] transition-all">
                            <i data-lucide="share-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(slide);
    });


    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            const content = brandContent.posters.find(p => p.id === id);
            const fullText = `${content.title}\n\n${content.subtitle}\n\n${content.body}\n\n${content.tags}\n\n${content.cta}`;
            
            navigator.clipboard.writeText(fullText).then(() => {
                showToast('文案已复制到剪贴板');
            });
        });
    });

    lucide.createIcons();
}

function showToast(msg) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
