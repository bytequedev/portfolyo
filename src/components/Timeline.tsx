"use client";
import { useEffect } from "react";

export default function Timeline() {
  useEffect(() => {
    // Timeline scroll progress and item visibility
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
        timelineProgress.style.height = `${progress * 100}%`;
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

    function filterHandler(e) {
      const filterValue = e.target.getAttribute('data-filter');
      timelineFilters.forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
      timelineItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    }

    timelineFilters.forEach(filter => {
      filter.addEventListener('click', filterHandler);
    });
    document.querySelectorAll('.timeline-node').forEach(node => {
      node.addEventListener('click', function () {
        document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        const timelineItem = this.closest('.timeline-item');
        timelineItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    window.addEventListener('scroll', updateTimelineProgress);
    window.addEventListener('scroll', updateTimelineItems);
    updateTimelineProgress();
    updateTimelineItems();
    return () => {
      timelineFilters.forEach(filter => {
        filter.removeEventListener('click', filterHandler);
      });
      window.removeEventListener('scroll', updateTimelineProgress);
      window.removeEventListener('scroll', updateTimelineItems);
    };
  }, []);

  return (
    <section id="timeline" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">From curious beginner to seasoned developer - here's how I got here</p>
        </div>
        <div className="timeline-controls">
          <button className="timeline-filter active" data-filter="all">All</button>
          <button className="timeline-filter" data-filter="education">Education</button>
          <button className="timeline-filter" data-filter="work">Work</button>
          <button className="timeline-filter" data-filter="project">Projects</button>
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-progress"></div>
          {/* Timeline items - örnek olarak 2 tane bırakıldı, diğerlerini ekleyebilirsiniz */}
          <div className="timeline-item" data-category="education">
            <div className="timeline-node">🎓</div>
            <div className="timeline-content">
              <div className="timeline-year">2018 - 2022</div>
              <h3 className="timeline-title">Computer Science Degree</h3>
              <div className="timeline-company">Stanford University</div>
              <p className="timeline-description">Graduated Magna Cum Laude with a focus on Human-Computer Interaction and Software Engineering. Developed strong foundations in algorithms, data structures, and user-centered design principles.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">Java</span>
                <span className="timeline-skill">Python</span>
                <span className="timeline-skill">Data Structures</span>
                <span className="timeline-skill">UI/UX Design</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">Dean's List for 6 semesters</div>
                <div className="timeline-achievement">Led university hackathon team to 1st place</div>
                <div className="timeline-achievement">Published research on accessibility in web design</div>
              </div>
            </div>
          </div>
          <div className="timeline-item" data-category="work">
            <div className="timeline-node">💼</div>
            <div className="timeline-content">
              <div className="timeline-year">2022 - 2023</div>
              <h3 className="timeline-title">Junior Frontend Developer</h3>
              <div className="timeline-company">TechStart Inc.</div>
              <p className="timeline-description">Started my professional journey building responsive web applications for startup clients. Learned to work in fast-paced environments and collaborate effectively with cross-functional teams.</p>
              <div className="timeline-skills">
                <span className="timeline-skill">React</span>
                <span className="timeline-skill">JavaScript</span>
                <span className="timeline-skill">CSS3</span>
                <span className="timeline-skill">Git</span>
              </div>
              <div className="timeline-achievements">
                <div className="timeline-achievement">Reduced page load times by 40%</div>
                <div className="timeline-achievement">Built 15+ responsive landing pages</div>
                <div className="timeline-achievement">Mentored 2 junior interns</div>
              </div>
            </div>
          </div>
          {/* Diğer timeline-item'lar eklenebilir */}
        </div>
      </div>
    </section>
  );
}
