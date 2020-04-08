export default function createCards(int) {
    let id=0;
    let card=[];
    let cards=[];
    int = int/2;//2 jokaista korttia
    for (let i=0; i<int; i++) {
        for (let j=0; j<2; j++) {
            card={key: id, id: id, cardNumber: i, type: i, isFlipped: false}
            cards.push(card);
            id=id+1;
        }
    }
    return(cards)
}