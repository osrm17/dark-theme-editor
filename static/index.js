let sidebarExpand = false;

function sidebarExpandStart() {
    sidebarExpand = true;
}

function sidebarExpandEnd() {
    sidebarExpand = false;
}

function sidebarExpanding(e) {
    if (!sidebarExpand) return;

    const sidebarPercentage = (e.pageX / window.innerWidth) * 100;

    if (sidebarPercentage > 10 && sidebarPercentage < 50) {
        const articlePercentage = 100 - sidebarPercentage;
        console.log("calc( " + articlePercentage + "% - 3pt - 4% - 1px);");

        document.querySelector("aside.sidebar").style.width = `${sidebarPercentage}%`;

        /*
            3pt: expand bar
            4%: <article> padding
            1px: dummpy
        */
        document.querySelector("article.main").style.width = `calc( ${articlePercentage}% - 3pt - 4% - 1px )`;
    }
}

function showSidebar() {
    document.querySelector("aside.sidebar").style.display = "block";
    document.querySelector("aside.exapandable").style.display = "block";
    document.querySelector("button.sidebar-toggle-btn").setAttribute("aria-expanded", true);
}

function hideSidebar() {
    document.querySelector("aside.sidebar").style.display = "none";
    document.querySelector("aside.exapandable").style.display = "none";
    document.querySelector("button.sidebar-toggle-btn").setAttribute("aria-expanded", false);
}

window.addEventListener("load", function () {
    // sidebar expanble
    document.querySelector("aside.exapandable").addEventListener("mousedown", sidebarExpandStart);
    document.querySelector("aside.exapandable").addEventListener("touchstart", sidebarExpandStart);
    window.addEventListener("mousemove", sidebarExpanding);
    window.addEventListener("touchmove", sidebarExpanding);
    window.addEventListener("mouseup", sidebarExpandEnd);
    window.addEventListener("touchend", sidebarExpandEnd);

    // responsive sidebar
    document.querySelector("button.sidebar-toggle-btn").addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (event.currentTarget.getAttribute("aria-expanded") === "true") {
            hideSidebar();
        } else {
            showSidebar();
        }
    });

    // sub dir toggle
    document.querySelectorAll("li.dir > span.dir-text").forEach((element) => {
        element.addEventListener("click", function () {
            this.parentNode.classList.toggle("opened-dir");
            this.parentNode.classList.toggle("closed-dir");
        });
    });
});
