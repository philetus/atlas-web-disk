(function() {

    function loadHomepage() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/contents?type=Project');
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
                const projects = window.JSON.parse(xhr.responseText).data;
                console.log(projects);
                if(projects.length === 0){
                    html = '<p><strong>there have not been any projects added, <a href="/admin">go add some at /admin</a></strong></p>';
                } else {
                    html = projects.map(function(project) {
                        return `
                            <article>
                                <h3>${project.name || 'unknown'}</h3>
                                <p><img src="${project.splash-image || ''}" /></p>
                                <p>summary: ${project.summary || 'none'}</p>
                                <h6>description:</h6>
                                <div>${project.description || 'none'}
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
