<template>
    <div v-if="CONT_DETAIL" class="item-wrap">
        <div class="item">
            <p class="font14 textOverdot fontBold textLeft grayBlack ptop-05">{{ CONT_DETAIL.title }} {{CONT_DETAIL.D_MEMO_LIST && CONT_DETAIL.D_MEMO_LIST.length > 0 ? `(${CONT_DETAIL.D_MEMO_LIST.length})` : ''}}</p>
            <div style="width: 100%; height: calc(100% - 50px); display: flex; padding-top: 5px;  flex-wrap: wrap;" class="">
                <template v-for="(sticker, index) in CONT_DETAIL.stickerList" :key="index">
                    <span
                        class="todoTag mright-03"
                        :style="`background: ${sticker.picBgPath}`"
                    >
                        {{ $changeText(sticker.nameMtext) }}
                    </span>
                </template>
            </div>
            <p class="font12 grayBlack textLeft ">{{$changeDateFormat(CONT_DETAIL.creDate)}}<!-- {{ CONT_DETAIL.updDate? `(update: ${$changeDateFormat(CONT_DETAIL.updDate)})` :  ''}} --></p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pContentEle: {}
  },
  data () {
    return {
    }
  },
  computed: {
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', this.pContentEle.creTeamKey)
      if (detail && detail.length > 0) {
        // eslint-disable-next-line no-debugger
        debugger
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
      if (!this.pContentEle) return
      const teamKey = -1
      console.log(this.pContentEle)
      var cont = this.$getContentsDetail(
        this.CHANNEL_DETAIL,
        this.pContentEle.contentsKey,
        teamKey
      )
      if (!cont) {
        cont = this.pContentEle
        return cont
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.pContentEle])
      } else {
        return cont[0]
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
      // return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    }
  }
}
</script>
<style lang="scss" scoped>

.item-wrap {
    filter: drop-shadow(0 0 17px rgba(195, 197, 192, 0.3));
    position: relative;
    .item {
        height: 100%;
        width: 100%;
        padding: 0 5px;
        aspect-ratio: 416 / 395;
        border-radius: 5px;
        background: #fff;
        clip-path: polygon(0 0, 100% 0, 100% 87%, 88% 100%, 0 100%);
        position: relative;

        &::before {
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            width: 12%;
            height: auto;
            aspect-ratio: 1/1;
            background: linear-gradient(135deg, #71717169 50%, transparent 50%);
       }
    }
}
.todoTag{
    color: white;
    height:19px;
    line-height:19px;
    padding: 0px 5px;
    border-radius: 5px;
    font-size: 12px;
    width: auto;
    display:inline-block;
    vertical-align:middle;
    margin-top:-0.1rem;
}
</style>
