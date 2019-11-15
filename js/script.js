var taoC;
var taoL;
var timeC=[];
var timeL=[];
var uc1=[];
var uc2=[];
var uc3=[];
var il1=[];
var il2=[];
var il3=[];

var cluc1=[];
var clul1=[];
var cluc2=[];
var clul2=[];
var cluc3=[];
var clul3=[];

var ctx = document.getElementById("rcChart");
var ltx=document.getElementById("rlChart");
var cltx=document.getElementById("rclChart");
var rcChart;
var rlChart;
var rclChart;

function getInf() {
    var vSorceVoltage=document.getElementById("vt").value;
    var cVoltage=document.getElementById("cvt").value;
    var lCurrent=document.getElementById("lcc").value;
    var resistance=document.getElementById("rs").value;
    var cpValue=document.getElementById("cv").value;
    var idValue=document.getElementById("lv").value;

    taoC=resistance*cpValue;
    taoL=idValue/resistance;
    timeC=[];
    timeL=[];
    uc1=[];
    uc2=[];
    uc3=[];
    il1=[];
    il1R=[];
    il1L=[];
    il2=[];
    il3=[];

    cluc1=[];
    clul1=[];
    cluc2=[];
    clul2=[];
    cluc3=[];
    clul3=[];


    var ic=0;
    for (tc = 0; tc < 5*taoC; tc=tc+taoC/4) {
        timeC[ic]=tc.toFixed(2);
        uc1[ic]=cVoltage*Math.exp(-tc/taoC).toFixed(4);
        uc2[ic]=vSorceVoltage*(1-Math.exp(-tc/taoC)).toFixed(4);
        uc3[ic]=uc1[ic]+uc2[ic];
        ic++;
    }

    var il=0;
    for (tl = 0; tl < 5*taoL; tl=tl+taoL/4){
        timeL[il]=tl.toFixed(2);
        il1[il]=lCurrent*Math.exp(-tl/taoL).toFixed(4);
        il2[il]=vSorceVoltage/resistance*(1-Math.exp(-tl/taoL)).toFixed(4);
        il3[il]=il1[il]+il2[il];
        il++;
    }

    var derta=2*Math.sqrt(idValue/cpValue);
    var icl=0;
    if (resistance >= derta){
        var p1 = -resistance/(2*idValue)+Math.sqrt((resistance/(2*idValue))**2 - 1/(idValue*cpValue));
        var p2 = -resistance/(2*idValue)-Math.sqrt((resistance/(2*idValue))**2 - 1/(idValue*cpValue));
        for(t=0;t<1;t=t+0.015){
            cluc1[icl]=cVoltage/(p2-p1)*(p2*Math.exp(p1*t)-p1*Math.exp(p2*t)).toFixed(4);
            clul1[icl]=-cVoltage/(p2-p1)*(p1*Math.exp(p1*t)-p2*Math.exp(p2*t)).toFixed(4);
            cluc2[icl]=vSorceVoltage*(1-1/(p2-p1)*(p2*Math.exp(p1*t)-p1*Math.exp(p2*t))).toFixed(4);
            clul2[icl]=-vSorceVoltage*(1-1/(p2-p1)*(p1*Math.exp(p1*t)-p2*Math.exp(p2*t))).toFixed(4);
            cluc3[icl]=cluc1[icl]+cluc2[icl];
            clul3[icl]=clul1[icl]+clul2[icl];
            icl++;
        }
    }

    rcChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeC,
            datasets: [
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

    rlChart = new Chart(ltx, {
        type: 'line',
        data: {
            labels: timeL,
            datasets: [
                {
                    data: il1,
                    label: "稳态",
                    borderColor: "#3e95cd",
                    fill: false
                },

                {
                    data: il2,
                    label: "暂态",
                    borderColor: "#cd00b3",
                    fill: false
                },
                {
                    data: il3,
                    label: "全响应",
                    borderColor: "#cd0021",
                    fill: false
                }
            ]
        }
    });

    rclChart = new Chart(cltx,{
        type: 'line',
        data: {
            labels: timeL,
            datasets: [
                {
                    data: cluc1,
                    label: "稳态-C",
                    borderColor: "#cd707c",
                    fill: false
                },

                {
                    data: clul1,
                    label: "稳态-L",
                    borderColor: "#80cd68",
                    fill: false
                },
                {
                    data: cluc2,
                    label: "暂态-C",
                    borderColor: "#cd658f",
                    fill: false
                },
                {
                    data: cluc2,
                    label: "暂态-L",
                    borderColor: "#7cc4cd",
                    fill: false
                },
                {
                    data: cluc3,
                    label: "全-C",
                    borderColor: "#cd001c",
                    fill: false
                },
                {
                    data: clul3,
                    label: "全-L",
                    borderColor: "#0016cd",
                    fill: false
                }

            ]
        }
    })
}