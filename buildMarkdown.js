const fm = require('front-matter')
const fs = require('fs');
const marked = require('marked');

const renderer = {
    link(href, title, text) {
        return `<a href="${href}" target="_blank" title="${title || text}">${text}</a>`;
    }
}

const marker = marked.marked;
marker.use({
    renderer
});

let result = {};

try {
    let r = fs.readdirSync('./assets/help/');
    r.forEach(x => {
        let name = x.slice(0, -3);
        let content = fs.readFileSync(`./assets/help/${x}`, 'utf8');
        let fmResult = fm(content);
        result[name] = marker(fmResult.body)
    });
    let string = JSON.stringify(result);
    fs.writeFileSync('./assets/help.json', string);
} catch (e) {
    console.error(e);
}

console.log('🎉 Compiling & writing latest article list into ./assets/articles.json.');