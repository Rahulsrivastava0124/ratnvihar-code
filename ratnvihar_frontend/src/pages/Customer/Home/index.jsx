import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import withRouter from 'src/helpers/withRouter';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import Dropdown from 'react-bootstrap/Dropdown';
import { bindActionCreators } from 'redux';
import 'swiper/css/navigation';
import 'swiper/css';
import { BiHeart } from "react-icons/bi";
import { FaPhoneAlt, FaMapMarkerAlt, FaProductHunt } from "react-icons/fa";
import { CgArrowLongRight } from "react-icons/cg";
import { IoMdMail } from "react-icons/io";
import { Button, Placeholder } from 'react-bootstrap';
import bannerImage from 'src/assets/images/banner1.png';
import bannerImage2 from 'src/assets/images/banner2.png';
import bannerImage3 from 'src/assets/images/banner3.png';
import sImage from 'src/assets/images/s-product-1.png';
import pearlBlue from 'src/assets/images/pearl-blue.png';
import pearlBlue2 from 'src/assets/images/pearl-blue-earring.png';
import certificate from 'src/assets/images/certificate.png';
import refund from 'src/assets/images/refund.png';
import exchange from 'src/assets/images/exchange.png';
import shipping from 'src/assets/images/shipping.png';
import jewelleryHome from 'src/assets/images/jewelleryHome.png';
import physicalStore from 'src/assets/images/physicalStore.png';
import rings from 'src/assets/images/rings.png';
import ring from 'src/assets/images/ring.png';
import diamond from 'src/assets/images/diamond-ring.png';
import pendant from 'src/assets/images/pendant.png';
import affordableearring from 'src/assets/images/affordable-earring.png';
import earring from 'src/assets/images/earring.png';
import ring2 from 'src/assets/images/ring2.png';
import ring3 from 'src/assets/images/ring3.png';
import ring4 from 'src/assets/images/ring4.png';
import client from 'src/assets/images/client.png';
import review from 'src/assets/images/review-mark.png';
import ratnBanner from 'src/assets/images/banner.png';
import facebookBg from 'src/assets/images/fb_bg.png';
import fb from 'src/assets/images/facebook.png';
import insta from 'src/assets/images/insta.png';
import getSlider from 'src/json/slider_data';
import { Navigation } from "swiper";
import { HiHome } from "react-icons/hi";
import { BiShoppingBag } from "react-icons/bi";
import { TbUserCircle } from "react-icons/tb";
import { AiOutlineShop, AiOutlineTeam } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { productListRaw, productFetch } from "actions/Customer/product.actions";
import { bannerList, promocodeList, bestRetailerList, allCounts } from "actions/Customer/home.actions";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { UPDATE_WISHLIST_COUNT } from 'actionTypes/Customer/wishlist.type';
import { WishListAdd } from "actions/Customer/wishlist.actions";
import { isEmpty, priceFormat, displayAmount, setLastVisitPage, convertUnitToGram, weightFormat, objectToQuery } from 'src/helpers/helper';
import _ from 'lodash';
import CountUp from 'react-countup';
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slider: getSlider,
            categories: this.props.categories,
            featured_products: [],
            best_selling_products: [],
            banners: [],
            promocodes: [],
            auth: this.props.auth,
            bestRetailers: [],
            counts: null,
            promise_box: ""
        }

    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        if (props.categories !== state.categories) {
            update.categories = props.categories;
        }
        if (props.auth !== state.auth) {
            update.auth = props.auth;
        }
        return update;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.loadBestSellingProducts();
        this.loadFeaturedProducts();
        this.loadBanners();
        this.loadPromocodes();
        this.loadBestReatailers();
        this.loadCounts();
    }

    loadBestSellingProducts = async () => {
        let res = await productListRaw({ best_selling: 1 });
        if (res.data.success) {
            this.setState({
                best_selling_products: res.data.data.items
            })
        }
    }

    loadFeaturedProducts = async () => {
        let res = await productListRaw({ is_featured: 1 });
        if (res.data.success) {
            this.setState({
                featured_products: res.data.data.items
            })
        }
    }

    loadBanners = async () => {
        let res = await bannerList();
        if (res.data.success) {
            this.setState({
                banners: res.data.data.items
            })
        }
    }

    loadPromocodes = async () => {
        let res = await promocodeList();
        if (res.data.success) {
            this.setState({
                promocodes: res.data.data.items
            })
        }
    }

    loadBestReatailers = async () => {
        let res = await bestRetailerList();
        if (res.data.success) {
            this.setState({
                bestRetailers: res.data.data
            })
        }
    }

    loadCounts = async () => {
        let res = await allCounts();
        if (res.data.success) {
            this.setState({
                counts: res.data.data
            })
        }
    }
    handlePromise = (type) => {
        this.setState({
            promise_box: this.state.promise_box == type ? "" : type
        })
    }

    getBannerLink = (item) => {
        return item.url.replace(process.env.BASE_URL + "/", "/");
    }

    wishlistHandler = async (product) => {
        if (isEmpty(this.state.auth)) {
            setLastVisitPage();
            this.props.navigate('/login');
            return;
        }

        let response = await productFetch(product.slug);
        if (response.data.success) {
            let product = response.data.data;
            let selected_materials = product.size_materials[0].materials;
            let size_id = product.size_materials[0].size_id;
            let rate = product.size_materials[0].sale_price;
            let total_weight = 0;
            let materials = [];

            for (let i = 0; i < selected_materials.length; i++) {
                let thisM = selected_materials[i];
                let m = _.filter(thisM.purities, { is_selected: true });

                let total_gram = convertUnitToGram(thisM.unit_name, thisM.weight);
                total_gram = weightFormat(total_gram);
                total_weight += parseFloat(total_gram);

                materials.push({
                    material_id: thisM.material_id,
                    purity_id: m[0].id,
                    weight: thisM.weight,
                    unit_id: thisM.unit_id,
                    quantity: thisM.quantity,
                })
            }

            let data = {
                product_id: product.id,
                stock_id: null,
                total_weight: total_weight,
                size_id: (product.type != 'material') ? size_id : null,
                type: product.type,
                rate: rate,
                materials: materials
            }

            let res = await WishListAdd(data);
            if (res.data.success) {
                let best_selling_products = this.state.best_selling_products;
                let featured_products = this.state.featured_products;
                best_selling_products = best_selling_products.map(item => item.id === product.id ? { ...item, has_wishlist: res.data.data.status } : item);
                featured_products = featured_products.map(item => item.id === product.id ? { ...item, has_wishlist: res.data.data.status } : item);
                this.setState({
                    best_selling_products: best_selling_products,
                    featured_products: featured_products
                })
                this.props.dispatch({ type: UPDATE_WISHLIST_COUNT, payload: res.data.data.total });
            }
        }
    }

    render() {
        const { featured_products, best_selling_products, banners, promocodes, bestRetailers, counts } = this.state;

        return (
            <>

                <section className='banner'>
                    {/* <Container className='position-relative'>
                    <Row>
                        <Col xs={7} md={7}>
                            <div className='header pt-7 pb-7'>
                                <h1>FLAT 40% OFF on
                                    Tanishq Jewelery</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                                <a href='' className='shop-now'>Shop Now</a>
                            </div>
                        </Col>
                        <Col xs={5} md={5}>
                            <div className='banner-image'>
                                <img src={bannerImage} alt='' />
                            </div>
                        </Col>
                    </Row>
                    </Container> */}
                    <Container style={{ padding: '0' }}>
                        <Carousel>
                            {
                                banners.map((item, key) => (
                                    <Carousel.Item key={key}>
                                        <Link to={this.getBannerLink(item)}>
                                            <div className='slider-banner'>
                                                <img
                                                    className="d-block w-100"
                                                    src={item.image}
                                                    alt=''
                                                />
                                            </div>
                                        </Link>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                        {
                            !banners.length ?
                                <Placeholder animation="glow">
                                    <Placeholder xs={12} className="slider-banner" />
                                </Placeholder>
                                : null
                        }
                    </Container>
                </section>
                {/*---- only mob screen -----*/}
                <section className='ornament-slider'>
                    <Container>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {
                                this.state.categories.map((item, key) => (
                                    <SwiperSlide key={key}>
                                        <Link to={'/products?category=' + item.slug}>
                                            <div className='ornament-image'>
                                                <Dropdown>
                                                    <img src={item.icon ? item.icon : ring} alt='' />
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        <h4>{item.name}</h4>
                                                    </Dropdown.Toggle>
                                                    {/*<Dropdown.Menu>
                                                    {
                                                        item.subCategories.map((sub, i) => (
                                                            <Dropdown.Item href={`/products?category=${item.slug}&subcategory=${sub.slug}`} key={i}>{sub.name}</Dropdown.Item>
                                                        ))
                                                    }
                                                </Dropdown.Menu>*/}
                                                </Dropdown>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Container>
                </section>
                {
                    promocodes.map((item, key) => (
                        <section className={(key % 2 == 0) ? 'diamond-offer' : 'pendant-offer'} key={key}>
                            <Link to={isEmpty(item.products) ? ('/products' + objectToQuery({ category: item.category_slug, subcategory: item.sub_category_slug }, true)) : ('/products?offer=' + item.products)}>
                                <Container className={((key % 2 == 0) ? 'diamond-inner' : 'pendant-inner') + ' mt-4 mb-3 mt-md-4 mb-md-2 position-relative'} style={{ backgroundImage: `url(${item.banner}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'cover' }}>
                                    {/*<div className={(key%2==0) ? 'offer-header' : 'pendant-header'}>
                                    <h2>{item.title}</h2>
                                    <span className='shop-now'>Shop Now</span>
                                </div>*/}
                                </Container>
                                <Container style={{padding: 0}}>
                                    <div className="banner-heading-content">
                                        <h2>{item.title}</h2>
                                        <Link className="ratn-shop-now" to={isEmpty(item.products) ? ('/products' + objectToQuery({ category: item.category_slug, subcategory: item.sub_category_slug }, true)) : ('/products?offer=' + item.products)}>Shop Now</Link>
                                    </div>
                                </Container>
                            </Link>
                        </section>
                    ))
                }
                {/*<section className='diamond-offer'>
                    <Container className='diamond-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${diamond}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='offer-header'>
                            <h2>Diamond Rings at
                                30% OFF</h2>
                            <a href='/products' className='shop-now'>Shop Now</a>
                        </div>

                    </Container>
                </section>
                <section className='earring-offer'>
                    <Container className='earring-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${earring}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='earring-header'>
                            <h2>Earrings at 40% OFF at AXIS
                                Bank Debit & Credit Cards</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</p>
                            <a href='/products' className='shop-now'>Explore <CgArrowLongRight /></a>
                        </div>

                    </Container>
                </section>
                <section className='pendant-offer'>
                    <Container className='pendant-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${pendant}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='pendant-header'>
                            <h2>Get Beautiful Pendants at only ₹8999</h2>
                            <a href='/products' className='shop-now'>Shop Now</a>
                        </div>

                    </Container>
                </section>
                <section className='affordable-earring'>
                    <Container className='affordable-earring-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${affordableearring}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='affordable-earring-header'>
                            <h2>Affordable Earrings at ₹9,999</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                            <a href='/products' className='shop-now'>Explore <CgArrowLongRight /></a>
                        </div>

                    </Container>
                </section>*/}
                {
                    best_selling_products.length ?
                        <section className='selling-product'>
                            <Container>
                                <div className='selling-product-header'>
                                    <h1>Best Selling Products</h1>
                                </div>
                                <Swiper
                                    spaceBetween={20}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    breakpoints={{
                                        // when window width is >= 320px
                                        320: {
                                            width: 320,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 768px
                                        768: {
                                            width: 768,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 1024px
                                        1024: {
                                            width: 1024,
                                            slidesPerView: 3,
                                        },
                                        // when window width is >= 1024px
                                        1440: {
                                            width: 1440,
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {
                                        best_selling_products.map((product, key) => (
                                            <SwiperSlide key={key}>
                                                <div className='slide-swipe-inner'>
                                                    <div className='s-slider-image'>
                                                        <Link to={'products/' + product.slug}>
                                                            <img src={product.default_image} alt='selling product' />
                                                        </Link>
                                                        <div className='wishlist'>
                                                            {
                                                                product.has_wishlist ?
                                                                    <BsHeartFill onClick={() => this.wishlistHandler(product)} className="wishlist_active" role="button" />
                                                                    :
                                                                    <BsHeart onClick={() => this.wishlistHandler(product)} role="button" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='s-slider-content'>
                                                        <h2>{product.name}</h2>
                                                        <div className='ring-price'>
                                                            <span className='offer-price'> {product.sale_price_display} </span>
                                                            {
                                                                product.have_offer ?
                                                                    <span className='item-price'> {product.mrp_display} </span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }

                                    { /*---- <SwiperSlide>
                                <div className='s-slider-image'>
                                    <img src={sImage} alt='selling product' />
                                    <div className='wishlist'>
                                        <BiHeart />
                                    </div>
                                </div>
                                <div className='s-slider-content'>
                                    <h2>Gold Plated Ring</h2>
                                    <div className='ring-price'>
                                        <span className='offer-price'> ₹2999 </span>
                                        <span className='item-price'> ₹2999 </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='s-slider-image'>
                                    <img src={sImage} alt='selling product' />
                                    <div className='wishlist'>
                                        <BiHeart />
                                    </div>
                                </div>
                                <div className='s-slider-content'>
                                    <h2>Gold Plated Ring</h2>
                                    <div className='ring-price'>
                                        <span className='offer-price'> ₹2999 </span>
                                        <span className='item-price'> ₹2999 </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='s-slider-image'>
                                    <img src={sImage} alt='selling product' />
                                </div>
                                <div className='s-slider-content'>
                                    <h2>Gold Plated Ring</h2>
                                    <div className='ring-price'>
                                        <span className='offer-price'> ₹2999 </span>
                                        <span className='item-price'> ₹2999 </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='s-slider-image'>
                                    <img src={sImage} alt='selling product' />
                                </div>
                                <div className='s-slider-content'>
                                    <h2>Gold Plated Ring</h2>
                                    <div className='ring-price'>
                                        <span className='offer-price'> ₹2999 </span>
                                        <span className='item-price'> ₹2999 </span>
                                    </div>
                                </div>
                        </SwiperSlide> ---*/}
                                </Swiper>
                            </Container>
                        </section>
                        : null
                }
                {/*<div className='gap-100'></div>*/}
                {
                    featured_products.length ?
                        <section className='feature-product'>
                            <Container>
                                <div className='feature-product-header'>
                                    <h1>Featured Products</h1>
                                </div>
                                <Swiper
                                    spaceBetween={20}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    breakpoints={{
                                        // when window width is >= 320px
                                        320: {
                                            width: 320,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 768px
                                        768: {
                                            width: 768,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 1024px
                                        1024: {
                                            width: 1024,
                                            slidesPerView: 3,
                                        },
                                        // when window width is >= 1024px
                                        1440: {
                                            width: 1440,
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {
                                        featured_products.map((product, key) => (
                                            <SwiperSlide key={key}>
                                                <div className='slide-swipe-inner'>
                                                    <div className='s-slider-image'>
                                                        <Link to={'products/' + product.slug}>
                                                            <img src={product.default_image} alt='feature product' />
                                                        </Link>
                                                        <div className='wishlist'>
                                                            {
                                                                product.has_wishlist ?
                                                                    <BsHeartFill onClick={() => this.wishlistHandler(product)} className="wishlist_active" role="button" />
                                                                    :
                                                                    <BsHeart onClick={() => this.wishlistHandler(product)} role="button" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='s-slider-content'>
                                                        <h2>{product.name}</h2>
                                                        <div className='ring-price'>
                                                            <span className='offer-price'> {product.sale_price_display} </span>
                                                            {
                                                                product.have_offer ?
                                                                    <span className='item-price'> {product.mrp_display} </span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </Container>
                        </section>
                        : null
                }
                <section className='blue-pearl mt-3 mb-3 mt-md-4 mb-md-4 position-relative'>
                    <Container>
                        <Row>
                            <Col xs={4} md={4}>
                                <div className='blue-pearl-image'>
                                    <img src={pearlBlue} alt='' />
                                </div>
                            </Col>
                            <Col xs={8} md={8}>
                                <div className='blue-pearl-inner position-relative'>
                                    <img src={pearlBlue2} alt='' />
                                    <div className='overlay'></div>
                                    <div className='blue-pearl-content'>
                                        <h2>Pearl Blue Diamond Earring</h2>
                                        <p>₹9,726 only</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className='promise promise-desktop'>
                    <Container>
                        <h2 className='text-center'>Our Promise</h2>

                        <Row>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={certificate} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>100% Certified <br />  Jewellery</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>Certificate Authentication</h2>
                                        <div className='overlay-underline'></div>
                                        <p>Importance of Certification</p>
                                        <p>The value of a precious stone or diamond is determined by its gemological makeup, natural rarity and cut quality. Diamonds and gems that look similar can vary greatly in value. Experts need high equipment to detect synthetics, remedies. A certificate clearly discloses the details of any item, providing confidence to both the buyer and the seller.
                                        </p>
                                        <p>
                                        Gemstones should be exchanged only if there is a certificate certifying the same. We provide reports from the few trusted labs.</p>
                                        
                                        <ul>
                                            <li> Committed to making your concerns understood </li>
                                            <li> GIA Gemological Institute of America </li>
                                            <li>IIGL Institute of International Gemological Laboratory</li>
                                            <li>IGI international gemological institute</li>
                                        </ul>
                                        <p>
                                        For more information visit their website:</p>
                                        <ul>
                                            <li> https://www.gia.edu/gem-lab </li>
                                            <li> https://www.iigl.org/ </li>
                                            <li> https://www.igi.org/ </li>
                                        </ul>
                                    </div>
                                </div>

                            </Col>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={refund} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>100%  <br />Refund Policy</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>100% Refund Policy</h2>
                                        <div className='overlay-underline'></div>
                                        <p>
                                        हमारा 7 दिन की  वापसी निति के तहत,आप को वस्तु पसंद नहीं आने पर ,उचित कारण के साथ,आप उसे लौटा सकते हैं।  जिसका 100% धन राशि आपके बैंक खता में 7 दिन के भीतर जमा कर दिया जाता हैं अगर कारण निराधार होने पर Making  एवं संबधीत शुल्क लिया जायेगा। सभी प्रकार के धन वापसी आपके बैंक खाते में Trancefar के माध्यम से  आपको संसाधित की जाएगी,अथवा, प्राप्त किया गया  स्रोत   द्वारा जमा कीया  जाएगा ,अतिआवश्यक होने पर नगदी  देने का प्रावधान भी हैं।  
                                        
                                        वापस करने के सम्बन्ध में 
                                        वापसी के लिए निवेदन करने के बाद  Labaratory Report के साथ अपने गहनों का  मूल पैकिंग सामग्री तैयार रखें  पहचानपात्र  के साथ गए हुए रत्नविहार के कर्मचारी द्वारा दिया हुआ प्रूफ पैकेट में अपने गहने कर्मचारी को दिखाकर सुरक्षित, इसे सील कर दें। एक बार पैकेट सील करने के बाद, पैकेट को तब तक नहीं खोला जा सकता जब तक कि उसे नष्ट न कर दिया जाए। पुस्टि होने और पावती लेने के बाद ही वापसी हेतु वस्तु प्रदान करें 
                                        हमें वस्तु  प्राप्त  होने के उपरांत  गुणवत्ता जांच के बाद 2 कार्य दिवसों भीतर आपकी धन वापसी कर दीया जाता हैं 
                                        
                                        यह सर्ते केवल रत्न विहार द्वारा  INVOICE बिल पर ही लागु हैं मान्य होगा।
                                        </p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={exchange} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>Free Trial</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>Free Trial</h2>
                                        <div className='overlay-underline'></div>
                                        <p>Yes, RATNVIHAR assures you that you can choose your favorite jewelry from anywhere and order it on time, for which you will not have to pay any charge, you can shop if you like, want to try?
                                        so contact now
                                        98744 00341, Email: support@ratnvihar.com
                                        :</p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={shipping} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>Free <br /> Delivery</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>Free Delivery</h2>
                                        <div className='overlay-underline'></div>
                                        <p>We ship for free on all items. 100% safe which is our responsibility to reach you safely from now on
                                        100% Free Delivery
                                        </p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={jewelleryHome} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>Genuine  <br />Price</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>Genuine Price</h2>
                                        <div className='overlay-underline'></div>
                                        <p>We feel immense pleasure in providing the goods to our customers at reasonable prices due to our bulk buying and low margins and removal of middlemen.</p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className='promise-box'>
                                    <img src={physicalStore} alt='' />
                                    <div className='promise-content'>
                                        <h4 className='text-center'>Near  <br />By Store</h4>
                                    </div>
                                    <div className='promise-overlay-content'>
                                        <h2>Near By Store</h2>
                                        <div className='overlay-underline'></div>
                                        <p><strong>Corp. Office:</strong></p>
                                        <p>P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007</p>
                                        <p><strong>Branch Office:</strong></p>
                                        <p>3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020</p>
                                        <p><strong>Contact:</strong></p>
                                        <p> +91 98744 45878</p>
                                        <p><strong>Email:</strong></p>
                                        <p>support@ratnvihar.com</p>

                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Container>

                </section>
                <section className="promise promise-mobile">
                    <Container>
                        <h2 className='text-center'>Our Promise</h2>

                        <Row>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry1" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry1')}>

                                    <div className='promise-mob-content'>
                                        <img src={certificate} alt='' />
                                        <h4 className=''>100% Certified <br />  Jewellery</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>

                                    <h2>Certificate Authentication</h2>
                                    <div className='overlay-underline'></div>
                                    <p>Importance of Certification</p>
                                    <p>The value of a precious stone or diamond is determined by its gemological makeup, natural rarity and cut quality. Diamonds and gems that look similar can vary greatly in value. Experts need high equipment to detect synthetics, remedies. A certificate clearly discloses the details of any item, providing confidence to both the buyer and the seller.
                                    </p>
                                    <p>
                                    Gemstones should be exchanged only if there is a certificate certifying the same. We provide reports from the few trusted labs.</p>
                                    
                                    <ul>
                                        <li> Committed to making your concerns understood </li>
                                        <li> GIA Gemological Institute of America </li>
                                        <li>IIGL Institute of International Gemological Laboratory</li>
                                        <li>IGI international gemological institute</li>
                                    </ul>
                                    <p>
                                    For more information visit their website:</p>
                                    <ul>
                                        <li> https://www.gia.edu/gem-lab </li>
                                        <li> https://www.iigl.org/ </li>
                                        <li> https://www.igi.org/ </li>
                                    </ul>
                                     
                                    </div>
                                </div>

                            </Col>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry2" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry2')}>

                                    <div className='promise-mob-content'>
                                        <img src={refund} alt='' />
                                        <h4 className=''>100%  <br />Refund Policy</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>
                                    <p>
                                    हमारा 7 दिन की  वापसी निति के तहत,आप को वस्तु पसंद नहीं आने पर ,उचित कारण के साथ,आप उसे लौटा सकते हैं।  जिसका 100% धन राशि आपके बैंक खता में 7 दिन के भीतर जमा कर दिया जाता हैं अगर कारण निराधार होने पर Making  एवं संबधीत शुल्क लिया जायेगा। सभी प्रकार के धन वापसी आपके बैंक खाते में Trancefar के माध्यम से  आपको संसाधित की जाएगी,अथवा, प्राप्त किया गया  स्रोत   द्वारा जमा कीया  जाएगा ,अतिआवश्यक होने पर नगदी  देने का प्रावधान भी हैं।  
                                    
                                    वापस करने के सम्बन्ध में 
                                    वापसी के लिए निवेदन करने के बाद  Labaratory Report के साथ अपने गहनों का  मूल पैकिंग सामग्री तैयार रखें  पहचानपात्र  के साथ गए हुए रत्नविहार के कर्मचारी द्वारा दिया हुआ प्रूफ पैकेट में अपने गहने कर्मचारी को दिखाकर सुरक्षित, इसे सील कर दें। एक बार पैकेट सील करने के बाद, पैकेट को तब तक नहीं खोला जा सकता जब तक कि उसे नष्ट न कर दिया जाए। पुस्टि होने और पावती लेने के बाद ही वापसी हेतु वस्तु प्रदान करें 
                                    हमें वस्तु  प्राप्त  होने के उपरांत  गुणवत्ता जांच के बाद 2 कार्य दिवसों भीतर आपकी धन वापसी कर दीया जाता हैं 
                                    
                                    यह सर्ते केवल रत्न विहार द्वारा  INVOICE बिल पर ही लागु हैं मान्य होगा।
                                    </p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry3" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry3')}>

                                    <div className='promise-mob-content'>
                                        <img src={exchange} alt='' />
                                        <h4 className=''>Free Trial</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>
                                    <p>Yes, RATNVIHAR assures you that you can choose your favorite jewelry from anywhere and order it on time, for which you will not have to pay any charge, you can shop if you like, want to try?
                                    so contact now
                                    98744 00341, Email: support@ratnvihar.com
                                    :</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry4" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry4')}>

                                    <div className='promise-mob-content'>
                                        <img src={shipping} alt='' />
                                        <h4 className=''>Free <br /> Delivery</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>
                                    <h2>Free Delivery</h2>
                                    <div className='overlay-underline'></div>
                                    <p>We ship for free on all items. 100% safe which is our responsibility to reach you safely from now on
                                    100% Free Delivery
                                    </p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry5" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry5')}>

                                    <div className='promise-mob-content'>
                                        <img src={jewelleryHome} alt='' />
                                        <h4 className=''>Genuine  <br />Price</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>

                                    <h2>Genuine Price</h2>
                                    <div className='overlay-underline'></div>
                                    <p>We feel immense pleasure in providing the goods to our customers at reasonable prices due to our bulk buying and low margins and removal of middlemen.</p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"promise-box" + (this.state.promise_box == "gemsjewellry6" ? " active" : "")} onClick={() => this.handlePromise('gemsjewellry6')}>

                                    <div className='promise-mob-content'>
                                        <img src={physicalStore} alt='' />
                                        <h4 className=''>Near  <br />By Store</h4>
                                        <span className='pro-icon'><RiArrowDownSLine /></span>
                                    </div>
                                    <div className='promise-overlay-mob'>

                                    <h2>Near By Store</h2>
                                    <div className='overlay-underline'></div>
                                    <p><strong>Corp. Office:</strong></p>
                                    <p>P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007</p>
                                    <p><strong>Branch Office:</strong></p>
                                    <p>3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020</p>
                                    <p><strong>Contact:</strong></p>
                                    <p> +91 98744 45878</p>
                                    <p><strong>Email:</strong></p>
                                    <p>support@ratnvihar.com</p>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </section>
                {/*<div className='gap-100'></div>*/}
                <section className="browse-rings position-relative">
                    <Container fluid>
                        <Row>
                            <Col xs={6} md={4}>
                                <div className='browse-ring-header'>
                                    <h3>Browse all Rings</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                                    <a href='/products' className='browse-now'>Explore <CgArrowLongRight /></a>
                                </div>
                            </Col>
                            <Col xs={6} md={8}>
                            </Col>
                        </Row>
                    </Container>
                    <div className='browse-rings-banner'>
                        <img src={rings} alt='' />
                    </div>
                </section>

                {
                    bestRetailers.length ?
                        <section className='feature-product best-retailer'>
                            <Container>
                                <div className='feature-product-header'>
                                    <h1>Best Retailers</h1>
                                </div>
                                <Swiper
                                    spaceBetween={20}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    breakpoints={{
                                        // when window width is >= 320px
                                        320: {
                                            width: 320,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 768px
                                        768: {
                                            width: 768,
                                            slidesPerView: 2,
                                        },
                                        // when window width is >= 1024px
                                        1024: {
                                            width: 1024,
                                            slidesPerView: 4,
                                        },
                                        // when window width is >= 1024px
                                        1440: {
                                            width: 1440,
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {
                                        bestRetailers.map((item, key) => (
                                            <SwiperSlide key={key}>
                                                <div className='slide-swipe-inner'>
                                                    <div className='b-slider-image'>
                                                        <img src={item.image} alt='feature product' />
                                                    </div>
                                                    <div className='b-slider-content'>

                                                        <h2>{item.name}</h2>
                                                        <span className='seller-description'>
                                                            <ul>
                                                                <li>
                                                                    <FaMapMarkerAlt />
                                                                </li>
                                                                <li>
                                                                    {item.address}
                                                                </li>
                                                            </ul>
                                                        </span>
                                                        <div className='ring-price'>
                                                            {/* <span className='offer-price'> {item.since} </span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </Container>
                        </section>
                        : null
                }

                {/*<section className='reviews'>
                    <Container>
                        <div className='review-header'>
                            <h3 className='text-center'>Our Reviews</h3>
                        </div>
                        <Row>
                            <Col md={12}>
                                <Swiper
                                    // install Swiper modules
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation={{ clickable: true }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                >
                                    <SwiperSlide className='position-relative'>
                                        <div className='client-area'>
                                            <div className='client-content'>
                                                <div className='c-image'>
                                                    <img src={client} alt='' />
                                                </div>
                                                <div className='c-content'>
                                                    <h5>Maria Sarapavoo</h5>
                                                    <h6>Senior Designer</h6>
                                                </div>
                                            </div>
                                            <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using letters Ipsum is that it has a more-or-less normal distribution of letter.</p>

                                        </div>
                                        <div className='review-mark'>
                                            <img src={review} alt='' />
                                        </div>
                                    </SwiperSlide>

                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </section>*/}
                <section className='ratn-banner'>
                    <Container>
                        <div className='ratn-banner-image position-relative'>
                            <img src={ratnBanner} alt='' />
                            <div className='banner-overlay'>
                                <p>Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has been</p>
                                {/* <a href='' className='learn-more'>Learn More</a> */}
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='address-map'>
                    <Container>
                        <div className="review-header">
                            <h3 className="text-center">The Ratn Vihar Store</h3>
                            <p>Our stores are cool and contemporary spaces that offer an immersive jewellery
                                browsing and shopping experience, and encourage you to linger as long as you like.</p>
                        </div>
                        {/*<div className='map-wrapper'>
                            <div className='single-map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"></iframe>
                            </div>
                            <div className='single-map'>
                                <div className='address-header'>
                                    <h3>Office Address</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                                    <ul className='address-info'>
                                        <li> <FaPhoneAlt /> 92732926392 </li>
                                        <li> <IoMdMail /> info@ratnvihar.com </li>
                                    </ul>
                                    <div className='gap-100'></div>
                                    <a href='' className='view-more'>Learn More Branches</a>
                                </div>
                            </div>
                        </div>*/}
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                {/*<div className='d-flex flex-row'>
                            <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">
                                            <AiOutlineShop />
                                            Patna
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second"><AiOutlineShop /> Kolkata</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                            <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div className='map-wrapper-list'>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="400" loading="lazy"></iframe>

                                                <div className='list-wrapper'>
                                                    <div className='list-name'>
                                                        <h1> Shivranjani, Ahmedabad</h1>
                                                        <p> Shop No G1,G2, Satguru Complex, Ground Floor, Shivranjani Cross Road, Satellite</p>
                                                    </div>
                                                    <div className='list-name'>
                                                        <p>  Store timings: 11am to 9pm </p>
                                                        <p>   Contact Number: 8976878928</p>
                                                    </div>
                                                    <div className='list-name margin-right'>
                                                        <Button variant="primary">GET DIRECTION</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='map-wrapper-list'>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="400" loading="lazy"></iframe>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div className='map-wrapper-list'>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="400" loading="lazy"></iframe>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                    </div>*/}

                                <Col sm={12}>
                                    <Nav variant="pills" className="flex-row justify-content-center">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Kolkata</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Patna</Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                    <Tab.Content>

                                        <Tab.Pane eventKey="first">
                                            <Container>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <div className='map-wrapper-list'>
                                                            <iframe
                                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8728946666283!2d88.34720051427394!3d22.583856738250365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b918617de7%3A0xe6c77375f9def3eb!2sP-210%2C%20Strand%20Bank%20Rd%2C%20Fairley%20Place%2C%20B.B.D.%20Bagh%2C%20Kolkata%2C%20West%20Bengal%20700001!5e0!3m2!1sen!2sin!4v1675867314000!5m2!1sen!2sin"
                                                                width="100%"
                                                                height="100%"
                                                                style={{ border: "0" }}
                                                                allowFullScreen
                                                                loading="lazy"
                                                            ></iframe>
                                                            <div className='list-wrapper'>

                                                                <div className='list-name'>
                                                                    <h1> Corp. Office</h1>
                                                                    <p> P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007</p>
                                                                    <p>Contact: +91 98744 00341, Email: support@ratnvihar.com</p>

                                                                </div>
                                                                <div className='list-name right-para'>
                                                                    <p>  Store Timings: 11am to 9pm </p>
                                                                    <p>   Contact Number: 9874400341</p>
                                                                    <div className='list-name margin-right'>
                                                                        <a href='https://goo.gl/maps/Lvo98VSdiUdkVWKA6' target='_blank'>
                                                                            <Button variant="primary">GET DIRECTION</Button></a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        {/*<div className='map-wrapper-list'>
                                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"></iframe>
                                                            <div className='list-wrapper'>
                                                                <div className='list-name'>
                                                                    <h1> Shivranjani, Ahmedabad</h1>
                                                                    <p> Shop No G1,G2, Satguru Complex, Ground Floor, Shivranjani Cross Road, Satellite</p>
                                                                    
                                                                </div>
                                                                <div className='list-name right-para'>
                                                                    <p>  Store timings: 11am to 9pm </p>
                                                                    <p>   Contact Number: 8976878928</p>
                                                                    <div className='list-name margin-right'>
                                                                    <Button variant="primary">GET DIRECTION</Button>
                                                                </div>
                                                                </div>
                                                                
                                                            </div>
                </div>*/}
                                                    </Col>
                                                </Row>
                                            </Container>

                                        </Tab.Pane>



                                        <Tab.Pane eventKey="second">
                                            <Container>
                                                <Row className='overflow-tabs'>
                                                    <Col xs={12} md={12}>
                                                        <div className='map-wrapper-list'>
                                                            <iframe
                                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.1377741388105!2d85.15243301433607!3d25.600337721510222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed597b97b8094b%3A0x4c2050111692585f!2sSpeckarts.com!5e0!3m2!1sen!2sin!4v1675866191579!5m2!1sen!2sin"
                                                                width="100%"
                                                                height="100%"
                                                                style={{ border: "0" }}
                                                                allowFullScreen
                                                                loading="lazy"
                                                            ></iframe>
                                                            <div className='list-wrapper'>
                                                                <div className='list-name'>
                                                                    <p>All types of gemstones, diamond jewelry, rudraksha, and sphatik are provided to retail our partners at wholesale rates. We assure you that we will deliver all your orders in a short period of time. There may be a difference in the current price from the order & catalog price, as per the current rate.</p>
                                                                    <h1> Branch Office</h1>
                                                                    <p> 3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020 </p>
                                                                    <p>Contact: +91 98744 45878, Email: support@ratnvihar.com</p>
                                                                </div>
                                                                <div className='list-name right-para'>

                                                                    <p>  WE PROVIDE THE SERVICE OF DISTRIBUTORSHIP TO YOU. </p>
                                                                    <p>On order, we can make customized jewelry as per your designs.
                                                                        For all orders and inquiries, contact us.</p>
                                                                    <p>  Store Timings: 11am to 9pm </p>
                                                                    <p>   WEBSITE: www.ratnvihar.com </p>
                                                                    <p>   Contact Number: 9874445878</p>
                                                                    <div className='list-name margin-right'>
                                                                        <a href='https://goo.gl/maps/6ZfV7dNiGwG6ZAJQ8' target='_blank'>
                                                                            <Button variant="primary">GET DIRECTION</Button></a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        {/*<div className='map-wrapper-list'>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"></iframe>
                                                    <div className='list-wrapper'>
                                                        <div className='list-name'>
                                                            <h1> Shivranjani, Ahmedabad</h1>
                                                            <p> Shop No G1,G2, Satguru Complex, Ground Floor, Shivranjani Cross Road, Satellite</p>
                                                        </div>
                                                        <div className='list-name right-para'>
                                                            <p>  Store timings: 11am to 9pm </p>
                                                            <p>   Contact Number: 8976878928</p>
                                                            <div className='list-name margin-right'>
                                                            <Button variant="primary">GET DIRECTION</Button>
                                                        </div>
                                                        </div>
                                                        
                                                    </div>
            </div>*/}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Tab.Pane>




                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </section>
                <section className='socialmedia-wrapper'>
                    <Container>
                        <div className='social-container-wrapper'>
                            <div className='social-single-container'>
                                <div className='social-single-header'>
                                    <img src={fb} alt='' />
                                    <h4>Facebook</h4>
                                </div>
                                <img src={facebookBg} className="fb_bg" alt='' />
                            </div>
                            <div className='social-single-container'>
                                <div className='social-single-header'>
                                    <img src={insta} alt='' />
                                    <h4>Instagram</h4>

                                </div>

                                <ul className='social-info'>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </section>
                {
                    counts ?
                        <section className='socialmedia-wrapper'>
                            <Container>
                                <ul id="counter">
                                    <li>


                                        <span className="count percent"><CountUp end={counts.products} suffix="+" duration={5} /></span>
                                        <div className="counter_header">

                                            <h1>Products</h1>
                                        </div>
                                    </li>
                                    <li>

                                        <span className="count percent"><CountUp end={counts.retailers} suffix="+" duration={5} /></span>
                                        <div className="counter_header">
                                            <h1>Retailers</h1>
                                        </div>

                                    </li>
                                    <li>

                                        <span className="count percent"><CountUp end={counts.team_members} suffix="+" duration={5} /></span>
                                        <div className="counter_header">
                                            <h1>Team Members</h1>
                                        </div>

                                    </li>
                                </ul>
                            </Container>
                        </section>
                        : null
                }

            </>
        );

    }
}

const mapStateToProps = (state) => ({
    categories: state.customer.categories.items,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({}, dispatch),
    dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));