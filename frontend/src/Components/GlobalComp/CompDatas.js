import { FaHome, FaUsers, FaQuestionCircle, FaHeadset, FaUtensils, FaTshirt, FaBolt, FaCouch, FaPaw, FaInfinity } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi'

import profilepic1 from '../../assets/messages_profilepic1.png'
import profilepic2 from '../../assets/messages_profilepic2.png'
import profilepic3 from '../../assets/messages_profilepic3.png'
import profilepic4 from '../../assets/messages_profilepic4.png'

//HEADER MOBILE

export const SidebarData = [
    {
        title: 'Ínicio',
        path: '/',
        icon: <FaHome />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre nós',
        path: '/',
        icon: <FaUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Suporte',
        path: '/',
        icon: <FaHeadset />,
        cName: 'nav-text'
    },
    {
        title: 'Ajuda',
        path: '/',
        icon: <FaQuestionCircle />,
        cName: 'nav-text'
    }
];

//FILTER POST ROW

export const filterData = [
    {
        icon: <FiGlobe className="mr-1" />,
        filterName: 'Todos'
    },
    {
        icon: <FaUtensils className="mr-1" />,
        filterName: 'Alimentos'
    },
    {
        icon: <FaTshirt className="mr-1" />,
        filterName: 'Roupas'
    },
    {
        icon: <FaBolt className="mr-1" />,
        filterName: 'Eletrônicos'
    },
    {
        icon: <FaCouch className="mr-1" />,
        filterName: 'Mobílias'
    },
    {
        icon: <FaPaw className="mr-1" />,
        filterName: 'Pets'
    },
    {
        icon: <FaInfinity className="mr-1" />,
        filterName: 'Variados'
    }
]

export const Messages = [
    {
        profileImage: profilepic1,
        ownerName: 'Augusto Silva',
        date: '4h',
        content: 'Olá gostaria de saber mais informações sobre seu post de doação de queijos!'

    },
    {
        profileImage: profilepic2,
        ownerName: 'José Luiz',
        date: '12h',
        content: 'Bom dia, vi sua postagem e me interessei sobre a doação, mas não poderei buscar ... você poderia anotar meu endereço?'
    },
    {
        profileImage: profilepic3,
        ownerName: 'OilCompany',
        date: '30m',
        content: 'Oi, me chamo Sofia, vi sua postagem na qual estava precisando de doações de comida, eu terei um pouco, mas não consiguiria levar, teria que ser por correios mesmo... O endereço no post está certo para eu poder entregar?'
    },
    {
        profileImage: profilepic4,
        ownerName: 'Unilen',
        date: '1d',
        content: 'Boa noite, referente a postagem de doação de ração, fiquei com uma dúvida, poderia me retornar? Obrigado.'
    }
]