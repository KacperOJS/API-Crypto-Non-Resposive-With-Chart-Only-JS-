

const createImageOfCoin = function(coin){
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    img.src=coin.image;
    imgContainer.append(img);
    return imgContainer;

}
let toFixedValue;
const createInfoElement3 = function(value4,wartosc){
    const infoElement = document.createElement('div');
    const value4element = document.createElement('strong')
    
    value4element.innerText = value4
    let value = value4
    let toFixedValue;
    if(value > 0){
        toFixedValue = value4.toFixed(3).toLocaleString();
    }else{
        toFixedValue = value4.toFixed(9).toLocaleString();
    }
    const valueElement = document.createElement('span'); 
    valueElement.innerText = wartosc;

   
    infoElement.append(value4element);
    infoElement.append(valueElement);
    return infoElement;
}

const  createInfoElement4 = function(value5,wartosc){
    const div = document.createElement('div');
    const valueElement = document.createElement('strong');
    const valueElement2 = document.createElement('span'); 
    valueElement.innerText=value5;
    valueElement2.innerText=wartosc;
    div.append(valueElement);
    div.append(valueElement2);
    return div;

}



const createInfoElement2 = function(value3,wartosc){
    const infoElement = document.createElement('div');
    const value3element = document.createElement('strong')
    
    value3element.innerText = value3
    if(value3 > 0){
        value3element.classList.add('green_value_product');
    }else{
        value3element.classList.add('red_value_product');
    }
    const valueElement = document.createElement('span'); 
    valueElement.innerText = wartosc;

   
    infoElement.append(value3element);
    infoElement.append(valueElement);
    return infoElement;
}


const createInfoElement =function(name,wartosc){
    const infoElement = document.createElement('div');
    const labelElement=document.createElement('strong');
    labelElement.innerText = name;
   
    const valueElement = document.createElement('strong'); 
    valueElement.innerText = wartosc;
    
    infoElement.append(labelElement);
    infoElement.append(valueElement);
    return infoElement
}

const createLiTableTextElementInfo = function(coin){
    
    // const div = document.createElement('div');
    // const name1 = document.createElement('strong');
    // name1.innerText='#';
    // const name2 = document.createElement('strong');
    // name2.innerText='ImieNazwa'
    // const span1= document.createElement('span');
    // span1.innerText ='Symbol';
    // const span2= document.createElement('span');
    // span2.innerText ='Current-Price';
    // const span3= document.createElement('span');
    // span3.innerText ='Market_cap';
    // div.append(name1);
    // div.append(name2)
    // div.append(span1)
    // div.append(span2)
    // div.append(span3)
    // return div;
}

const createliCoinitemELement = function(coin){
    const coinElement = document.createElement('li');
    const anchorelement = document.createElement('a');
    anchorelement.append(createImageOfCoin(coin));
    anchorelement.href=`?coin=${coin.name}`;

    const infocontainerElement = document.createElement('div');
    const coinNameElement = document.createElement('strong');
    coinNameElement.innerText = coin.name;
    infocontainerElement.append(coinNameElement);
    infocontainerElement.append(createInfoElement('',coin.symbol));
    infocontainerElement.append(createInfoElement2(coin.price_change_percentage_24h,'%'));
    infocontainerElement.append(createInfoElement3(coin.current_price,' PLN'));
    infocontainerElement.append(createInfoElement4( coin.market_cap,'Market_cap'));
    anchorelement.append(infocontainerElement);
    coinElement.append(anchorelement);
    return coinElement
}

const createcoinList = function(coins){
    const listelement = document.createElement('ul');
        coins.forEach(coin => {
            listelement.append(createliCoinitemELement(coin));
        });
    return listelement
}

const renderCoinsList = function(coin){
    const condetail = document.querySelector('.coindetail').classList.add("delete");
    const canvas= document.querySelector('.canvas').classList.add('delete')
    const rootElement = document.querySelector('#root');
    rootElement.innerHTML ="";
    // rootElement.append(createLiTableTextElementInfo(coin))
    rootElement.append(createcoinList(coin))
}


const CreateDetailElementOFCoin =function(coin){
    // market_cap_rank:coin.market_cap_rank,
    // id: coin.id,
    // symbol: coin.symbol,
    // image: coin.image,
    // price_change_percentage_24h: coin.price_change_percentage_24h,
    // current_price: coin.current_price,
    // market_cap: coin.market_cap,
    const container = document.createElement('div');

     const coinImgElement = createImageOfCoin(coin);
     coinImgElement.classList.add('img--container--element')
    const detailNameElementCoin = document.createElement('Strong');
    detailNameElementCoin.innerText = coin.id;
    container.append(coinImgElement);
    container.append(detailNameElementCoin);
    container.append(createInfoElement('',coin.symbol));   
    container.append(createInfoElement2(coin.price_change_percentage_24h,'%'));   
    container.append(createInfoElement('current_price: ', coin.current_price.toLocaleString() +' PLN'));   
    container.append(createInfoElement('market_cap:  ',coin.market_cap)); 
    return container;  
}

