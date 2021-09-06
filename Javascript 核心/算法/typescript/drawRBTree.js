// 获取层高
function getHeight(node){
    if(node === null){
        return -1
    }else{
        return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    }
}


// 绘制红黑树
function drawRBTree(node){
    const cellSize = 30 // 单元占据的的空间 和 间距
    const padding = 10; // canvas 的padding
    const nodeDeep = getHeight(node) // 从 0 开始
    // 最大层上最大可能拥有的节点数量
    const maxCell = Math.pow(2, nodeDeep)
    // canvasWidth === 总单元格宽度 + 总间距宽度 + canvas左右两百年的padding
    const canvasContentWidth = (maxCell * 2 - 1 ) * cellSize
    const canvasContentHeight = ((nodeDeep + 1) * 2 - 1) * cellSize
    const canvasWidth =  canvasContentWidth + padding * 2;
    const canvasHeight = canvasContentHeight + padding * 2;
    
    const _canvas_ = document.createElement('canvas')
    _canvas_.width = canvasWidth;
    _canvas_.height = canvasHeight;
    _canvas_.style.width = canvasWidth + 'px';
    _canvas_.style.height = canvasHeight + 'px';
    _canvas_.style.border = "1px solid #333";
    
    document.querySelector('.container').appendChild(_canvas_)

    const ctx = _canvas_.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"

    let a = [node]
    let deep = 0 // 深度
    
    while(!a.every(item => item === null)){
        // 单元格 上边的位置
        const positionYTop = deep * cellSize * 2 + padding;
        const len = a.length;  // 当前层的元素的个数
        const rowCell = canvasContentWidth / len; // 每个单元格所在的宽度
        let t = []
        a.forEach((item, index, arr) => {
            if(item !== null){ // 忽略null
                // 单元格左边的位置
                const positionXLeft = index * rowCell + rowCell / 2 + padding - cellSize / 2;
                ctx.beginPath();
                ctx.fillStyle = item.color;
                ctx.fillRect(positionXLeft,positionYTop, cellSize, cellSize) // 绘制单元格
                ctx.fillStyle = "#ffffff"
                ctx.fillText(item.key, positionXLeft + cellSize / 2, positionYTop + cellSize / 2)
                item.center = {
                    x:  positionXLeft + cellSize / 2,
                    y: positionYTop + cellSize / 2
                }
            
                if(item.parent){
                    try{
                        ctx.beginPath();
                        ctx.moveTo(item.parent.center.x , item.parent.center.y +  cellSize / 2)
                        ctx.lineTo(item.center.x, item.center.y - cellSize / 2)
                        ctx.strokeStyle= "#666"
                        ctx.stroke()
                    }catch(err){
                        console.error('绘制发生了错误： ', err)
                        console.error('item: ', item)
                        debugger;
                    }
                    
                    
                }

                t.push(item.left ? item.left : null, item.right ? item.right: null);
            }else{
                t.push(null, null)
            }
            
        })
        a = t;
        deep++;
    }
}

export {
    drawRBTree
}