import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Cookie from 'js-cookie'

import Image1 from '../../assets/1.png'
import Image2 from '../../assets/2.png'
import Image3 from '../../assets/3.png'
import Image4 from '../../assets/4.png'

import { BannerInfo, BannerInfo2, BannerInfo3, BannerInfo4 } from './sliderData';

export default class SimpleSlider extends Component {

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
        };

        const loginToken = Cookie.get('ID');

        return (
            <div id="slider">
                <Slider {...settings} autoplay>

                    <div className="d-flex justify-content-between align-items-center">
                        <div id="InfoSlider1">
                            <BannerInfo
                                title={loginToken === undefined ?
                                    'Faça a coisa certa!' :
                                    'Faça a coisa certa!'//TITULO LOGADO 
                                }
                                description={loginToken === undefined ?
                                    'Alguém pode estar precisando de sua ajuda. Se possuir algo que esteja sobrando, não perca tempo, registre-se e doe agora!' :
                                    'Alguém pode estar precisando de sua ajuda. Se possuir algo que esteja sobrando, não perca tempo, registre-se e doe agora!' //DESCRICAO LOGADO
                                }
                                btnText={loginToken === undefined ?
                                    'DOAR AGORA' :
                                    'DOAR AGORA'//text btn logado
                                }
                            />
                        </div>
                        <img src={Image2} alt="Slider" className="img-slick" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div id="InfoSlider2">
                            <BannerInfo2
                                title={loginToken === undefined ?
                                    'Tipos de doações ilimitadas!' :
                                    'Tipos de doações ilimitadas!'
                                }
                                description={loginToken === undefined ?
                                    'Na plataforma, há variadas categorias de publicações para suas doações, assim dando à você uma maior liberdade.' :
                                    'Na plataforma, há variadas categorias de publicações para suas doações, assim dando à você uma maior liberdade.'
                                }
                                btnText={loginToken === undefined ?
                                    'DOAR AGORA' :
                                    'DOAR AGORA'
                                }
                            />
                        </div>
                        <img src={Image3} alt="Slider" className="img-slick" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div id="InfoSlider3">
                            <BannerInfo3
                                title={loginToken === undefined ?
                                    'Envie suas próprias imagens!' :
                                    'Envie suas próprias imagens!'
                                }
                                description={loginToken === undefined ?
                                    'Nossa plataforma permite o envio de fotos personalizadas para suas publicações.' :
                                    'Nossa plataforma permite o envio de fotos personalizadas para suas publicações.'
                                }
                                btnText={loginToken === undefined ?
                                    'DOAR AGORA' :
                                    'DOAR AGORA'
                                }
                            />
                        </div>
                        <img src={Image4} alt="Slider" className="img-slick" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div id="InfoSlider4">
                            <BannerInfo4
                                title={loginToken === undefined ?
                                    'Ajude outros, ajude o mundo!' :
                                    'Ajude outros, ajude o mundo!'
                                }
                                description={loginToken === undefined ?
                                    'Independente do nível de sua doação, saiba que para a outra pessoa irá ter um enorme valor!' :
                                    'Independente do nível de sua doação, saiba que para a outra pessoa irá ter um enorme valor!'
                                }
                                btnText={loginToken === undefined ?
                                    'DOAR AGORA' :
                                    'DOAR AGORA'
                                }
                            />
                        </div>
                        <img src={Image1} alt="Slider" className="img-slick ajustIMGBanner" />
                    </div>
                </Slider>
            </div>
        );
    }
}