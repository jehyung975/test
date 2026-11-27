// ============================================
// 포트폴리오 웹사이트 스크립트
// - 모바일 햄버거 메뉴 토글
// - 내비게이션 링크 클릭 시 부드러운 스크롤
// - 스크롤 위치에 따른 활성 메뉴 하이라이트
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // 1. 모바일 햄버거 메뉴 토글
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  // 2. 내비게이션 링크 클릭 시 부드러운 스크롤 이동
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href"); // 예: "#about"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        // 부드러운 스크롤
        targetSection.scrollIntoView({ behavior: "smooth" });

        // 모바일 메뉴 닫기
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "메뉴 열기");

        // 활성 링크 즉시 갱신
        setActiveLink(targetId);
      }
    });
  });

  // 3. 스크롤 위치에 따른 활성 메뉴 하이라이트
  function setActiveLink(currentId) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // 현재 화면에 보이는 섹션을 감지하여 활성 링크 갱신
  const sections = document.querySelectorAll("section[id]");

  function updateActiveOnScroll() {
    const scrollPosition = window.scrollY + 100; // 헤더 높이 보정

    let currentId = "";
    sections.forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        currentId = "#" + section.getAttribute("id");
      }
    });

    if (currentId) {
      setActiveLink(currentId);
    }
  }

  window.addEventListener("scroll", updateActiveOnScroll);

  // 페이지 로드 시 최초 1회 실행
  updateActiveOnScroll();
});
