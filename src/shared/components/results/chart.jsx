import 'chart.js/auto';
import { Doughnut,Chart} from 'react-chartjs-2';
import './chart.css'

const data = {
  
    labels: [
        'Preço com g20 - R$ 600,00',
        'Preço Praça - R$ 800,00'
    ],

    datasets: [{
        
        cutout:85,
        rotation:-90,
        circumference:180,
        label: 'My First Dataset',
        data: [50, 80,],
        backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
    
        hoverOffset: 4
    }]
};
const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         var fontSize = (height / 120).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         var text = "R$ 1.400,00",
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 1.5;
         ctx.fillText(text, textX, textY,);
         ctx.save();
    } 
  }]

function PieChart(props) {
    return (
        <div className='size'>
            
            <Doughnut 
                data={data}
                plugins = {plugins}
                options={{
                    
                    plugins: {
                      
                        legend: {
                            display: true,
                            position:'bottom',
                        align:'center',

                        },
                    
                        title: {
                            position: 'top',
                            align: 'center',
                            display: true,
                            text: 'DashBoard',
                        }
                    },

                    aspectRatio: 4
                }}
            >
            </Doughnut >
        </div>)
};

export default PieChart;