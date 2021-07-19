import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaUtensils, FaBolt, FaTshirt, FaCouch, FaCheckCircle, FaPaw, FaInfinity } from 'react-icons/fa';
import { MenuList, MenuItem, CircularProgress } from '@material-ui/core';

import Cookie from 'js-cookie';
import api from '../../api';

import { filterData } from './CompDatas';

import ModalPost from './modalPost';
import BtnPost from './btnPost';

import $ from 'jquery'

export default function PostsRow({ loginToken, loggedUserName }) {

    const [darkMode, setDarkMode] = useState();

    const [foodPosts, setFoodPosts] = useState(false);
    const [clothesPosts, setClothesPosts] = useState(false);
    const [eletronicPosts, setEletronicPosts] = useState(false);
    const [furniturePosts, setFurniturePosts] = useState(false);
    const [petsPosts, setPetsPosts] = useState(false);
    const [variedPosts, setVariedPosts] = useState(false);

    const [users, setUsers] = useState([])

    useEffect(() => {

        setDarkMode(JSON.parse(localStorage.getItem("dark")))

        api.get('/allUsers').then((res) => {
            setUsers(res.data);
        })

        api.get('/showPosts').then((res) => {

            let food = []
            let clothes = []
            let eletronics = []
            let furniture = []
            let pets = []
            let varied = []

            res.data.forEach(element => {
                switch (element.publicationCategory) {
                    case 'food':
                        food.push(element)
                        break;
                    case 'clothes':
                        clothes.push(element)
                        break;
                    case 'eletronics':
                        eletronics.push(element)
                        break;
                    case 'furniture':
                        furniture.push(element)
                        break;
                    case 'pets':
                        pets.push(element)
                        break;
                    case 'varied':
                        varied.push(element)
                        break;
                    default:
                        break;
                }
            });
            setFoodPosts(food)
            setClothesPosts(clothes)
            setEletronicPosts(eletronics)
            setFurniturePosts(furniture)
            setPetsPosts(pets)
            setVariedPosts(varied)
        })
    }, []);

    const [scrollXFood, setScrollXFood] = useState(0)

    //ARROWS FOOD
    function handleLeftArrowFood() {
        let x = scrollXFood + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXFood(x);
    }

    function handleRightArrowFood() {
        let x = scrollXFood - Math.round(window.innerWidth / 2);
        let listWidth = foodPosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            window.innerWidth < 1024 ?
                x = (window.innerWidth - listWidth) - 20
                :
                x = (window.innerWidth - listWidth) - 90
        }
        setScrollXFood(x);
    }

    //ARROWS CLOTHES
    const [scrollXClothes, setScrollXClothes] = useState(0)

    function handleLeftArrowClothes() {
        let x = scrollXClothes + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXClothes(x);
    }

    function handleRightArrowClothes() {
        let x = scrollXClothes - Math.round(window.innerWidth / 2);
        let listWidth = clothesPosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 90
        }
        setScrollXClothes(x);
    }

    //ARROWS ELETRONICS
    const [scrollXEletronics, setScrollXEletronics] = useState(0)

    function handleLeftArrowEletronics() {
        let x = scrollXEletronics + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXEletronics(x);
    }

    function handleRightArrowEletronics() {
        let x = scrollXEletronics - Math.round(window.innerWidth / 2);
        let listWidth = eletronicPosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 90
        }
        setScrollXEletronics(x);
    }

    //ARROWS furniture
    const [scrollXFurniture, setScrollXFurniture] = useState(0)

    function handleLeftArrowFurniture() {
        let x = scrollXFurniture + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXFurniture(x);
    }

    function handleRightArrowFurniture() {
        let x = scrollXFurniture - Math.round(window.innerWidth / 2);
        let listWidth = furniturePosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 90
        }
        setScrollXFurniture(x);
    }

    //ARROWS pets
    const [scrollXpets, setScrollXpets] = useState(0)

    function handleLeftArrowPets() {
        let x = scrollXpets + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXpets(x);
    }

    function handleRightArrowPets() {
        let x = scrollXpets - Math.round(window.innerWidth / 2);
        let listWidth = petsPosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 90
        }
        setScrollXpets(x);
    }

    //ARROWS varied
    const [scrollXVaried, setScrollXVaried] = useState(0)

    function handleLeftArrowVaried() {
        let x = scrollXVaried + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setScrollXVaried(x);
    }

    function handleRightArrowVaried() {
        let x = scrollXVaried - Math.round(window.innerWidth / 2);
        let listWidth = variedPosts.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 90
        }
        setScrollXVaried(x);
    }

    const [ajustRightArrow, setAjustRightArrow] = useState(0)

    $(document).ready(function () {
        if (window.innerWidth < 1024) {
            $(".containerRows").width(window.innerWidth / 1.09)
            let position = window.innerWidth / 1.12;
            setAjustRightArrow(position)
        }
    })

    $('.dropdown-item').on('click', function () {
        switch ($(this).text()) {
            case 'Todos':
                $('.foodRow,.clothesRow,.eletronicRow,.fornitureRow,.petsRow,.variedRow,.postsRow--left,.postsRow--right').fadeIn(0)
                $('.foodRow,.clothesRow,.eletronicRow,.fornitureRow,.petsRow,.variedRow').width('100%')
                $('.foodList').css('width', `${foodPosts.length * 150}`)
                $('.clothesList').css('width', `${clothesPosts.length * 150}`)
                $('.eletronicList').css('width', `${eletronicPosts.length * 150}`)
                $('.furnitureList').css('width', `${furniturePosts.length * 150}`)
                break;
            case 'Alimentos':
                $('.clothesRow,.eletronicRow,.fornitureRow,.petsRow,.variedRow').fadeOut(0, () => {
                    $('.foodRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            case 'Roupas':
                $('.foodRow,.eletronicRow,.fornitureRow,.petsRow,.variedRow').fadeOut(0, () => {
                    $('.clothesRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            case 'Eletrônicos':
                $('.foodRow,.clothesRow,.fornitureRow,.petsRow,.variedRow').fadeOut(0, () => {
                    $('.eletronicRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            case 'Mobílias':
                $('.foodRow,.clothesRow,.eletronicRow,.petsRow,.variedRow').fadeOut(0, () => {
                    $('.fornitureRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            case 'Pets':
                $('.foodRow,.clothesRow,.eletronicRow,.fornitureRow,.variedRow').fadeOut(0, () => {
                    $('.petsRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            case 'Variados':
                $('.foodRow,.clothesRow,.eletronicRow,.fornitureRow,.petsRow').fadeOut(0, () => {
                    $('.variedRow').fadeIn().width('96%').css('margin', '0 auto')
                    $('.postsRow--list').css('width', '100%')
                    $('.postsRow--left,.postsRow--right').fadeOut()
                    $('.postsRow--list').css('margin-left', '0')
                })
                break;
            default:
                break;
        }
    })

    const loadComp = () => {

        if (Cookie.get('ID') === undefined) {
            return <div></div>
        }

        if (loginToken) {
            return <div>
                <BtnPost loggedUserName={loggedUserName} />
                <ModalPost />
            </div>
        }

        do {
            return <CircularProgress size={40} color="secondary" />
        } while (!loginToken)
    }

    const loadFoodRow = () => {

        if (foodPosts.length === 0) {
            return <section className="postsRow--listarea foodRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaUtensils className="mr-1" />
                    Alimentos
                    <p className="m-0 p-0 numberPosts">({foodPosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (foodPosts.length > 0) {
            return <section className="postsRow postsRow--listarea foodRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaUtensils className="mr-1 " />
                    Alimentos
                    <p className="m-0 p-0 numberPosts">({foodPosts.length})</p>
                </h3>
                <div className="postsRow--left" onClick={handleLeftArrowFood}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowFood} />
                </div>

                <div className="postsRow--list foodList" style={{ marginLeft: scrollXFood, width: foodPosts.length * 150 }}>
                    {foodPosts.map((item, key) => {
                        var data = users.filter(user => {
                            return user._id === item.ownerId
                        })
                        return (
                            <Link to={`/view/food/${item._id}`} key={key}>
                                <div className="postsRow--item d-block">
                                    <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                        <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                        <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                    </div>
                                    <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                    <span className="postOwnerName">
                                        <strong>
                                            {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                            <small> • 2h</small>
                                        </strong>
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center  " : "mtH3 d-flex align-items-center "}>
                    <FaUtensils className="mr-1" />
                    Alimentos
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!foodPosts)
    }

    const loadClothesRow = () => {

        if (clothesPosts.length === 0) {
            return <section className="postsRow--listarea clothesRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaTshirt className="mr-1" />
                    Roupas
                    <p className="m-0 p-0 numberPosts">({clothesPosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (clothesPosts.length > 0) {
            return <div className="postsRow clothesRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaTshirt className="mr-1" />
                    Roupas
                    <p className="m-0 p-0 numberPosts">({clothesPosts.length})</p>
                </h3>

                <div className="postsRow--left" onClick={handleLeftArrowClothes}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowClothes} />
                </div>

                <section className="postsRow--listarea">
                    <div className="postsRow--list clothesList" style={{ marginLeft: scrollXClothes, width: clothesPosts.length * 150 }}>
                        {clothesPosts.map((item, key) => {
                            var data = users.filter(user => {
                                return user._id === item.ownerId
                            })
                            return (
                                <Link to={`/view/clothes/${item._id}`} key={key}>
                                    <div className="postsRow--item d-block">
                                        <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                            <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                            <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                        </div>
                                        <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                        <span className="postOwnerName">
                                            <strong>
                                                {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                                <small> • 2h</small>
                                            </strong>
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </div>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center "}>
                    <FaTshirt className="mr-1" />
                    Roupas
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!clothesPosts)
    }

    const loadEletronicsRow = () => {

        if (eletronicPosts.length === 0) {
            return <section className="postsRow--listarea eletronicRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaBolt className="mr-1" />
                    Eletrônicos
                    <p className="m-0 p-0 numberPosts">({eletronicPosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (eletronicPosts.length > 0) {
            return <div className="postsRow eletronicRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaBolt className="mr-1" />
                    Eletrônicos
                    <p className="m-0 p-0 numberPosts">({eletronicPosts.length})</p>
                </h3>

                <div className="postsRow--left" onClick={handleLeftArrowEletronics}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowEletronics} />
                </div>

                <section className="postsRow--listarea">
                    <div className="postsRow--list eletronicList" style={{ marginLeft: scrollXEletronics, width: eletronicPosts.length * 150 }}>
                        {eletronicPosts.map((item, key) => {
                            var data = users.filter(user => {
                                return user._id === item.ownerId
                            })
                            return (
                                <Link to={`/view/eletronic/${item._id}`} key={key}>
                                    <div className="postsRow--item d-block">
                                        <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                            <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                            <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                        </div>
                                        <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                        <span className="postOwnerName">
                                            <strong>
                                                {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                                <small> • 2h</small>
                                            </strong>
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </div>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center "}>
                    <FaBolt className="mr-1" />
                    Eletrônicos
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!eletronicPosts)
    }

    const loadFurnitureRow = () => {

        if (furniturePosts.length === 0) {
            return <section className="postsRow--listarea fornitureRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaCouch className="mr-1" />
                    Mobílias
                    <p className="m-0 p-0 numberPosts">({furniturePosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (furniturePosts.length > 0) {
            return <div className="postsRow fornitureRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaCouch className="mr-1" />
                    Mobílias
                    <p className="m-0 p-0 numberPosts">({furniturePosts.length})</p>
                </h3>

                <div className="postsRow--left" onClick={handleLeftArrowFurniture}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowFurniture} />
                </div>

                <section className="postsRow--listarea">
                    <div className="postsRow--list furnitureList" style={{ marginLeft: scrollXFurniture, width: furniturePosts.length * 150 }}>
                        {furniturePosts.map((item, key) => {
                            var data = users.filter(user => {
                                return user._id === item.ownerId
                            })
                            return (
                                <Link to={`/view/furniture/${item._id}`} key={key}>
                                    <div className="postsRow--item d-block">
                                        <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                            <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                            <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                        </div>
                                        <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                        <span className="postOwnerName">
                                            <strong>
                                                {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                                <small> • 2h</small>
                                            </strong>
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </div>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaCouch className="mr-1" />
                    Mobílias
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!furniturePosts)
    }

    const loadPetsRow = () => {

        if (petsPosts.length === 0) {
            return <section className="postsRow--listarea petsRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaPaw className="mr-1" />
                    Pets
                    <p className="m-0 p-0 numberPosts">({petsPosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (petsPosts.length > 0) {
            return <section className="postsRow--listarea postsRow petsRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center " : "mtH3 d-flex align-items-center"}>
                    <FaPaw className="mr-1" />
                    Pets
                    <p className="m-0 p-0 numberPosts">({petsPosts.length})</p>
                </h3>
                <div className="postsRow--left" onClick={handleLeftArrowPets}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowPets} />
                </div>

                <div className="postsRow--list petList" style={{ marginLeft: scrollXpets, width: petsPosts.length * 150 }}>
                    {petsPosts.map((item, key) => {
                        var data = users.filter(user => {
                            return user._id === item.ownerId
                        })
                        return (
                            <Link to={`/view/pets/${item._id}`} key={key}>
                                <div className="postsRow--item d-block">
                                    <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                        <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                        <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                    </div>
                                    <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                    <span className="postOwnerName">
                                        <strong>
                                            {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                            <small> • 2h</small>
                                        </strong>
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaPaw className="mr-1" />
                    Pets
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!petsPosts)
    }

    const loadVariedRow = () => {

        if (variedPosts.length === 0) {
            return <section className="postsRow--listarea removeBorder variedRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaInfinity className="mr-1" />
                    Variados
                    <p className="m-0 p-0 numberPosts">({variedPosts.length})</p>
                </h3>
                <p className="noPostsP">Nenhuma publicação cadastrada</p>
            </section>
        }

        if (variedPosts.length > 0) {
            return <section className="postsRow--listarea removeBorder variedRow postsRow">
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaInfinity className="mr-1" />
                    Variados
                    <p className="m-0 p-0 numberPosts">({variedPosts.length})</p>
                </h3>
                <div className="postsRow--left" onClick={handleLeftArrowVaried}>
                    <FiChevronLeft size={50} />
                </div>

                <div className="postsRow--right" style={window.innerWidth < 1024 ? { left: ajustRightArrow } : { left: 'initital' }}>
                    <FiChevronRight size={50} onClick={handleRightArrowVaried} />
                </div>

                <div className="postsRow--list variedList" style={{ marginLeft: scrollXVaried, width: variedPosts.length * 150 }}>
                    {variedPosts.map((item, key) => {
                        var data = users.filter(user => {
                            return user._id === item.ownerId
                        })
                        return (
                            <Link to={`/view/varied/${item._id}`} key={key}>
                                <div className="postsRow--item d-block">
                                    <div className={item.publicationType === 'Doando' ? "itemTypeContainer itemDonationType d-flex justify-content-center align-items-center flex-wrap" : "itemTypeContainer itemRecievingType d-flex justify-content-center align-items-center flex-wrap"}>
                                        <p className="m-0 p-0 w-100 text-center">{item.publicationType}</p>
                                        <p className="m-0 p-0 hoverPostTitle">{item.caseName.substring(0, 14) + '...'}</p>
                                    </div>
                                    <img src={item.image} alt="PostItem" className="backGroundImgItem" />
                                    <span className="postOwnerName">
                                        <strong>
                                            {data[0].userName.split(' ')[0].length > 6 ? data[0].userName.substring(0, 6) + '.' : data[0].userName.split(' ')[0]}
                                            <small> • 2h</small>
                                        </strong>
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        }

        do {
            return <>
                <h3 className={darkMode ? "mtH3 d-flex align-items-center" : "mtH3 d-flex align-items-center"}>
                    <FaInfinity className="mr-1" />
                    Variados
                </h3>
                <CircularProgress size={40} color="secondary" />
            </>
        } while (!variedPosts)
    }

    return (
        <div id="animationPosts">
            <h1 className={darkMode ? "ajustMT title mb-3 textLightDark " : "ajustMT title mb-3"}>Precisando de algo?</h1>
            <div className={darkMode ? "containerRows backLightDark" : "containerRows"}>
                <div className="postsRow">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className={darkMode ? "mt-3 d-flex align-items-center " : "mt-3 d-flex align-items-center"}>
                            <FaCheckCircle className="mr-1" />
                            Publicações disponíveis:
                        </h2>
                        <div className="d-flex align-items-center">

                            {loadComp()}

                            <div className="header navbar navbar-expand-lg p-0 filter">
                                <ul className="navbar-nav">
                                    <li className="dropdown-filter">
                                        <Link className={darkMode ? "nav-link dropdown-toggle" : "nav-link dropdown-toggle"} to="#" data-toggle="dropdown" style={{ color: '#33345c' }}>
                                            <span className={darkMode ? "p-0 m-0 " : "p-0 m-0"}>Filtrar por</span>
                                        </Link>
                                        <MenuList className="dropdown-menu drop-filter">
                                            {filterData.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} className="dropdown-item">
                                                        {item.icon}
                                                        {item.filterName}
                                                    </MenuItem>
                                                )
                                            })}
                                        </MenuList>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {loadFoodRow()}

                </div>

                {loadClothesRow()}
                {loadEletronicsRow()}
                {loadFurnitureRow()}
                {loadPetsRow()}
                {loadVariedRow()}

            </div>
        </div >
    );
}