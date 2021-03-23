class GreetingClockCard extends HTMLElement {

  addZero(i){
    if (i < 10){
      i = "0" + i;
    }
    return i;
  }
  
  startTime() {
    var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds(),
        p = ( h < 12 ) ? "AM" : "PM";

    m = this.addZero(m);
    s = this.addZero(s);

    let time_str =  (this.config.use_military ? h % 12 : h ) +
                    ":" +
                    m +
                    (this.config.hide_seconds ? "" : ":" + s ) +
                    (this.config.use_military ? " " + p : " ");

    this.content.innerHTML = time_str;

  }

  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'TEST CARD 2';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    this.startTime();
    setInterval(this.startTime.bind(this), 250);

  //  this.content.innerHTML = `
  //    The state of ${entityId} is ${stateStr}!
  //    <br><br>
  //    <img src="http://via.placeholder.com/350x150">
  //  `;

  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity UUGDF');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('greeting-clock-card', GreetingClockCard);
