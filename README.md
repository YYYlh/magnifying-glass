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
import magnifyingGlass from 'magnifying-glass';
...
```
### react
```

import magnifyingGlass from 'magnifying-glass';
render() {
    const imgUrl = require('./asset/images/2.jpg')
    return (
        <div className="content">
            <MagnifyingGlass src={imgUrl} multiple={3}  />
        </div>
    )
}
...
```
