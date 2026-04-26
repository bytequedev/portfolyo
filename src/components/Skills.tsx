export default function Skills() {
  return (
    <section id="skills" className="fade-in">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Combining technical excellence with creative vision</p>
        </div>
        <div className="skills-container">
          <div className="skills-wrapper">
            <div className="skills-visual">
              <div className="skills-circle">
                <div className="skill-node"><div className="skill-icon">🎨</div><div className="skill-name">UI/UX</div></div>
                <div className="skill-node"><div className="skill-icon">⚛️</div><div className="skill-name">React</div></div>
                <div className="skill-node"><div className="skill-icon">📱</div><div className="skill-name">Mobile</div></div>
                <div className="skill-node"><div className="skill-icon">⚙️</div><div className="skill-name">Backend</div></div>
                <div className="skill-node"><div className="skill-icon">🚀</div><div className="skill-name">DevOps</div></div>
                <div className="skill-node"><div className="skill-icon">💡</div><div className="skill-name">Innovation</div></div>
                <div className="skills-center">⚡</div>
              </div>
            </div>
            <div className="skills-list">
              <div className="skill-item">
                <h4>Frontend Excellence</h4>
                <p>Modern JavaScript frameworks, responsive design, and pixel-perfect implementations</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "95%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Creative Design</h4>
                <p>User-centered design thinking with a focus on accessibility and visual appeal</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "90%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Full-Stack Development</h4>
                <p>End-to-end application development from database to deployment</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "85%" }}></div></div>
              </div>
              <div className="skill-item">
                <h4>Performance & Optimization</h4>
                <p>Lightning-fast load times and seamless user experiences across all devices</p>
                <div className="skill-progress"><div className="skill-progress-bar" style={{ width: "92%" }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
