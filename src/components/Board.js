import React from 'react'
import Card from "./Card"
import shuffle from "./shuffle"
import createCards from "./createCards"

const howManyCards = 20;
var moves=0;
export default function Board() {
    //luon ja sekoitan kortit
    const [cards, setCards] = React.useState(shuffle(createCards(howManyCards)))
    //checks on kortit joita katsot väliaikaisesti
    const [checks, setChecks] = React.useState([])
    //completed on kortit jotka jäävät pöydälle
    const [completed, setCompleted] = React.useState([])

    const onCardClick = card => () => {

        //jos checkejä on 2 et voi clickata lisää
        //tai jos checkejä on jo 1 ja se on sama kuin mitä yrität checkata
        if (checks.length === 2 || (checks.length === 1 && checks[0].id === card.id)) return(null)

        //ei toiminut muuten jostain syystä. Thanks google
        const newchecks = [...checks, card]
        setChecks(newchecks)

        //jos checkejä on 2 ja ne ovat samanlaisia tyypiltään setCompleted
        if (newchecks.length === 2 && newchecks[0].type === newchecks[1].type) {
        setCompleted([...completed, newchecks[0].type])
            //voitto
            if(completed.length === howManyCards/2-1){
                console.log("winner");
            }
        }
        //jos checkejä on 2 tyhjennä checkit. Timeout koska muuten ei ehdi nähdä kortteja
        if (newchecks.length === 2) {
            moves=moves+1;
            setTimeout(() => {
                setChecks([])
            }, 750)
        }
    }
    //setCards että voi rendata + copypaste sekoitusta
    React.useEffect(() => {
        const newCards = cards.map(card => ({
            ...card,
            isFlipped:
                checks.find(c => c.id === card.id) ||
                completed.includes(card.type),
        }))
        setCards(newCards)
    // eslint-disable-next-line
    }, [checks, completed]);
    
    return (
        <div className="Board">
            <button className="restart" onClick={function(){
                moves=0;
                setChecks([])
                setCompleted([]);
                setTimeout(() => {//timeout koska muuten näkee mihin kortit sekoittuvat
                    setCards(shuffle(createCards(howManyCards)));
                }, 500)
                }}>Restart
            </button>
                Moves: {moves}
            <div className="Grid">
                {cards.map(function(card){
                    return(<Card {...card} onClick={onCardClick(card)} />)
                })}
            </div>
        </div>
    )
}