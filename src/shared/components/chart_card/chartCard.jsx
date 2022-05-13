import Card from "./components/card"



function ChartCard(props){
    return(
        <div className="row body-cards">
            {props.data.map(e=>
            
            <Card 
            color={e.color} 
            title={e.title} 
            value={e.value}
            description={e.description}/>)
            }
        
    </div>
    )
}
export default ChartCard