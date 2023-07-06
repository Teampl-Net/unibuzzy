<template>
  <div id="alimWrap" class="w100P h100P chanDetailWrap" ref="chanScrollWrap" style="overflow: hidden scroll;">
    <div ref="summaryWrap" v-if="!propParamsPopShowYn" style="margin-top: 5px;" class="summaryWrap">
      <div ref="chanInfoSummary" style="background-position: center; width:100%; height:100px; position: relative; background-size: contain;background-position-y: 40px;background-repeat: no-repeat;">
        <div class="w100P h100P" style="">
          <!-- <img src="../../assets/images/contents/chanBgImg.jpeg" style="width:100%; background: white; height: calc(100% + 50px); position: absolute; left: 0; top: -50px;" /> -->
          <img src="" style="width:100%; background: white; height: calc(100% + 50px); position: absolute; left: 0; top: -50px;" />
          <div class="w100P" style="height: calc(100% + 50px); position: absolute; left: 0; top: -50px; background: linear-gradient(to bottom, rgba(20, 20, 20, 0) 20%,rgba(20, 20, 20, 0.25) 50%,rgba(20, 20, 20, 0.5) 70%,rgba(20, 20, 20, 0.6) 90%,rgba(20, 20, 20, 0.8) 100%);"></div>
          <div class="font22 fontBold textLeft" style=" position: absolute; left: 125px;bottom: 5px; color: white;">{{ propParams.nameMtext }}</div>
          <div id="chanAlimListBG" ref="chanAlimListBG" class="chanImgRound" :style="{ backgroundImage: 'url(' + propParams.logoImg + ')' }"></div>
        </div>

        <div class="chanInfoWrap" style="width: 100%; float: left;height:148px; padding: 20px; padding-top: 60px !important; box-sizing:border-box; word-break:break-all">
          <div class="fontBold font14 textLeft" style=" width:100%; word-break:break-all">{{ propParams.description }}</div>

          <div style=" width:100% ;min-height:20px; margin-bottom: 5px;">
            <div v-if="propParams.followerList" class="fontBold font14" style="float: left; margin-right:20px">Follower: <span style="color:black; font-weight: 1000;">{{ propParams.followerList.length }}</span></div>
            <div v-if="propParams.managerList" class="fontBold font14" style="float: left;">Manager: <span style="color:black; font-weight: 1000;">{{ propParams.managerList.length }}</span></div>
          </div>
        </div>

      </div>
    </div>
    <div class="channelItemBox" ref="channelItemBox" style="margin-top: 250px; background: #ddd; padding-top: 0; overflow: hidden; border-top:2px solid #DADCE3;">
      <gFeedList class="w100P" style="" @goScroll="mChanMainScrollWrap.style.overflow = 'scroll'" />
    </div>
    <div @click="backToMap" class="fontBold" style="position: fixed; bottom: 30px; width: 200px; left: calc(50% - 100px); border-radius: 10px; padding: 5px; background: #ccc; ">Back To Map</div>
  </div>
</template>
<script>
export default {
  props: {
    propParams: {}
  },
  created () {
    alert('yes!')
    console.log(this.propParams)
    // this.readyFunction()
  },
  methods: {
    async readyFunction () {
      // eslint-disable-next-line no-debugger
      debugger
      const directUrl = localStorage.getItem('urlString')
      if (directUrl) {
        const directUrlObj = JSON.parse(directUrl)
        if (directUrlObj.teamKey) {
          const chanDetail = await this.$addChanList(directUrlObj.teamKey)
          // eslint-disable-next-line vue/no-mutating-props
          this.mDirectTeamKey = chanDetail
        }
      } else {
        this.$showAxiosLoading(true)
        if (this.chanDetail.initData) {
          if (this.chanDetail.initData.team.D_CHAN_AUTH && this.chanDetail.initData.team.D_CHAN_AUTH.followYn) {
            this.$emit('followYn')
          }
          if (this.CHANNEL_DETAIL) {
            console.log(this.chanDetail.initData.team.copyTextStr === undefined)
            if ((this.chanDetail.initData.team.copyTextStr === undefined && this.CHANNEL_DETAIL.copyTextStr === undefined) && !this.mMakeDeepLinkIng) {
              this.mMakeDeepLinkIng = true
              const title = '[더알림]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
              const message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
              const this_ = this
              this.$makeShareLink(this.CHANNEL_DETAIL.teamKey, 'chanDetail', message, title).then(res => {
                this.CHANNEL_DETAIL.copyTextStr = res
                this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
                this_.mMakeDeepLinkIng = false
              })
            }
          }
        }
      }

      this.$emit('closeLoading')
      this.$showAxiosLoading(false)
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      if (!this.propParams) return {}
      let teamKey
      if (this.propParams) {
        teamKey = this.propParams.targetKey || this.propParams.teamKey
      }
      const detail = this.$getDetail('TEAM', teamKey)
      console.log('detail', detail)
      if (detail && detail.length > 0) {
        if (detail[0].blackYn) this.$emit('bgcolor', detail[0].blackYn)

        if (detail[0] && (detail[0].blackYn !== undefined && detail[0].blackYn !== null && detail[0].blackYn !== '')) {
          this.$emit('bgcolor', detail[0].blackYn)
        } else {
          this.$emit('bgcolor', false)
        }

        // eslint-disable-next-line no-debugger
        debugger
        if (!detail[0].D_CHAN_AUTH || detail[0].D_CHAN_AUTH === true || (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          if (this.CHANNEL_DETAIL && (this.CHANNEL_DETAIL.blackYn !== undefined && this.CHANNEL_DETAIL.blackYn !== null && this.CHANNEL_DETAIL.blackYn !== '')) {
            this.$emit('bgcolor', this.CHANNEL_DETAIL.blackYn)
          } else {
            this.$emit('bgcolor', false)
          }
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    }
  }
}
</script>
<style scoped>
.summaryWrap{height: 250px; width: 100%; float: left; position: absolute;}
.displayNIm {
  display: none!important;
}
.channelItemBoxHeight{height: calc(100% - 50px)!important; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; }
.chanAlimProfileWrap {
    width: 100px!important;
}
.chanAlimProfileWhiteBack {
    width: 100px!important;
    height: 100px!important;
}
.chanImgRound{
  width: 100px; height: 100px;
  bottom: -50px; left: 15px; position: absolute;
  display: flex; align-items: center; justify-content: center;
  border-radius: 100%;
  border-top: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;
  background-repeat: no-repeat; background-size: cover; background-position: center; background-color:white;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.scroll {
  -ms-overflow-style: none;
  /* 인터넷 익스플로러 */
  scrollbar-width: none;
  /* 파이어폭스 */
}
</style>
