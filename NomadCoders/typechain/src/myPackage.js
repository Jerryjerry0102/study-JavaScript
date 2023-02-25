// @ts-check
// 타입스크립트한테 자바스크립트 파일을 확인하라고 알리는 것
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}

/**
 * Exits the progam
 * @param {number} code
 * @returns {number}
 */

export function exit(code) {
  return code + 1;
}
