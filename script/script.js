var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});


$('[data-toggle="tooltip-click"]').tooltip({ title: "Copiar", trigger: "hover", delay: { show: 100, hide: 500 } });