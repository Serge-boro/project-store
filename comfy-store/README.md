# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

/\*
const handlePrevPage = () => {
console.log(paginPageFilterSplit)
console.log(paginPageFilterSort)

    if (!paginPageFilterSplit) {
      setPaginPage((prev) => ((prev + 1) % pages.length) + 1)

      if (paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
      }
    }
    if (paginPageFilterSplit) {
      setPaginPageFilter((prev) => (prev % pages.length) + 1)
      // if (paginPageFilterSort || paginPageFilterSplit) {
      //   setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
      // }
      if (paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
        // if (paginPageFilterSort) {
        //   setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
        // }
      }
      if (paginPageFilterSort && !paginPageFilterSplit) {
        setPaginPageFilter((prev) => (prev % pages.length) + 1)
      }
    }
    // if (paginPageFilterSort && paginPageFilterSplit) {
    //   setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
    // }

}

const handleNextPage = () => {
console.log(paginPageFilterSplit)
console.log(paginPageFilterSort)
if (!paginPageFilterSplit) {
setPaginPage((prev) => ((prev + pages.length) % pages.length) + 1)

      if (paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
      }
    }
    if (paginPageFilterSplit) {
      setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
      // if (paginPageFilterSort || paginPageFilterSplit) {
      //   setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
      // }
      // if (paginPageFilterSort) {
      //   setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
      // }
    }

}

\*/

[build]
command = 'npm run build'
publish = '../public'
functions = '../comfy-server/netlify_functions'

[[redirects]]
from = '/store/\*'
to = '/.netlify/functions/:splat'
status = 200

[[redirects]]
from = '/\*'
to = '/index.html'
status = 200
