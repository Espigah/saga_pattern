class MessageIcon extends HTMLElement {
  connectedCallback() {
    const figure = this.getAttribute("figure");

    this.innerHTML = `
    <div class="">
    <div class="message-icon-backgound"></div>  
    <img
    class="system-icon "
    src="${figure}">
  
    </div>`;
  }
}

customElements.define("message-icon", MessageIcon);
