/* __placeholder__ */
export default (await import('vue')).defineComponent({
props: {
pChangeNightYn: Function
},
data() {
return {
mNightYn: false,
mTownBuildingList: [
{
priority: 0,
left: '10%',
top: '20%',
w: '80px',
pcW: '80px',
pcH: 'auto',
titleLeft: '5%',
titleTop: '70%',
imgPath: require('@/assets/images/imageMain/hotBalloon.png'),
nightImgPath: require('@/assets/images/imageMain/hotBalloon.png'),
titlePah: ''
},
{
priority: 1,
left: '80%',
top: '57%',
w: '40%',
pcW: '40%',
pcH: '12%',
titleLeft: '70%',
titleTop: '70%',
imgPath: require('@/assets/images/imageMain/main_plaza.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_plaza.svg'),
titlePah: require('@/assets/images/imageMain/title_invitation.png')
},
{
priority: 2,
left: '52%',
top: '65%',
w: '40%',
pcW: '40%',
pcH: '18%',
titleLeft: '5%',
titleTop: '70%',
imgPath: require('@/assets/images/imageMain/main_campus.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_campus.svg'),
titlePah: require('@/assets/images/imageMain/title_myday.png')
},
{
priority: 4,
left: '49%',
top: '42%',
w: '55%',
pcW: '55%',
pcH: '22%',
titleLeft: '55%',
titleTop: '45%',
imgPath: require('@/assets/images/imageMain/main_classin.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_class.svg'),
titlePah: require('@/assets/images/imageMain/title_community.png')
},
{
priority: 5,
left: '83%',
top: '76%',
w: '40%',
pcW: '35%',
pcH: '15%',
titleLeft: '70%',
titleTop: '20%',
imgPath: require('@/assets/images/imageMain/main_living.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_living.svg'),
titlePah: require('@/assets/images/imageMain/title_friends.png')
},
{
priority: 6,
left: '47%',
top: '90%',
w: '55%',
pcW: '55%',
pcH: '18%',
titleLeft: '70%',
titleTop: '65%',
imgPath: require('@/assets/images/imageMain/main_nearby.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_nearby.svg'),
titlePah: require('@/assets/images/imageMain/title_nearby.svg')
},
{
priority: 7,
left: '20%',
top: '75%',
w: '35%',
pcW: '35%',
pcH: '18%',
titleLeft: '40%',
titleTop: '100%',
imgPath: require('@/assets/images/imageMain/main_lab.svg'),
nightImgPath: require('@/assets/images/imageMain/main_night_lab.svg'),
titlePah: require('@/assets/images/imageMain/title_lab.svg')
}
]
};
},
created() {
this.setNativeHeight();
// 아침, 밤 구분
let xmlHttpRequest;
if (window.XMLHttpRequest) {
// code for Firefox, Mozilla, IE7, etc.
xmlHttpRequest = new XMLHttpRequest();
} else {
return;
}

xmlHttpRequest.open('HEAD', window.location.href.toString(), false);
xmlHttpRequest.setRequestHeader('ContentType', 'text/html');
xmlHttpRequest.send('');

const serverDate = xmlHttpRequest.getResponseHeader('Date');
const date = new Date(serverDate);
const nowHours = date.getHours();

if (nowHours >= 19) {
this.pChangeNightYn(true);
this.mNightYn = true;
this.mMountainImgPath = require('@/assets/images/imageMain/main_mountain.png');
} else {
this.pChangeNightYn(false);
this.mNightYn = false;
this.mMountainImgPath = require('@/assets/images/imageMain/main_mountain.png');
}
console.log('mNightYn', this.mNightYn);
},
methods: {
setNativeHeight() {
var varUA = localStorage.getItem('systemName');
var nativeYn = localStorage.getItem('nativeYn');
if ((varUA !== undefined && varUA !== null && varUA !== '') || (nativeYn !== false && nativeYn !== 'false')) {
if ((nativeYn === true || nativeYn === 'true') || varUA === 'android' || varUA === '"Android"' || varUA === 'ios' || varUA === '"iOS"') {
this.$STATUS_HEIGHT = 35; // 35
} else {
this.$STATUS_HEIGHT = 35;
}
} else {
this.$STATUS_HEIGHT = 0;
}
},
routerPage(area) {
console.log('area', area);
if (area) {
if (area === 0) return;
if (area === 1) return;
if (area === 2) {
this.$route.push('/todo');
}
if (area === 3) return;
if (area === 4) return;
if (area === 5) return;
if (area === 6)
;
}
}
}
});
