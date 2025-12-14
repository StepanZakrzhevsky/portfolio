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

const buttons = document.querySelector("div.skills-header-btns");
buttons.addEventListener("click", (e) => {
  const target = e.target;
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

const menu = {
  element: document.querySelector("nav.main-nav"),
  button: document.querySelector("button.nav-btn"),

  open() {
    this.element.classList.remove("main-nav-closed");
    this.button.classList.remove("nav-btn-open");
    this.button.classList.add("nav-btn-close");
    this.button.querySelector(".hide").textContent = "Закрыть меню";
  },

  close() {
    this.element.classList.add("main-nav-closed");
    this.button.classList.remove("nav-btn-close");
    this.button.classList.add("nav-btn-open");
    this.button.querySelector(".hide").textContent = "Открыть меню";
  },

  init() {
    this.button.addEventListener("click", () => {
      if (this.button.classList.contains("nav-btn-open")) {
        this.open();
      } else {
        this.close();
      }
    });

    this.close();
  }
};

menu.init();
