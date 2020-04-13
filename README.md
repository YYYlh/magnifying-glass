# magnifying-glass
放大镜组件

## 实例
- src 图片地址
- multiple 放大倍数（默认值为3）
### vue
```
<div style="width: 300px; height: 200px;">
    <magnifyingGlass :src="require('../assets/images/2.png')" :multiple="3" />
</div>
import magnifyingGlass from 'vue-magnifying-glass';
...
```
### react
```

import magnifyingGlass from 'vue-magnifying-glass';
render() {
    retutn (
        <div style="width: 300px; height: 200px;">
            <magnifyingGlass :src="require('../assets/images/2.png')" :multiple="3" />
        </div>
    )
}
...
```
