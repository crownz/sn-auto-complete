export function renderHtml(appBundle, vendorBundle, cssBundle, cssRendered) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta
          name="viewport"
          id="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"
        />
        ${cssBundle ? `<link rel="stylesheet" type="text/css" href="/bundle/${cssBundle}"/>` : ''}
        <style type="text/css">${cssRendered}</style>
      </head>
      <body>
        <div id="root">LOADING SIR!</div>
        <script src="/bundle/${vendorBundle}"></script>  
        <script src="/bundle/${appBundle}"></script>
      </body>
    </html>
  `;
}
