import { generateHtml } from './utils';

const initZip = () => import('jszip').then(({ default: JSZip }) => new JSZip());

export async function downloadCode({ htmlCode, jsCode, cssCode, fileName, zipInSingleFile }) {
  const createZip = zipInSingleFile ? createSingleZipFile : createZipFiles;
  const zip = await createZip({ htmlCode, jsCode, cssCode });
  generateZip({ zip, fileName });
}

async function createSingleZipFile({ htmlCode, jsCode, cssCode }) {
  const jsZip = await initZip();
  const html = generateHtml({ html: htmlCode, js: jsCode, css: cssCode });

  jsZip.file('index.html', html);

  return jsZip;
}

async function createZipFiles({ htmlCode, jsCode, cssCode }) {
  const jsZip = await initZip();
  const html = `
    <html>
      <head>
        <link type="text/css" rel="stylesheet" href="style.css"/>
      </head>
      <body>
        ${htmlCode}
        <script type="module" src="main.js"></script>
      </body>
    </html>
  `;

  jsZip.file('index.html', html);
  jsZip.file('main.js', jsCode);
  jsZip.file('style.css', cssCode);

  return jsZip;
}

function generateZip({ zip, fileName }) {
  zip.generateAsync({ type: 'blob' }).then((blobData) => {
    const element = window.document.createElement('a');

    element.href = window.URL.createObjectURL(blobData);
    element.download = `${fileName}.zip`;
    element.click();
    element.remove();
  });
}
