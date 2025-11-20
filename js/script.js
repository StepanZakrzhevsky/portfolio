/*
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

sortBtns = document.querySelector('.skills-header');
sortBtns.addEventListener('click', (e) => {
	if e.target.nodeName == 'Button' {
		console.log(e.target);
	}
})
*/






function getComparer(prop, reverse) {
  return function (a, b) {
    if (a[prop] < b[prop]) return reverse ? 1 : -1;
    if (a[prop] > b[prop]) return reverse ? -1 : 1;
    return 0;
  }
}

const skills = {
  data: [
        { skill: "HTML", level: 20, icon: "skill=html.svg" },
        { skill: "CSS", level: 5, icon: "skill=css.svg" },
        { skill: "C#", level: 70, icon: "skill=c++++.svg" },
        { skill: "C++", level: 50, icon: "skill=c++.svg" }
    ],

  sortOrder: {
    skill: false,
    level: false
  },

  skills_list: null,

  generateList(parentElement) {
    parentElement.innerHTML = "";
    this.data.forEach(item => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      const div = document.createElement("div");

      dd.classList.add("progress-bar");
      div.classList.add("progress-bar2");

      dt.textContent = item.skill;
      dt.style.backgroundImage = `url('img/${item.icon}')`;

      div.style.width = `${item.level}%`;

      dd.appendChild(div);
      parentElement.append(dt, dd);
    });
  },

 sortList(prop) {
    if (this.currentSortProp === prop) {
      this.data.reverse();
      this.sortOrder[prop] = !this.sortOrder[prop];
    } else {
      for (let key in this.sortOrder) {
        this.sortOrder[key] = false;
      }
      this.sortOrder[prop] = true;
      this.data.sort(getComparer(prop, this.sortOrder[prop]));
      this.currentSortProp = prop;
    }
    this.generateList(this.skills_list);
  }
};

skills.skills_list = document.querySelector("dl.skills_list");
skills.generateList(skills.skills_list);

let buttons = document.querySelector("div.skills-header-btns");
buttons.addEventListener("click", (e) => {
  let target = e.target;
  if (target.nodeName === "BUTTON") {
    switch (target.dataset.type) {
      case 'name':
        skills.sortList('skill');
        break;
      case 'level':
        skills.sortList('level');
        break;
      default:
        console.log(target.dataset.type);
    }
  }
});

let menu = document.querySelector("nav.main-nav");
let navBtn = document.querySelector("button.nav-btn");

menu.open = function() {
  this.classList.remove("main-nav-closed");
  navBtn.classList.remove("nav-btn-open");
  navBtn.classList.add("nav-btn-close");
  navBtn.querySelector(".hide").textContent = "Закрыть меню";
};

menu.close = function() {
  this.classList.add("main-nav-closed");
  navBtn.classList.remove("nav-btn-close");
  navBtn.classList.add("nav-btn-open");
  navBtn.querySelector(".hide").textContent = "Открыть меню";
};

navBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-btn-open")) {
    menu.open();
  } else {
    menu.close();
  }
});

menu.close();