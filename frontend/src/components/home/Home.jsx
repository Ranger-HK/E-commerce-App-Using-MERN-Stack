import * as React from 'react';


function Home() {
  return (
    <div id="carouselBasicExample" class="carousel slide carousel-fade" data-mdb-ride="carousel">
 
     <div class="carousel-inner">

        <div>
        
          <h1 style={{color:"black"}}>Super Groccery Mart</h1>
          <h3 style={{color:"black"}}>
            Your one-stop-shop for quality products and unbeatable prices.
          </h3>
        </div>
   
        <div class="carousel-item active">
          <img src="https://img.freepik.com/free-vector/interior-supermarket-store-with-people-character-cashier-buyer_80328-122.jpg?w=826&t=st=1690458747~exp=1690459347~hmac=247e7de67ab306c5300243a90bbed658ccbac1e55c70ffaec974417a3eb01d94" style={{width:'1000px',height:'65vh'}}  class="d-block w-100" />
        </div>

    </div>
</div>
  );

  
}
export default Home;
