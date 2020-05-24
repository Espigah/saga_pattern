import images from '../../assets/*.png';

class CardComponent extends HTMLElement {
  connectedCallback() {
    const figure = images[this.getAttribute("figure") + "_icon"];
    const platform = images[this.getAttribute("platform") + "_icon"];
    const title = this.getAttribute("title");
    const status = this.getAttribute("status");
    this.innerHTML = `
    <div class="mdl-card mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-shadow--2dp">
      <div class="mdl-card__media">
        <img
        class="system-icon "
        src="${figure}"
      />
      </div>
      <div class="mdl-card__title">
        <h1 class="mdl-card__title-text">${status.toUpperCase()}</h1>
      </div>
      <div class="mdl-card__supporting-text">
        <p>${title}</p>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <i class="material-icons"> <img
          class="platform-icon golang"
          src="${platform}"
          alt="Kiwi standing on oval"
        /></i>
        <button class="mdl-button mdl-button--icon mdl-button--colored"><i class="material-icons">favorite</i></button>

      </div>
    </div>`;
  }
}

customElements.define("my-card", CardComponent);
