(function() {

    function loadHomepage() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/contents?type=Person');
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
                const people = window.JSON.parse(xhr.responseText).data;
                console.log(people);
                if(people.length === 0){
                    html = '<p><strong>there have not been any people added, <a href="/admin">go add some at /admin</a></strong></p>';
                } else {
                    html = people.map(function(person) {
                        return `
                            <article>
                                <h3>${person.name || 'unknown'} - ${person.role || 'unknown'}</h3>
                                <p><img src="${person.portrait || ''}" /></p>
                                <p>quip: ${person.quip || 'none'}</p>
                                <h6>bio:</h6>
                                <div>${person.bio || 'none'}
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
