// admin-dashboard.js
// Parsear BBCode simple de imgbox y generar HTML para insertar en posts.

(function(){
  function parseImgboxBbcode(bbcode){
    // Buscar patrón [URL=link][IMG]imgurl[/IMG][/URL]
    var urlMatch = bbcode.match(/\[URL=(https?:\/\/[^\]]+)\]\[IMG\]([^\[]+)\[\/IMG\]\[\/URL\]/i);
    if (!urlMatch) return null;
    return {
      link: urlMatch[1],
      img: urlMatch[2]
    };
  }

  function createImageHtml(obj){
    return '<a href="'+escapeHtml(obj.link)+'" target="_blank" rel="noopener"><img src="'+escapeHtml(obj.img)+'" alt="manga-image"/></a>';
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>\"]/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];
    });
  }

  var bbInput = document.getElementById('bbcode-input');
  var previewBtn = document.getElementById('preview-btn');
  var generateBtn = document.getElementById('generate-btn');
  var clearBtn = document.getElementById('clear-btn');
  var preview = document.getElementById('preview');
  var genHtml = document.getElementById('generated-html');
  var imagesList = document.getElementById('images-list');
  var exportBtn = document.getElementById('export-post-btn');

  function addImageToList(obj){
    var li = document.createElement('li');
    li.innerHTML = createImageHtml(obj);
    li.dataset.link = obj.link;
    li.dataset.img = obj.img;
    imagesList.appendChild(li);
  }

  previewBtn.addEventListener('click', function(){
    var bb = bbInput.value.trim();
    var parsed = parseImgboxBbcode(bb);
    if (!parsed){ preview.innerHTML = '<em>BBCode no válido</em>'; return; }
    preview.innerHTML = createImageHtml(parsed);
    genHtml.textContent = createImageHtml(parsed);
  });

  generateBtn.addEventListener('click', function(){
    var bb = bbInput.value.trim();
    var parsed = parseImgboxBbcode(bb);
    if (!parsed){ alert('BBCode no válido'); return; }
    addImageToList(parsed);
    bbInput.value = '';
    preview.innerHTML = '<em>Imagen añadida a la lista</em>';
    genHtml.textContent = '';
  });

  clearBtn.addEventListener('click', function(){ bbInput.value=''; preview.innerHTML=''; genHtml.textContent=''; });

  exportBtn.addEventListener('click', function(){
    // Generar un archivo Markdown simple con las imágenes (una por línea)
    var items = imagesList.querySelectorAll('li');
    if (!items.length){ alert('No hay imágenes añadidas'); return; }
    var md = '---\nlayout: post\ntitle: "Nuevo Capítulo"\n---\n\n';
    items.forEach(function(li){
      var img = li.dataset.img;
      var link = li.dataset.link;
      md += '[![]('+img+')]('+link+')\n\n';
    });
    // Descargar el archivo
    var blob = new Blob([md], {type: 'text/markdown;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'nuevo-capitulo.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

})();
