export function axiosServer (data) {
  var api = data.api
  var param = data.param
  this.$axios.post(api, { param }
    // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
  ).then(response => {
    // alert(response)
    console.warn(response)
  }).catch((ex) => {
    // alert(ex)
    console.warn('ERROR!!!!! : ', ex)
  })
}
