import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import servicesStyle from '../../styles/Services.module.css'

import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';

export default function Services(props) {

    const data = props.services.data;

    const [cardIndex, setCardIndex] = useState([]);
    const [serviceCart, setServiceCart] = useState([]);
    let selectedItem = {};

    function addToServiceCart(service) {
        if (serviceCart.length + 1 > data.length) {
            // serviceCart.slice(2);
            alert('يمكنك إضافة خدمتين فقط');
        } else {
            setServiceCart([...serviceCart, { ...service }]);
            service.disabled = true;
            
        }
        // console.log(serviceCart);

    };
    function checkedStyle(idx) {
        if(cardIndex.length +1 > data.length){
            // cardIndex.slice(2);
        }else{
        setCardIndex([...cardIndex, idx ]);

        console.log('the indexes are '+cardIndex);
        }
    };
    useEffect(() => {
        let sum = 0;
        serviceCart.map( serv => {
            sum = sum + serv.cost;
        })
        selectedItem = {name: 'الخدمات المضافة ', cost: sum}
        localStorage.setItem('services', JSON.stringify(selectedItem));
    }, [serviceCart])
    const cardsShow = (
        <div>
            {data.map((card, i) =>
                <Card key={card.id} onClick={() => { addToServiceCart(card, i); checkedStyle(i); }} className={cardIndex.includes(i) ? servicesStyle.servicesChecked : servicesStyle.services}>
                    <Card.Body className={servicesStyle.card}>
                        <div className={servicesStyle.cardDetails}>
                            <FileCopyIcon className={cardIndex.includes(i) ? servicesStyle.cardIconChecked : servicesStyle.cardIcon}></FileCopyIcon>
                            <div className={servicesStyle.cardHead}>
                                <Card.Title className={cardIndex.includes(i) ? servicesStyle.cardTitleChecked : servicesStyle.cardTitle}>
                                    {card.item_name}
                                </Card.Title>
                                <Card.Subtitle className={cardIndex.includes(i) ? servicesStyle.cardSubtitleChecked : servicesStyle.cardSubtitle}>{card.desc} </Card.Subtitle>
                            </div>
                        </div>
                        <Button size="md" disabled className={servicesStyle.cardBtn} className={servicesStyle.cardBtn}>
                            {card.cost}
                        </Button>
                        <div className={cardIndex.includes(i) ? servicesStyle.doneIconChecked : servicesStyle.doneIcon}>
                            <DoneIcon></DoneIcon>
                        </div>

                    </Card.Body>
                </Card>
            )}
        </div>

    )



    return (

        <div className={servicesStyle.servicesComp} >
            <div className={servicesStyle.headingGroup}>
                <h1 className={servicesStyle.heading}> الخدمات</h1>
                <div className={servicesStyle.subHeading}> اختر من القائمة ما تود إضافته من خدمات الى مصحفك</div>
            </div>
            {cardsShow}
        </div>
    )

}