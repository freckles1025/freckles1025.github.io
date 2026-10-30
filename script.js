(function () {
    var menu = document.getElementById('site-menu');
    if (!menu) return;

    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.open = false;
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') menu.open = false;
    });

    document.addEventListener('click', function (event) {
        if (!menu.open || menu.contains(event.target)) return;
        menu.open = false;
    });
})();
