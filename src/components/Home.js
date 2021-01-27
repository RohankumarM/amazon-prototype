import React from 'react';
import Product from './Product';
import DellLaptop from '../images/dell_laptop.jpg';
import { ToastProvider } from 'react-toast-notifications';
import './Home.css';

function Home() {
  return (
    <ToastProvider>
      <div className="home">
        <div className="home__container">
          <img className="home__image" src="https://store-images.s-microsoft.com/image/apps.16285.14618985536919905.552c0017-6644-49a8-8467-8f7b34ce0428.30ad6b05-16d9-4d5e-a242-43107708a16a" alt="prime_logo" />

          <div className="home__row">
            <Product id="1" title="Dell G3 3500 Gaming Laptop" image={DellLaptop} price={899} rating={5} />
            <Product id="2" title="Ferrero Rocher Collection, Fine Hazelnut Milk Chocolates" image="https://images-na.ssl-images-amazon.com/images/I/81iqedVeXsL._SL1500_.jpg" price={24.99} rating={5} />
          </div>

          <div className="home__row">
            <Product id="3" title="PlayStation 5 Console" image="https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SL1500_.jpg" price={499} rating={5} />
            <Product id="4" title="The 80/20 Principle: The Secret to Achieving More with Less" image="https://images-na.ssl-images-amazon.com/images/I/81LA9WSrfeL.jpg" price={13.99} rating={5} />
            <Product id="5" title="Getting Things Done: The Art of Stress-Free Productivity" image="https://images-na.ssl-images-amazon.com/images/I/81trXFlSkCL.jpg" price={15.99} rating={5} />
          </div>

          <div className="home__row">
            <Product id="6" title="NETGEAR Nighthawk 6-Stream AX5400 WiFi 6 Router (RAX50)" image="https://images-na.ssl-images-amazon.com/images/I/61M5ky0UvCL._AC_SL1350_.jpg" price={299} rating={5} />
            <Product id="7" title="YAMAHA DGX660B 88-Key Weighted Digital Piano With Furniture Stand,Black" image="https://images-na.ssl-images-amazon.com/images/I/71M5esYEkrL._AC_SL1500_.jpg" price={799.99} rating={5} />
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}

export default Home
