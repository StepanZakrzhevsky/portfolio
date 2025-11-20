const skills = {
    data: [
        { name: "HTML", level: 20, icon: "skill=html.svg" },
        { name: "CSS", level: 5, icon: "skill=css.svg" },
        { name: "C#", level: 70, icon: "skill=c++++.svg" },
        { name: "C++", level: 50, icon: "skill=c++.svg" }
    ],

    generateList(parentElement) {
        this.data.forEach(skill => {
            const dt = document.createElement("dt");
            dt.classList.add("skill-item");
            dt.textContent = skill.name;

            dt.style.backgroundImage = `url("img/${skill.icon}")`;

            const dd = document.createElement("dd");
            dd.classList.add("progress-bar");

            const bar = document.createElement("div");
            bar.classList.add("progress-bar2");
            bar.style.width = skill.level + "%";

            dd.appendChild(bar);
            parentElement.appendChild(dt);
            parentElement.appendChild(dd);
        });
    }
};

const skillList = document.querySelector(".skills_list");
skills.generateList(skillList);