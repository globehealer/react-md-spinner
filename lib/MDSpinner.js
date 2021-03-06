"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _exenv = require("exenv");

var _exenv2 = _interopRequireDefault(_exenv);

var _cssKeyframer = require("css-keyframer");

var _cssKeyframer2 = _interopRequireDefault(_cssKeyframer);

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canUseDOM = _exenv2.default.canUseDOM;

var MDSpinner = function (_Component) {
  _inherits(MDSpinner, _Component);

  function MDSpinner(props, context) {
    _classCallCheck(this, MDSpinner);

    var _this = _possibleConstructorReturn(this, (MDSpinner.__proto__ || Object.getPrototypeOf(MDSpinner)).call(this, props, context));

    _this.keyframer = new _cssKeyframer2.default({
      userAgent: props.userAgent
    });
    return _this;
  }

  _createClass(MDSpinner, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.registerKeyframesIfNeeded();

      MDSpinner.mountedInstanceCount++;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      MDSpinner.mountedInstanceCount--;

      this.unregisterKeyframesIfNeeded();
      this.keyframer = null;
    }
  }, {
    key: "registerKeyframesIfNeeded",
    value: function registerKeyframesIfNeeded() {
      var _this2 = this;

      if (MDSpinner.mountedInstanceCount > 0) return;
      if (!this.keyframer) return;

      Object.keys(_styles.keyframes).forEach(function (key) {
        return _this2.keyframer.register(key, _styles.keyframes[key]);
      });
    }
  }, {
    key: "unregisterKeyframesIfNeeded",
    value: function unregisterKeyframesIfNeeded() {
      if (!canUseDOM) return;
      if (MDSpinner.mountedInstanceCount > 0) return;
      if (!this.keyframer) return;

      Object.keys(_styles.keyframes).forEach(function (key) {
        var $style = document.querySelector("style[data-keyframes=\"" + key + "\"]");
        if ($style) {
          $style.parentNode.removeChild($style);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var className = props.className,
          style = props.style;

      var _getStyles = (0, _styles.getStyles)(props),
          rootStyle = _getStyles.rootStyle,
          layerStyles = _getStyles.layerStyles,
          layerAfterStyle = _getStyles.layerAfterStyle,
          clipStyle = _getStyles.clipStyle,
          clip1AfterStyles = _getStyles.clip1AfterStyles,
          clip2AfterStyles = _getStyles.clip2AfterStyles;

      var layers = [];

      for (var i = 0; i < 4; i++) {
        layers.push(_react2.default.createElement(
          "span",
          { key: i, style: layerStyles[i] },
          _react2.default.createElement(
            "span",
            { style: clipStyle },
            _react2.default.createElement("span", { style: clip1AfterStyles[i] })
          ),
          _react2.default.createElement(
            "span",
            { style: clipStyle },
            _react2.default.createElement("span", { style: clip2AfterStyles[i] })
          ),
          _react2.default.createElement("span", { style: layerAfterStyle })
        ));
      }

      return _react2.default.createElement(
        "span",
        {
          className: className,
          style: _extends({}, rootStyle, style || {})
        },
        layers
      );
    }
  }]);

  return MDSpinner;
}(_react.Component);

MDSpinner.propTypes = {
  className: _propTypes2.default.string,
  userAgent: _propTypes2.default.string,
  style: _propTypes2.default.object,
  singleColor: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  duration: _propTypes2.default.number,
  color1: _propTypes2.default.string,
  color2: _propTypes2.default.string,
  color3: _propTypes2.default.string,
  color4: _propTypes2.default.string
};
MDSpinner.defaultProps = {
  size: 28,
  duration: 1333,
  color1: "rgb(66, 165, 245)",
  color2: "rgb(239, 83, 80)",
  color3: "rgb(253, 216, 53)",
  color4: "rgb(76, 175, 80)"
};
MDSpinner.mountedInstanceCount = 0;
exports.default = MDSpinner;