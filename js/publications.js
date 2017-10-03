(function() {

    function loadHomepage() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/contents?type=Publication');
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
                const pubs = window.JSON.parse(xhr.responseText).data;
                console.log(pubs);
                if(pubs.length === 0){
                    html = '<p><strong>there have not been any events added, <a href="/admin">go add some at /admin</a></strong></p>';
                } else {
                    html = pubs.map(function(pub) {
                        return `
                            <article>
                                <h3>${pub.title || 'unknown'}</h3>
                                <p>format: ${pub.format || 'unknown'}</p>
                                <p>year: ${pub.year || 'unknown'}</p>
                                <p>citation: ${pub.citation || 'unknown'}</p>
                                <p><a href="${pub.pdf || '#'}">pdf</a></p>
                                <p><a href="${pub.url || '#'}">url link</a></p>
                                <h6>abstract:</h6>
                                <div>${pub.abstract || 'none'}
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
