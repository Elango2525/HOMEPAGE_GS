import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [quantity, setQuantity] = useState(1);
  const dropdownSections = [
    {
      name: 'Tools',
      subcategories: ['Hand Tools', 'Power Tools', 'Gardening Gloves'],
      icon: faCartPlus,
    },
    {
      name: 'Equipment',
      subcategories: ['Lawn Mowers', 'Pruning Shears', 'Watering Cans'],
      icon: faCartPlus,
    },
    {
      name: 'Plants',
      subcategories: ['Flowering Plants', 'Indoor Plants', 'Herbs'],
      icon: faCartPlus,
    },
    {
      name: 'Seeds',
      subcategories: ['Flower Seeds', 'Vegetable Seeds', 'Grass Seeds'],
      icon: faCartPlus,
    },
    {
      name: 'Fertilizers',
      subcategories: ['Organic Fertilizers', 'Chemical Fertilizers', 'Compost'],
      icon: faCartPlus,
    },
    {
      name: 'Pesticides',
      subcategories: ['Insecticides', 'Herbicides', 'Fungicides'],
      icon: faCartPlus,
    },
    {
      name: 'Garden Decor',
      subcategories: ['Statues', 'Outdoor Lighting', 'Bird Baths'],
      icon: faCartPlus,
    },
    {
      name: 'Offers',
      subcategories: ['Super offers', 'Bank offers'],
      icon: faCartPlus,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [quantities, setQuantities] = useState(Array(dropdownSections.length).fill(1));

  const handleDropdownToggle = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('');
  };
  const handleProfileIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };
  
  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  

  const filteredSections = dropdownSections.filter((section) => {
    const matchedCategory = section.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedSubcategories = section.subcategories.some((subcategory) =>
      subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchedCategory || matchedSubcategories;
  });
  

  const handleSubcategoryClick = (subcategory) => {
    console.log(`Clicked subcategory: ${subcategory}`);
  };

  const handleAddToCart = () => {
    setCartItemsCount(cartItemsCount + 1);
  };
  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  return (
    <div className="product-catalog">
      <div className="top-section">
        <div className="top-section-left">
          <h3>Gardening Store</h3>
        </div>
        <div className="top-section-center">
          <h3>Free shipping above &#8377;500</h3>
        </div>
        <div className="top-section-right">
          <h3>Call us: 6384318848</h3>
        </div>
      </div>
      <div className="categories-search-container">
        <input
          type="text"
          placeholder="Search for seeds, flowers, garden decor etc.,"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange} />

        <div className="categories-container">
          {filteredSections.length > 0 ? (
            filteredSections.map((section,index) => (
              <div
                key={section.name}
                className={`dropdown-section ${selectedCategory === section.name ? 'active' : ''}`}
                onMouseEnter={() => handleDropdownToggle(section.name)}
                onMouseLeave={() => handleDropdownToggle(section.name)}
              >
                <h2>{section.name}</h2>
                {selectedCategory === section.name && (
                  <ul>
                    {section.subcategories
                      .filter((subcategory) =>
                        subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((subcategory) => (
                        <li
                          key={subcategory}
                          className={
                            subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                              ? 'highlight'
                              : ''
                          }
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          {subcategory}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.Af21XA7JftJ_GcKHaZE7hgHaDW&pid=Api&P=0&h=180"
                alt="No results"
              />
              Oops, nothing here.
            </div>
          )}
          <div className="cart-container">
            <a href="/cart">
              <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
              {cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
            </a>
          </div>
          
          <div className="setting-container">
            <a href="/settings">
              <FontAwesomeIcon icon={faCog} className="settings-icon"/>
            </a>
          </div>
          <div className="prof-container"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <a href="/profile">
    <FontAwesomeIcon icon={faUser} className="profile-icon" />
  </a>
  {isDropdownVisible && (
    <div className="dropdown">
      <ul>
        <li>ELANGOVAN S</li>
        <li><Link to='/' className="logout-link">LOGOUT</Link></li>
        
      </ul>
    </div>
  )}
</div></div></div>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        className="carousel"
      >
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/plantquiz_b6b18dfb-eaf9-48bc-8c97-f87facfcee37.jpg?v=1688041112" alt="Slide 1" />
        </div>
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/DECOR.jpg?v=1686403513&width=2200" alt="Slide 2" />
        </div>
        <div>
          <img src="https://www.ugaoo.com/cdn/shop/files/personalisedgift.png?v=1682793630" alt="Slide 3" />
        </div>
      </Carousel>
      <div className="product-catalog-container">
        <div className="image-container">
          <div className="image-item">
            <img src="https://www.kellogggarden.com/wp-content/uploads/2020/03/Sprouting-Seeds.jpg" alt="Image 1" />
            <h3>Organic plants</h3>
          </div>
          <div className="image-item">
            <img src="https://tse2.mm.bing.net/th?id=OIP.gEx4MslC-yD2asZGSC_fGgHaE8&pid=Api&P=0&h=180" alt="Image 2" />
            <h3>Exclusive collections</h3>
          </div>
          <div className="image-item">
            <img src="https://specials-images.forbesimg.com/imageserve/5f3ea672fa14090cf1e4e7ac/960x0.jpg?fit=scale" alt="Image 3" />
            <h3>Indoor/Outdoor plants</h3>
          </div>
          <div className="image-item">
            <img src="https://tse4.mm.bing.net/th?id=OIP.LwPiE8SKef7t3Fz0J2OLNgHaEK&pid=Api&P=0&h=180" alt="Image 4" />
            <h3>Native seeds</h3>
          </div>
          <div className="image-item">
            <img src="https://tse1.mm.bing.net/th?id=OIP.1-QgFFdVRBJWg5P5qyJQcgHaFX&pid=Api&P=0&h=180" alt="Image 5" />
            <h3>Organic Pest Control</h3>
          </div>
          <div className="image-item">
            <img src="https://faddegons.com/wp-content/uploads/2015/04/garden-decor.jpg" alt="Image 6" />
            <h3>Garden decor collections</h3>
          </div></div></div>
        
      <div>
  <h1 className='what'>What are you looking for?</h1>
  <div className="images-row">
    <div className="images-column">
      <div className="images-item">
        <img src="https://www.ugaoo.com/cdn/shop/files/plants_f94dbc15-5a1d-4c15-bce2-dcdf22e7fca3.png?v=1679334068" alt="Image 1" />
        <h3>Plants</h3>
      </div>
    </div>
    <div className="images-column">
      <div className="images-item">
        <img src="https://www.ugaoo.com/cdn/shop/files/pots_and_planters.png?v=1679334108" alt="Image 2" />
        <h3>Pot & Planters</h3>
      </div>
    </div>
    <div className="images-column">
      <div className="images-item">
        <img src="https://www.ugaoo.com/cdn/shop/files/plant_care_9f3d5103-7a07-4491-a866-c13112dc1f21.png?v=1679334126" alt="Image 3" />
        <h3>Plant Care</h3>
      </div>
    </div>
    <div className="images-column">
      <div className="images-item">
        <img src="https://www.ugaoo.com/cdn/shop/files/seeds_d1444f50-6be6-4575-8256-914cd5317320.png?v=1679334092" alt="Image 4" />
        <h3>Seeds</h3>
      </div>
    </div>
  </div>
</div><br></br>

      <div className='best-seller'>
  <h2 className="animated-text">
    <FontAwesomeIcon icon={faStar} className="star-icon" />
    Best Seller
  </h2>
</div>

<br></br>
<div className='image-row'>
  <div className='image-column'>
  <div className='image-reItem'>
    <img src="https://www.ugaoo.com/cdn/shop/products/GroPot_1cd9e614-4bc8-4c54-94a9-d8d30df5fc27.jpg?v=1688563979" alt="Image11"/>
    <p className="price-info">
    <div className="quantity-input">
        <label className="quantity-label"></label>
        <div className="quantity-field">
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
          
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div><h2><div className='prod-name'>Money Plant Golden</div></h2>
          <span className="original-price">&#8377;500</span>
          <span className="discounted-price">From &#8377;350</span>
          <span className='shipping'>/ Delivery @ &#8377;33</span>
        </p>
        <div children='buy-now-button'>
    <button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
{cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
   </div> <br></br><button className="buy-now-button">BUY PRODUCT</button>

    <div className="text-overlay">
      <h2>30% OFFER</h2>
  </div></div>
    </div><div className='image-column'>
      <div className='image-reItem'>
        <img src="https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121" alt="Image12"/>
    <p className="price-info">
    <div className="quantity-input">
        <label className="quantity-label"></label>
        <div className="quantity-field">
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
          
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div><h2><div className='prod-name1'>Lucky Bamboo Plant</div></h2>
          <span className="original-price">&#8377;950</span>
          <span className="discounted-price">From &#8377;550</span>
          <span className='shipping'>/ Free delivery</span>
        </p>
        <div children='buy-now-button'>
    <button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
{cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
   </div> <br></br>
      <button className="buy-now-button">BUY PRODUCT</button></div>
    <div className="text-overlay1">
      
    </div></div>
  
</div>
<div className='image-row'>
  <div className='image-column'>
  <div className='image-reItem'>
    <img src="https://www.ugaoo.com/cdn/shop/products/the-watermatic-stake-classic-xl-31261231775876.png?v=1675624137" alt="Image11"/>
    <p className="price-info">
    <div className="quantity-input">
        <label className="quantity-label"></label>
        <div className="quantity-field">
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
          
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div><h2><div className='prod-name2'>The Watermatic Stake-XL</div></h2>
          <span className="original-price">&#8377;999</span>
          <span className="discounted-price">From &#8377;599</span>
          <span className='shipping'>/ Free delivery</span>
        </p>
        <div children='buy-now-button'>
    <button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
{cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
   </div> <br></br><button className="buy-now-button">BUY PRODUCT</button>
   
    <div className="text-overlay">
      <h2>SUPER OFF</h2>
  </div></div>

    </div><div className='image-column'>
      <div className='image-reItem'>
        <img src="https://www.ugaoo.com/cdn/shop/products/multicolour-set-of-5-1.png?v=1661284213" alt="Image12"/>
    <p className="price-info">
    <div className="quantity-input">
        <label className="quantity-label"></label>
        <div className="quantity-field">
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
          
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div><h2><div className='prod-name3'>Self Watering Planter(5)</div></h2>
          <span className="original-price">&#8377;1099</span>
          <span className="discounted-price">From &#8377;799</span>
          <span className='shipping'>/ Free delivery</span>
        </p>
        <div children='buy-now-button'>
    <button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
{cartItemsCount > 0 && <span className="cart-notification">{cartItemsCount}</span>}
   </div> <br></br>
      <button className="buy-now-button">BUY PRODUCT</button></div>
      
    <div className="text-overlay1">
      
    </div></div></div><br></br><br></br>
    <div className="underline"></div>
<div className='why'>
  <h1>Why Garden Store?</h1><br></br>
  <div className='recycle'>
    <div className='sample1'>
      <div className='samepleItems'><div className='recyclable'>
    <img src="https://www.ugaoo.com/cdn/shop/files/Packaging_2x_48553436-be2f-4d7a-a08e-495c8665abae_small.png?v=1656421502" alt="recycle"></img>
    <h2 >Secure and Recyclable Packaging</h2></div></div>
<div className='sampleItems'><div className="replace">
  <img src="https://www.ugaoo.com/cdn/shop/files/Returns_2x_9d73addf-8f69-42d6-b602-79cc4bb7b28d_small.png?v=1656421516" alt="replacement"/>
<h2>Free Replacements if
Damaged</h2></div>
</div>
<div className='sampleItems'><div className='pot'>
  <img src="https://www.ugaoo.com/cdn/shop/files/Pot_2x_296c9f06-b47d-4dc9-b00e-18c42a3e165e_small.png?v=1656421532" alt="replacement"/>
<h2>Self-Watering Pots with
Every Plant</h2></div>
</div>
  </div></div><br></br><br></br>
    <div className="underline"></div>
    <br></br><footer className="footer">
  <div className="footer-links">
    <div className='rowCol'>
    <div className='about'>
    <a>About</a></div></div><div className='about-det'>History</div><div className='about-det1'>Awards</div>
    <div className='rowCol'>
    <div className='contact'>
    <a>Contact</a></div><div className='contact-det'>Fax: +1(555)123-4567</div><div className='contact-det1'>Whatsapp: 6384318848</div>
    
    <div className='follow'>
    <a>Follow us</a></div></div>
    <div className='instaIcon'>
    <a href="https://www.instagram.com/im_elango._/"><FontAwesomeIcon icon={faInstagram} className="insta-icon" /></a>
    </div>
    <div className='fbIcon'><a href="https://www.facebook.com/elango.thangam.315?mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} className="fb-icon"/></a>
  </div></div>
  
  <div className="footer-info">
  <div className='rowCol'>
    <p>&copy; 2023 Gardening Store. All rights reserved.</p>
  </div></div>
</footer>
    

      <div>
        
      </div>
      <div>
        
      </div>
</div>




    </div>
  );
};

export default ProductCatalog;
