## 线性动态电路可视化分析的研究实验报告


>  !(预览版链接)(https://magicwenli.github.io/circuit_visualization/circuit_visualization.html)
>
> 使用环境：IE11以上浏览器即可

--------

###  实验内容及要求

#### 内容

通过独立编程实现一个可分析动态电路稳态、暂态响应过程的程序。

- 通过程序设计，理解暂态响应这一过程的物理意义；

- 练习并巩固如何使用数学工具描述电路结构以及响应过程；

- 实现一个具有良好交互界面的分析软件

#### 基本要求

1. 实现一个良好交互界面的应用程序；

2. 输入一阶电容电路参数，分析零状态、零输入响应过程；

3. 输入一阶电感电路参数，分析零状态、零输入响应过程；

4. 输入二阶动态电路参数，进行全响应分析；

5. 生动的展现各种分析结果。

#### 提高要求

1. 实现对电路元件、电路结构的建模；

2. 对建模电路进行自动暂态过程分析。

### 实验方法

#### 设计思路

对于一阶独立动态元件，它的的电路方程是一阶微分方程。先将电路化为以动态元件两端为一端口的戴维宁等效电路，便能得到等效电压源电压与等效电阻阻值。求出时间常数，就能得到稳态和暂态过程中动态元件两端的电压、电流。

##### 时间常数

对于RC电路：
$$
\tau=RC
$$
对于RL电路：
$$
\tau=\frac{L}{R}
$$


##### 零输入响应

$$
u_c(t)=U_0 e^{-\frac{t}{\tau}}
$$

$$
i_l(t)=I_0e^{-\frac{t}{\tau}}
$$

##### 零状态响应

$$
u_c(t)=U_s(1-e^{-\frac{t}{\tau}})
$$

$$
i_l(t)=\frac{U_0}{R}(1-e^{-\frac{t}{\tau}})
$$



##### 全响应

$$
u_c(t)=U_0 e^{-\frac{t}{\tau}}+U_s(1-e^{-\frac{t}{\tau}})
$$

$$
i_l(t)=I_0e^{-\frac{t}{\tau}}+\frac{U_0}{R}(1-e^{-\frac{t}{\tau}})
$$

以时间为横坐标轴，电容电压/电感电流为纵坐标轴画图就能得出电路响应曲线。

#### 开发环境

- JetBrains WebStorm 2019.2
- Google Chrome 77.0.3865.90

#### 用到的工具

- Html5 
- CSS3
- JavaScript

#### 实现的功能及效果

- 输入界面

![屏幕快照 2019-11-14 23.03.25](https://i.loli.net/2019/11/15/mJvX1E3uqo6beQW.png)

- 在输入电路信息后，实现对一阶RC电路暂态、稳态以及全响应过程的$U_C-t $关系图的绘制

![屏幕快照 2019-11-14 23.04.09](https://i.loli.net/2019/11/15/OF6Y3d842D5UX7e.png)

- 在输入电路信息后，实现对一阶RL电路暂态、稳态以及全响应过程的 $I_L - t$ 关系图的绘制

![屏幕快照 2019-11-14 23.04.24](https://i.loli.net/2019/11/15/xZLWhoA3uF4rRYa.png)

#### 代码片段

`script.js`文件

##### 计算RC电路横纵坐标值

```js
    var ic=0;
    for (tc = 0; tc < 5*taoC; tc=tc+taoC/4) {
      //timeC为储存t从0开始，以tao/4为步长，5*tao为终点的Array
        timeC[ic]=tc.toFixed(2);
      //uc1为储存稳态Uc值的Array
        uc1[ic]=cVoltage*Math.exp(-tc/taoC).toFixed(4);
      //uc2为储存暂态Uc值的Array
        uc2[ic]=vSorceVoltage*(1-Math.exp(-tc/taoC)).toFixed(4);
      //uc3为储存全响应Uc值的Array
        uc3[ic]=uc1[ic]+uc2[ic];
        ic++;
    }
```

##### 作图

```js
//初始化
var ctx=document.getElementById("rcChart");
var rcChart;
		rcChart = new Chart(ctx, {
      //类型：线形
        type: 'line',
        data: {
          //横坐标值 Array类型
            labels: timeC,
            datasets: [
              //数据集 Array类型
                {
                    data: uc1,
                    label: "稳态",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: uc2,
                    label: "暂态",
                    borderColor: "#4ecd00",
                    fill: false
                },
                {
                    data: uc3,
                    label: "全响应",
                    borderColor: "#cd0017",
                    fill: false
                }
            ]
        }
    });
```



`circuit_visualization.html`文件

##### 上半部分区域

```html
<div class="main-row main-top">
```

```html
<!-- 使用无序列表<li>容纳文本标签<h3>和输入框<input> -->
<li>
					<h3>电容电压/V<br>电感电流/A</h3>
					<p> </p>
<!-- 设置输入框默认值，简化操作 -->
					<input id="cvt" type="number" name="电容电压" min="0" required="required"
						   value="5"
						   onfocus="if(value=='5'){value=''}"
						   onblur="if(value==''){value='5'}">
					<p> </p>
					<input id="lcc" type="number" name="电感电流" min="0" required="required"
						   value="2"
						   onfocus="if(value=='2'){value=''}"
						   onblur="if(value==''){value='2'}">
</li>
```



##### 下半部分区域

```html
<div class="main-row main-bottom">
```

```html
<!--在圈定的 graph-grid 区域作图-->
<div class="graph-grid">
<canvas id="rcChart" width="825" height="470"></canvas>
</div>
```



`style.css`文件

主要包含了网页的各种样式



#### 参考资料

- 邱关源,罗先觉.电路（第五版）.高等教育出版社:北京,2015

- Chart.js.https://www.chartjs.org/
- Data visualization with Chart.js: An introduction.https://tobiasahlin.com/blog/introduction-to-chartjs/
- W3Layouts.Free Website Templates.http://w3layouts.com/
- 腾讯云.https://cloud.tencent.com/

