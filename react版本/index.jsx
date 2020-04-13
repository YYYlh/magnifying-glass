import React, { Component } from 'react'
import './index.css'
class MagnifyingGlass extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }
  init() {
    const contentDom = document.querySelector('.content')
    const glassDom = document.querySelector('.glass')
    const viewContentDom = document.querySelector('.magnifying-view')
    this.setout(contentDom, glassDom, viewContentDom)
    this.mouseenter(contentDom, glassDom, viewContentDom)
    this.mouseleave(contentDom, glassDom, viewContentDom)
  }
  // 进行准备工作
  setout(contentDom, glassDom, viewContentDom) {
    // 获取包裹图片容器的宽高
    const { multiple = 3 } = this.props
    const contentData = {
      width: contentDom.offsetWidth,
      height: contentDom.offsetHeight
    }
    // 放大镜的大小
    const glassWH = contentData.height > contentData.width 
      ? contentData.width / multiple
      : contentData.height / multiple
    glassDom.style.width = glassDom.style.height = `${glassWH}px`
    // 设置放大区域的大小
    const magnifyingWH = multiple * glassWH
    viewContentDom.style.width = viewContentDom.style.height = `${magnifyingWH}px`
    viewContentDom.style.left = `${contentData.width + 10}px`
    viewContentDom.children[0].style.width = `${contentData.width * multiple}px`
    viewContentDom.children[0].style.height = `${contentData.height * multiple}px`
    // 鼠标移动
    this.mousemove(contentDom, glassDom, contentData, glassWH, multiple)
  }
  // 设置放大镜的位置
  setGlassLocation(glassDom, x, y) {
    glassDom.style.top = `${y}px`
    glassDom.style.left = `${x}px`
  }
  // 设置放大后容器的位置
  setMagnifyingLocation(x, y) {
    const magnifyingContentDom = document.querySelector('.magnifying-content')
    magnifyingContentDom.style.transform = `translate(${-x}px, ${-y}px)`
  }
  // 鼠标移入时
  mouseenter(contentDom, glassDom, viewContentDom) {
    contentDom.addEventListener('mouseenter', () => {
      // 显示放大镜
      glassDom.style.display = 'block'
      // 显示放大区域
      viewContentDom.style.display = 'block'
    }, true)
  }
  // 鼠标移出时
  mouseleave(contentDom, glassDom, viewContentDom) {
    contentDom.addEventListener('mouseleave', () => {
      // 隐藏放大镜
      glassDom.style.display = 'none'
      // 隐藏放大区域
      viewContentDom.style.display = 'none'
    }, true)
  }
  // 鼠标移动时
  mousemove(contentDom, glassDom, contentData, glassWH, multiple) {
    // 放大镜的大小
    const glassSize = glassWH
    const halfSize = glassSize / 2
    const maxX = contentData.width - glassSize // 临界值
    const maxY = contentData.height - glassSize // 临界值
    contentDom.addEventListener('mousemove', (e) => {
      let x = e.offsetX - halfSize
      let y = e.offsetY - halfSize
      if (x < 0) {
        x = 0
      }
      if (x > maxX) {
        x = maxX
      }
      
      if (y > maxY) {
        y = maxY
      }
      if (y < 0) {
        y = 0
      }
      this.setGlassLocation(glassDom, x, y)
      let percentX = x * multiple  
      let percentY = y * multiple
      this.setMagnifyingLocation(percentX, percentY)
    }, true)
  }
  render() {
    // 图片地址和放大倍数
    const { src } = this.props
    return (
      <div className="content">
        <div className="glass"></div>
        <img className="img" src={src} alt="pic" />
        <div className="magnifying-view">
          <div className="magnifying-content">
            <img src={src} alt="pic" />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.init()
  }
}
export default MagnifyingGlass