const renderCoinDetailChart = function(response){
    const ctx = document.getElementById('myChart');
        // const xlabels = [1,2,3,4,5,6,7,8,9,10];
        const searchParam = new URLSearchParams(window.location.search);
        const coinCode = searchParam.get('coin').toUpperCase();
        let hoverMarker;
        const hoverMarkerBackground = {
            id:'hoverMarkerBackground',
            afterDatasetsDraw( chart,args,plugins){
                    const { ctx,chartArea:{top,bottom,left,right,width,height}} = chart;

                    if(hoverMarker === undefined){
                        return '';
                    }
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle= 'rgba(0,0,0,0.1)';
                    ctx.fillStyle= 'rgba(0,0,0,0.1)';
                    ctx.lineWidth = 3;
                    ctx.moveTo(hoverMarker,top);
                    ctx.lineTo(hoverMarker,bottom);
                    ctx.stroke();
                    ctx.lineTo(left,bottom);
                    ctx.lineTo(left,top);
                    ctx.closePath();
                    ctx.fill();
            },
            afterEvent(chart,args){
                const Xcoor = args.event.x;
                if(args.inChartArea){
                    hoverMarker = Xcoor
                }else{
                    hoverMarker = undefined;
                }
                args.changed = true;
            }

        }
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: response.prices.map((price)=>{
                return price[0];
            }),
            datasets: [{
              label: `${coinCode} Chart Database`,
              data: response.prices.map((price)=>{
                return price[1];
              }),
              borderColor: 'rgb(255,99,132)',
              fill:true,
              pointBackgroundColor:'rgba(255,255,255,0.1)',
              pointBorderColor:'rgba(255,255,255,0.1)',
              backgroundColor:'rgba(255,99,132,0.1)',
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
          plugins:[hoverMarkerBackground]
        });
}



const renderCoinDetail = function(coin){
        const rootElement = document.querySelector('#coindetail');
        rootElement.innerHTML ="";
        rootElement.append(createBackButton());
        rootElement.append(CreateDetailElementOFCoin(coin))
}



const renderChartApi = function(){
    const searchParam = new URLSearchParams(window.location.search);
    const coinCode = searchParam.get('coin').toLowerCase();
    console.log(coinCode);
     if(!coinCode){
        goBackToDashboard()
    }
    const apiChart = `https://api.coingecko.com/api/v3/coins/${coinCode}/market_chart?vs_currency=pln&days=365`;
    fetch(apiChart)
    .then(res =>res.json())
    .then((response) =>{
    console.log(response);
    renderCoinDetailChart(response)

})}



const createBackButton = ()=>{
    const anchorelement = document.createElement('a');
    anchorelement.innerText = "Wroc Do Strony Glownej";
    anchorelement.classList.add('anchor-element');
    anchorelement.href='/'


    return anchorelement;

}











let coin;
const renderDetailOfCoin =()=>{
    const container =document.querySelector('.container').classList.add("hidden");
    console.log('hello');
    const searchParam = new URLSearchParams(window.location.search);
    const coinCode = searchParam.get('coin').toLowerCase();
    console.log(coinCode);
    if(!coinCode){
        goBackToDashboard()
    }
    const API2_URL_Coin = `https://api.coingecko.com/api/v3/coins/${coinCode}`;
    fetch(API2_URL_Coin)
    .then(response => response.json())
    .then((coin) =>{
        console.log(coin);
        if(!coin){
            goBackToDashboard();
        }
        coin = {
            // market_cap_rank:coin.market_cap_rank,
            id: coin.id.toUpperCase(),
            symbol:coin.symbol.toUpperCase(),
            image:coin.image.large,
            price_change_percentage_24h: coin.market_data.price_change_percentage_24h_in_currency.pln,
            current_price: coin.market_data.current_price.pln,
            market_cap: coin.market_cap_rank,
        };
        renderCoinDetail(coin);
        renderChartApi(coin);
       
    })}

    
           



const goBackToDashboard =()=>{
    window.location.href = "/";
}






//  const api2=`https://api.coingecko.com/api/v3/coins/${coin.name}`;
// fetch(api2).then(response => response.json())
// .then(data2 => console.log(data2))


console.log(window.location.search);
if(window.location.search.includes("?coin=")){
    renderDetailOfCoin();




}else{





const Api_URL ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=100&page=1&sparkline=false';

let coiny;
fetch(Api_URL)
  .then((response) => response.json())
  .then((data) =>{
    coiny =data.map((coin)=>{
        return{
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            image: coin.image,
            price_change_percentage_24h: coin.price_change_percentage_24h.toFixed(3).toLocaleString(),
            current_price: coin.current_price,
            market_cap: coin.market_cap.toLocaleString(),
        };
        
    });
    renderCoinsList(coiny);
  });

}











































