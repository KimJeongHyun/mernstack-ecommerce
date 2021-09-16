import React,{useEffect,useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { NavSideBar } from '../NavBar/NavSideBar'
import '../../css/style.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import { getClothes } from '../../_actions/user_action'

function Store(props){
    const [rendered, setRendered] = useState(false);

    const dispatch = useDispatch();
    
    const storeGrid = useRef();

    const [clothesMap,setClothesMap] = useState('');
    const [startIndex,setStartIndex] = useState('');
    const [mapLength, setMapLength] = useState(0);

    useEffect(()=>{
        dispatch(getClothes())
        .then(response=>{
            const settingState = async () => {
                const length = response.payload.length;
                const resStartIndex = response.payload.startIndex;
                const startIndexHandler = () =>{
                    setStartIndex(resStartIndex);
                }
                const mapLengthHandler = () =>{
                    setMapLength(length);
                }
                const clothesMapHandler = () =>{
                    setClothesMap(response.payload.clothesMap);
                }
                await startIndexHandler();
                await mapLengthHandler();
                await clothesMapHandler();
            }
            settingState();
        })
    },[])

    useEffect(()=>{
        if (mapLength!=0){
            const productRendering = () =>{
                let cnt = 0;
                let targetIndex=0;
                for (let i=startIndex; i<startIndex+mapLength; i++){
                    if (cnt%5==0){
                        const trTag = document.createElement('tr');
                        trTag.className = cnt;
                        targetIndex=cnt;
                        storeGrid.current.appendChild(trTag);
                    }
                    const tdTag = document.createElement('td');

                    const aTag = document.createElement('a');
                    aTag.href='/ProductDetail/'+i;

                    const imgTag = document.createElement('img');
                    imgTag.src=clothesMap[i].clothImgPath
                    aTag.appendChild(imgTag);

                    const aTag2 = document.createElement('a');
                    aTag2.href='/ProductDetail/'+i;

                    const pTag = document.createElement('p');
                    pTag.classList.add('itemName');
                    const nameNode = document.createTextNode(clothesMap[i].clothName);
                    pTag.appendChild(nameNode);
                    aTag2.appendChild(pTag);

                    const spanTag = document.createElement('span');
                    spanTag.classList.add('itemPrice');
                    const priceNode = document.createTextNode(clothesMap[i].sellPrice+'원')
                    spanTag.appendChild(priceNode);

                    tdTag.appendChild(aTag)
                    tdTag.appendChild(aTag2);
                    tdTag.appendChild(spanTag);

                    document.getElementsByClassName(targetIndex)[0].appendChild(tdTag);
                    cnt=cnt+1;
                }   
            }
            productRendering();
            setRendered(true);
        }
    },[clothesMap])

    useEffect(()=>{
        if (rendered==true){
            const storeID = document.getElementById('commerceStoreID');
            if (storeID!=null){
                const list = document.createElement('li');
                list.className='sub';
                const a = document.createElement('a');
                a.href='#'
                const textNode = document.createTextNode('Arrival');
                a.appendChild(textNode);
                list.appendChild(a);    
                
                // Arrival List

                const list2 = document.createElement('li');
                list2.className='sub';
                const a2 = document.createElement('a');
                a2.href='#'
                const textNode2 = document.createTextNode('2021 F / W');
                a2.appendChild(textNode2);
                list2.appendChild(a2);

                // 2021 F / W

                storeID.after(list2);
                storeID.after(list);
            }
        }
    },[rendered])

    

    return(
        <div id='container'>
            <NavSideBar/>
                <NavBar/>
                <div className="uxArea">
                    <div className="contentContainer">
                        <div className="uxContent" style={{paddingTop:'20px', height:'1000px'}}>
                            <table className="storeGrid" ref={storeGrid}>
                                
                            </table>
                        </div>
                    </div>
                </div>
                <Footer/>
        </div>
        
    )
}

export default Store