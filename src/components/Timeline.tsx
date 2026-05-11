"use client";
import { useEffect } from "react";

export default function Timeline() {
  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineFilters = document.querySelectorAll('.timeline-filter');

    function updateTimelineProgress() {
      const timelineContainer = document.querySelector('.timeline-container');
      if (!timelineContainer || !timelineProgress) return;
      const containerRect = timelineContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (containerRect.top < windowHeight && containerRect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - containerRect.top) / (containerRect.height + windowHeight)));
        (timelineProgress as HTMLElement).style.height = `${progress * 100}%`;
      }
    }

    function updateTimelineItems() {
      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible && !item.classList.contains('visible')) {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 200);
        }
      });
    }

    function filterHandler(e: Event) {
      const target = e.target as HTMLElement;
      const filterValue = target.getAttribute('data-filter');
      timelineFilters.forEach(f => f.classList.remove('active'));
      target.classList.add('active');
      timelineItems.forEach(item => {
        const el = item as HTMLElement;
        const category = el.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          el.style.display = 'block';
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 100);
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          setTimeout(() => { el.style.display = 'none'; }, 300);
        }
      });
    }

    timelineFilters.forEach(filter => filter.addEventListener('click', filterHandler));
    document.querySelectorAll('.timeline-node').forEach(node => {
      node.addEventListener('click', function (this: HTMLElement) {
        document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        const timelineItem = this.closest('.timeline-item');
        timelineItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    window.addEventListener('scroll', updateTimelineProgress);
    window.addEventListener('scroll', updateTimelineItems);
    updateTimelineProgress();
    updateTimelineItems();
    return () => {
      timelineFilters.forEach(filter => filter.removeEventListener('click', filterHandler));
      window.removeEventListener('scroll', updateTimelineProgress);
      window.removeEventListener('scroll', updateTimelineItems);
    };
  }, []);

  return (
    <section id="timeline" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Byteque Nasıl Büyüdü?</h2>
          <p className="section-subtitle">Küçük bir ekipten startup stüdyosuna — ilk projeden bugüne yolculuğumuz</p>
        </div>
        <div className="timeline-controls">
          <button className="timeline-filter active" data-filter="all">Tümü</button>
          <button className="timeline-filter" data-filter="web">Web</button>
          <button className="timeline-filter" data-filter="mobile">Mobil</button>
          <button className="timeline-filter" data-filter="milestone">Kilometre Taşı</button>
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-progress"></div>

          <div className="timeline-item" data-category="milestone">
            <div className="timeline-node">🚀</div>
            <div className="timeline-content">
              <div className="timeline-year">2022</div>
              <h3 className="timeline-title">Byteque Kuruldu</h3>
              <div className="timeline-company">İstanbul, Türkiye</div>
              <p className="timeline-description">İki geliştirici, bir tasarımcı. Küçük ama iddialı bir ekiple yola çıktık. Hedefimiz; işletmelere gerçekten sonuç getiren, modern ve ölçeklenebilir dijital ürünler geliştirmekti.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">Next.js</span>
                <span className="timeline-skill">Flutter</span>
                <span className="timeline-skill">Firebase</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">İlk 3 müşteri ile ilk ayda çalışmaya başladık</div>
                <div className="timeline-achievement">Ekip sıfırdan kuruldu, süreçler oluşturuldu</div>
              </div>
            </div>
          </div>

          <div className="timeline-item" data-category="web">
            <div className="timeline-node">🌐</div>
            <div className="timeline-content">
              <div className="timeline-year">2022</div>
              <h3 className="timeline-title">İlk Kurumsal Web Projeleri</h3>
              <div className="timeline-company">Kuaför & Hizmet Sektörü</div>
              <p className="timeline-description">Küçük ve orta ölçekli işletmeler için randevu sistemli, yönetici panelli kurumsal web siteleri geliştirdik. Müşterilerimizin dijital görünürlüğü hızla arttı.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">Next.js</span>
                <span className="timeline-skill">Firebase</span>
                <span className="timeline-skill">Admin Panel</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">5+ web projesi teslim edildi</div>
                <div className="timeline-achievement">Ortalama %60 dönüşüm artışı sağlandı</div>
              </div>
            </div>
          </div>

          <div className="timeline-item" data-category="mobile">
            <div className="timeline-node">📱</div>
            <div className="timeline-content">
              <div className="timeline-year">2023</div>
              <h3 className="timeline-title">Mobil Uygulama Odağı</h3>
              <div className="timeline-company">Flutter & React Native</div>
              <p className="timeline-description">Sosyal platformlar, sağlık uygulamaları ve yapay zeka destekli mobil çözümler geliştirerek mobil alanda güçlü bir portföy oluşturduk. Android ve iOS'ta 10+ uygulama yayınlandı.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">Flutter</span>
                <span className="timeline-skill">React Native</span>
                <span className="timeline-skill">Firebase</span>
                <span className="timeline-skill">AI/ML</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">10+ mobil uygulama Play Store'da yayınlandı</div>
                <div className="timeline-achievement">Yapay zeka destekli ilk sağlık uygulaması geliştirildi</div>
              </div>
            </div>
          </div>

          <div className="timeline-item" data-category="milestone">
            <div className="timeline-node">🏆</div>
            <div className="timeline-content">
              <div className="timeline-year">2024</div>
              <h3 className="timeline-title">30+ Proje, 20+ Mutlu Müşteri</h3>
              <div className="timeline-company">Byteque Studio</div>
              <p className="timeline-description">İki yılda 30'dan fazla tamamlanmış proje, 20'den fazla memnun müşteri ve sektörde güvenilir bir stüdyo kimliği. Web, mobil ve admin panel üçgeninde tam hizmet sunmaya devam ediyoruz.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">Full-Stack</span>
                <span className="timeline-skill">Mobile</span>
                <span className="timeline-skill">UI/UX</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">30+ kurumsal proje teslim edildi</div>
                <div className="timeline-achievement">%100 müşteri memnuniyeti hedefiyle ilerliyoruz</div>
                <div className="timeline-achievement">Ekip 5 kişiye ulaştı</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
