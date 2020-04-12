<template>
  <div class="content">
    <div class="glass"></div>
    <img class="img" :src="src" />
    <div class="magnifying-view">
      <div class="magnifying-content">
        <img :src="src">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'magnifyingGlass',
  props: {
    src: {
      type: String,
    },
    multiple: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      contentData: {
        dom: '',
        width: '',
        height: ''
      },
      glassWH: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      const contentDom = document.querySelector('.content')
      const glassDom = document.querySelector('.glass')
      const viewContentDom = document.querySelector('.magnifying-view')
      this.getContentParams(contentDom)
      this.setGlassWH(glassDom)
      this.setViewContentSize(viewContentDom)
      this.mouseenter(contentDom, glassDom, viewContentDom)
      this.mousemove(contentDom, glassDom)
      this.mouseleave(contentDom, glassDom, viewContentDom)
    },
    // 获取包裹图片容器的宽高
    getContentParams(contentDom) {
      this.contentData.width = contentDom.offsetWidth
      this.contentData.height = contentDom.offsetHeight
    },
    // 设置显示放大区域的大小
    setViewContentSize(viewContentDom) {
      // 初始放大三倍
      const wh = this.multiple * this.glassWH
      viewContentDom.style.width = viewContentDom.style.height = `${wh}px`
      viewContentDom.style.left = `${this.contentData.width + 10}px`
      viewContentDom.children[0].style.width = `${this.contentData.width * this.multiple}px`
      viewContentDom.children[0].style.height = `${this.contentData.height * this.multiple}px`
    },
    // 设置放大镜的大小
    setGlassWH(glassDom) {
      const wh = this.contentData.height > this.contentData.width 
        ? this.contentData.width / this.multiple
        : this.contentData.height / this.multiple
      this.glassWH = wh
      glassDom.style.width = glassDom.style.height = `${wh}px`
    },
    // 设置放大镜的位置
    setGlassLocation(glassDom, x, y) {
      glassDom.style.top = `${y}px`
      glassDom.style.left = `${x}px`
    },
    // 设置放大后容器的位置
    setMagnifyingLocation(x, y) {
      const magnifyingContentDom = document.querySelector('.magnifying-content')
      magnifyingContentDom.style.transform = `translate(${-x}px, ${-y}px)`
    },
    // 鼠标移入时
    mouseenter(contentDom, glassDom, viewContentDom) {
      contentDom.addEventListener('mouseenter', () => {
        // 显示放大镜
        glassDom.style.display = 'block'
        // 显示放大区域
        viewContentDom.style.display = 'block'
      }, true)
    },
    // 鼠标移出时
    mouseleave(contentDom, glassDom, viewContentDom) {
      contentDom.addEventListener('mouseleave', () => {
        // 隐藏放大镜
        glassDom.style.display = 'none'
        // 隐藏放大区域
        viewContentDom.style.display = 'none'
      }, true)
    },
    // 鼠标移动时
    mousemove(contentDom, glassDom) {
      // 放大镜的大小
      const glassSize = this.glassWH
      const halfSize = glassSize / 2
      contentDom.addEventListener('mousemove', (e) => {
        let x = e.offsetX - halfSize
        let y = e.offsetY - halfSize
        if (x < 0) {
          x = 0
        }
        const maxX = this.contentData.width - glassSize // 临界值
        if (x > maxX) {
          x = maxX
        }
        const maxY = this.contentData.height - glassSize // 临界值
        if (y > maxY) {
          y = maxY
        }
        if (y < 0) {
          y = 0
        }
        this.setGlassLocation(glassDom, x, y)
        let percentX = x * this.multiple  
        let percentY = y * this.multiple
        this.setMagnifyingLocation(percentX, percentY)
      }, true)
    }
  }
}
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: move;
}
.content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.content .glass {
  position: absolute;
  display: none;
  background: #fd79a7a1;
}
.content .img {
  position: absolute; /* 防止放大镜dom触发事件 */
  mix-blend-mode: color-dodge;
}
.content .magnifying-view {
  position: absolute;
  overflow: hidden;
}
.magnifying-view .magnifying-content {
  object-fit: contain;
}
</style>
