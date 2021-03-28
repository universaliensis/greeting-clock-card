var time_str;

const LitElement = window.LitElement
  || Object.getPrototypeOf(customElements.get("home-assistant") || customElements.get("hui-view"))
const { html, css } = LitElement.prototype;


class GreetingClockCard extends LitElement {
  static get properties() {
    return {
      _hass: { type: Object },
      config: {}
    };
  }

  set hass(hass) {
    this._hass = hass;
    this.startTime();
    setInterval(this.startTime.bind(this), 250);

  }

  render() {
    return html`
      <ha-card
        ?night=${this.isNight}
        style="--day-color: #45aaf2; --night-color: #a55eea; --text-color: var(--text-dark-color);">
        <div class="calendar__icon">
        </div>
        <div class="clock__info">
        <div class="clock__info__title">
        ${time_str}
        </div>
        <div class="clock__info__state">
        ${this._hass.states['sensor.sidebar_day'].state} den ${this._hass.states['sensor.sidebar_date'].state}
        </div>
        </div>
        <div class="clock__info">

        </div>
      </ha-card>
    `;
  }




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
        //s = today.getSeconds(),
        p = ( h < 12 ) ? "AM" : "PM";

    m = this.addZero(m);
    //s = this.addZero(s);

    time_str =  (this.config.use_military ? h % 12 : h ) +
                    ":" +
                    m;

    //this.content.innerHTML = time_str;

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

  get isNight() {
    return this._hass.states['sun.sun']
      ? this._hass.states['sun.sun'].state === 'below_horizon'
      : false;
  }

  static get styles() {
    return css`
    ha-card {
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 10px;
      background: #45aaf2;
      font-weight: var(--swc-font-weight, 500);
      transition: background 1s;
      cursor: pointer;
      color: var(--text-color);
    }
    ha-card[night] {
      background: #a55eea;
    }
    .clock_info {
      display: flex;
      align-items:flex-start;
      align-content:flex-start;
      flex-flow: column;
      justify-content: space-between;
      min-height: 100px;
      min-width: 100px;
    }
    .clock__info__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 50px;
      line-height: 1;
      padding:5px;
    }
    .clock__info__state {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 25px;
      padding:5px;
    }
    .calendar__icon {
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat;
      flex: 0 0 0px;
      color: white;
      margin-right: 16px;
    }
    `;
  }



}

customElements.define('greeting-clock-card', GreetingClockCard);
