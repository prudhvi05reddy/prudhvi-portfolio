"use client";

const achievements = [
  " Oracle Certified SQL",
  " Top 50 Querython Finalist",
  " 600+ Coding Problems Solved",
  " Data Science Undergraduate",
  " AI Compiler Developer",
  " Java • Python • SQL",
  " Power BI Developer",
  " Microsoft Power Platform",
  " Open To Internships",
];

export default function AchievementTicker() {
  return (
    <section className="relative overflow-hidden py-10">

      <div className="marquee">

        {[...achievements, ...achievements].map((item, index) => (
          <div
            key={index}
            className="ticker-item"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  );
}