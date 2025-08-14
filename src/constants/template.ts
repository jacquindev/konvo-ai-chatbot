export const codeSnippetTemplate = (id: string) => {
  return `const iframe = document.createElement('iframe');

const iframeStyles = (styleString) => {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

iframeStyles('
  .chat-frame {
    position: fixed;
    bottom: 50px;
    right: 50px;
    border: none;
  }
')

iframe.src = '${process.env.NEXT_PUBLIC_HOST_URL}/chatbot'
iframe.classList.add('chat-frame')
document.body.appendChild(iframe)

window.addEventListener("message", (e) => {
  if(e.origin !== '${process.env.NEXT_PUBLIC_HOST_URL}') return null
  let dimensions = JSON.parse(e.data)
  iframe.width = dimensions.width
  iframe.height = dimensions.height
  iframe.contentWindow.postMessage('${id}', '${process.env.NEXT_PUBLIC_HOST_URL}/')
})`
}
