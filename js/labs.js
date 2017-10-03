(function() {

    function loadHomepage() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/contents?type=Lab');
        xhr.onreadystatechange = renderHomepage;
        xhr.send(null);
    }

    function renderHomepage(event) {
        const DONE = 4;
        const OK = 200;
        let xhr = event.currentTarget;
        let html = '';

        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                const labs = window.JSON.parse(xhr.responseText).data;
                console.log(labs);
                if(labs.length === 0){
                    html = '<p><strong>there have not been any labs added, <a href="/admin">go add some at /admin</a></strong></p>';
                } else {
                    html = labs.map(function(lab) {
                        return `
                            <article>
                                <h3>${lab.name || 'unknown'}</h3>
                                <p><img src="${lab.splash-image || ''}" /></p>
                                <p><a href="${lab.directors[0] || '#'}">director</a></p>
                                <p>mission: ${lab.mission || 'unknown'}</p>
                                <h6>description:</h6>
                                <div>${lab.description || 'none'}
                            </article>
                        `;
                    }).join();
                }
            } else {
                html = '<p><strong>the /api endpoint did not respond correctly :-(</strong></p>';
            }

            document.querySelector('#main').innerHTML = html;
        }
    }

    document.addEventListener("DOMContentLoaded", loadHomepage);
})();
