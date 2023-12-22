<template>
    <div style="width: calc(100% - 60px); height: 400px; background: #FFF; border-radius: 0.8rem; box-shadow: 0 0 4px 4px #00000036;">
        <div style="width: 100"></div>
    </div>
</template>

<script>
export default {
  props: {
    pTodoElement: {}
  },
  data () {
    return {

    }
  },
  computed: {
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', 0)
      if (detail && detail.length > 0) {
        if (
          !detail[0].D_CHAN_AUTH ||
            detail[0].D_CHAN_AUTH === true ||
            (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    CONT_DETAIL () {
      if (!this.pTodoElement) return
      var cont = this.$getContentsDetail(
        null,
        this.pTodoElement.contentsKey,
        0,
        this.pTodoElement.jobkindId
      )
      if (!cont) {
        cont = [this.pTodoElement]
      }
      if (cont && cont.length > 0) {
        return cont[0]
      } else {
        return this.pTodoElement
      }
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    }
  },
  watch: {
    CONT_DETAIL: {
      immediate: true,
      deep: true,
      handler (value, index) {
        if (val) { this.setMoreMemoBtn() }
      }
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        if (!value || !value[0]) return
        if (value[0].jobkindId !== 'TODO') return
        const newTodo = value[0]
        // let oriList = []
        newTodo.strikeOnOff = false
        newTodo.sideMenuOpenYn = false
        if (newTodo.contStatus === '99' && newTodo.contentsKey === this.CONT_DETAIL.contentsKey) {
          
        } else {
            this.mCompTodoList.content.unshift(newTodo)
        }
      },
      deep: true
    }

  }
}
</script>

<style scoped>

</style>
