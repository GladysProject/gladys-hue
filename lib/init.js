module.exports = function init() {
  return setInterval(function() { gladys.modules.hue.update() }, 30 * 1000);
}