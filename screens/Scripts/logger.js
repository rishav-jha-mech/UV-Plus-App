export function log(data) {
  console.log(data);
}
export function jsonify(data) {
    console.log(JSON.stringify(data,0,4));
}
export function err(data) {
    console.error(data);
}