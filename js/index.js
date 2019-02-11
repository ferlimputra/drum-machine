var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} //Constants
//-----------------------------------------------------------------------------
//Urls
var clipUrl = "https://s3.amazonaws.com/freecodecamp/drums/";
var fileExtension = ".mp3";
//Actions
var HIT_DRUM = "HIT_DRUM";
var TOGGLE_POWER = "TOGGLE_POWER";
var TOGGLE_BANK = "TOGGLE_BANK";
var ADJUST_VOLUME = "ADJUST_VOLUME";
//Labels
var SMOOTH_PIANO_KIT = "Smooth Piano Kit";
var HEATER_KIT = "Heater Kit";
var VOLUME = "Volume";
var POWER = "Power";
var BANK = "Bank";
var CHORD = "Chord";
//Others
var keys = [
'Q', 'W', 'E',
'A', 'S', 'D',
'Z', 'X', 'C'];

var files = [
"Heater-1", "Heater-2", "Heater-3",
"Heater-4_1", "Heater-6", "Bld_H1",
"punchy_kick_1", "side_stick_1", "Brk_Snr"];

//Drum Pads
var generateDrumPads = function generateDrumPads() {
  var pads = [];
  for (var i = 0; i < keys.length; i++) {
    var chordId = files[i].replace(/_/g, '-');
    pads.push({
      id: chordId,
      index: i,
      chord: keys[i],
      src: clipUrl + files[i] + fileExtension });

  }
  return pads;
};
var drumPads = generateDrumPads();

//Action Creators
//-----------------------------------------------------------------------------
var hitDrumAction = function hitDrumAction(index) {
  return {
    type: HIT_DRUM,
    pad: drumPads[index] };

};

var togglePowerAction = function togglePowerAction() {
  return {
    type: TOGGLE_POWER };

};

var toggleBankAction = function toggleBankAction() {
  return {
    type: TOGGLE_BANK };

};

var adjustVolumeAction = function adjustVolumeAction(volume) {
  return {
    type: ADJUST_VOLUME,
    volume: volume };

};

//Default State
//-----------------------------------------------------------------------------
var defaultState = {
  volume: 30,
  power: true,
  bank: false,
  display: "No Display" };


//Business Logic
//-----------------------------------------------------------------------------
var hitDrum = function hitDrum(pad) {
  document.getElementById(pad.chord).play();
  return {
    display: pad.id.replace(/-/g, ' ') };

};

var toggleBank = function toggleBank(bank) {
  return {
    bank: !bank,
    display: !bank ? SMOOTH_PIANO_KIT : HEATER_KIT };

};

var togglePower = function togglePower(power) {
  return {
    power: !power,
    display: '' };

};

var adjustVolume = function adjustVolume(volume) {
  return {
    volume: volume,
    display: VOLUME + ": " + volume };

};

//Reducers
//-----------------------------------------------------------------------------
var drumReducer = function drumReducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;var action = arguments[1];
  switch (action.type) {
    case HIT_DRUM:
      return hitDrum(action.pad);

    case TOGGLE_POWER:
      return togglePower(state.power);

    case TOGGLE_BANK:
      return toggleBank(state.bank);

    case ADJUST_VOLUME:
      return adjustVolume(action.volume);

    default:
      return state;}

};

//Store
//-----------------------------------------------------------------------------
var store = Redux.createStore(
drumReducer,
Redux.applyMiddleware(ReduxThunk.default));


//React Components
//-----------------------------------------------------------------------------
var DrumPad = function (_React$Component) {_inherits(DrumPad, _React$Component);
  function DrumPad(props) {_classCallCheck(this, DrumPad);var _this = _possibleConstructorReturn(this, (DrumPad.__proto__ || Object.getPrototypeOf(DrumPad)).call(this,
    props));
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    //this.playSound = this.playSound.bind(this);
    return _this;}_createClass(DrumPad, [{ key: "componentDidMount", value: function componentDidMount()

    {
      document.addEventListener("keydown", this.handleKeyPress);
    } }, { key: "handleKeyPress", value: function handleKeyPress(

    event) {
      if (String.fromCharCode(event.keyCode).toLowerCase() === this.props.chord.toLowerCase()) {
        this.props.hit(this.props.index);
      }
    } }, { key: "handleClick", value: function handleClick()

    {
      this.props.hit(this.props.index);
    }

    /*playSound() {
        const sound = document.getElementById(this.props.chord);
        sound.currentTime = 0;
        sound.play();
      }*/ }, { key: "render", value: function render()

    {
      var padStyle = {
        backgroundColor: "grey",
        marginTop: 10,
        boxShadow: "black 3px 3px 5px" };

      return (
        React.createElement("div", {
            id: this.props.id,
            className: "drum-pad",
            onClick: this.handleClick,
            style: padStyle },
          React.createElement("audio", {
            id: this.props.chord,
            className: "clip",
            src: this.props.src }),
          this.props.chord));


    } }]);return DrumPad;}(React.Component);var


Display = function (_React$Component2) {_inherits(Display, _React$Component2);
  function Display(props) {_classCallCheck(this, Display);return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this,
    props));
  }_createClass(Display, [{ key: "render", value: function render()

    {
      return (
        React.createElement("p", { className: "display", id: "display" }, this.props.text));

    } }]);return Display;}(React.Component);var


DrumControl = function (_React$Component3) {_inherits(DrumControl, _React$Component3);
  function DrumControl(props) {_classCallCheck(this, DrumControl);return _possibleConstructorReturn(this, (DrumControl.__proto__ || Object.getPrototypeOf(DrumControl)).call(this,
    props));
  }_createClass(DrumControl, [{ key: "render", value: function render()

    {
      return (
        React.createElement("div", { className: "drum-control" },
          React.createElement("p", null, this.props.label),
          React.createElement("div", { className: "select" },
            React.createElement("div", {
              className: "inner",
              style: { float: "right" } }))));



    } }]);return DrumControl;}(React.Component);var


DrumMachine = function (_React$Component4) {_inherits(DrumMachine, _React$Component4);
  function DrumMachine(props) {_classCallCheck(this, DrumMachine);return _possibleConstructorReturn(this, (DrumMachine.__proto__ || Object.getPrototypeOf(DrumMachine)).call(this,
    props));
  }_createClass(DrumMachine, [{ key: "render", value: function render()

    {var _this5 = this;
      var renderPads = function renderPads() {
        return drumPads.map(
        function (pad) {return React.createElement(DrumPad, _extends({ hit: _this5.props.hitDrum }, pad));});

      };
      return (
        React.createElement("div", { id: "drum-machine" },
          React.createElement("div", { className: "pad-bank" },
            renderPads()),

          React.createElement("div", { className: "controls-container" },
            React.createElement(DrumControl, { label: POWER }),
            React.createElement(Display, { text: this.props.display }),
            React.createElement(DrumControl, { label: BANK }))));



    } }]);return DrumMachine;}(React.Component);


//Mappings
//-----------------------------------------------------------------------------
var mapStateToProps = function mapStateToProps(state) {
  return _extends({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    hitDrum: function hitDrum(index) {
      dispatch(hitDrumAction(index));
    } };

};

//Connector
//-----------------------------------------------------------------------------
var Provider = ReactRedux.Provider;
var Container = ReactRedux.connect(
mapStateToProps,
mapDispatchToProps)(
DrumMachine);

//Root Render
//-----------------------------------------------------------------------------
ReactDOM.render(
React.createElement(Provider, { store: store },
  React.createElement(Container, null)),

document.getElementById("root"));